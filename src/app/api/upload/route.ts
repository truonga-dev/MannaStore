import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from 'cloudinary';

// Configuration for Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Whitelist các loại file được phép upload
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
]);

const ALLOWED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session?.user || (role !== 'ADMIN' && role !== 'STAFF')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Kiểm tra kích thước file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File quá lớn. Tối đa 10MB.' }, { status: 400 });
    }

    // Kiểm tra MIME type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Loại file không được phép. Chỉ chấp nhận ảnh (JPEG, PNG, GIF, WebP, SVG, AVIF).' }, { status: 400 });
    }

    // Kiểm tra phần mở rộng file
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: 'Phần mở rộng file không hợp lệ.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary is configured, upload to Cloudinary
    if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      const base64Data = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64Data}`;
      
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'mannastore',
      });
      
      return NextResponse.json({ url: uploadResponse.secure_url });
    }

    // Fallback: Local upload
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Tạo tên file an toàn - không dùng tên file gốc
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeFilename = `file-${uniqueSuffix}${ext}`;
    const filepath = path.join(uploadDir, safeFilename);

    // Kiểm tra path traversal - đảm bảo filepath nằm trong uploadDir
    const resolvedPath = path.resolve(filepath);
    const resolvedUploadDir = path.resolve(uploadDir);
    if (!resolvedPath.startsWith(resolvedUploadDir)) {
      return NextResponse.json({ error: 'Đường dẫn file không hợp lệ.' }, { status: 400 });
    }

    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${safeFilename}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

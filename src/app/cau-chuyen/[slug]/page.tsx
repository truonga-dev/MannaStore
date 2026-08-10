import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { Calendar, User, ChevronRight, Tag } from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData"; // Suggesting products at the end

// Dynamic SEO metadata based on blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết không tồn tại hoặc đã bị xóa."
    };
  }

  return {
    title: `${post.title} | Manna Store`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Lấy ngẫu nhiên 3 sản phẩm để gợi ý
  const suggestedProducts = [...SAMPLE_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="bg-[#F8F7F4] dark:bg-[#0C0C0C] min-h-screen py-10 md:py-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/cau-chuyen" className="hover:text-primary transition-colors">Câu chuyện</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-white font-medium truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10 text-center">
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 space-x-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        {/* We use a specific prose class for beautiful typography */}
        <div 
          className="prose prose-lg md:prose-xl prose-gray dark:prose-invert max-w-none mx-auto mb-16
            prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white
            [&>.lead]:text-xl [&>.lead]:font-medium [&>.lead]:text-gray-900 dark:[&>.lead]:text-white [&>.lead]:mb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Tags footer */}
        <div className="flex items-center gap-3 border-t border-b border-gray-200 dark:border-gray-800 py-6 mb-16">
          <Tag className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400 font-medium">Từ khóa:</span>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Suggested Products */}
        <div>
          <h3 className="text-2xl font-bold font-serif text-gray-900 dark:text-white mb-8 text-center">
            Sản phẩm được gợi ý cho bạn
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {suggestedProducts.map((product) => (
              <Link key={product.id} href={`/san-pham/${product.slug}`} className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 h-full flex flex-col">
                  <div className="relative aspect-square">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.name}</h4>
                    <p className="text-primary font-bold mt-auto">
                      {product.variants[0]?.price?.toLocaleString("vi-VN") || 0}đ
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

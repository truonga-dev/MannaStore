import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        variants: true
      },
      take: 5
    });

    // Format for quick search
    const results = products.map(product => {
      const minPrice = product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 0;

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl,
        price: minPrice
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


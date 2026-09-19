import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ products: [], articles: [], categories: [] });
    }

    const [products, articles, categories] = await Promise.all([
      // Search Products
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } }
          ],
          isActive: true
        },
        include: {
          variants: true
        },
        take: 5
      }),
      // Search Articles
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { tags: { contains: query, mode: 'insensitive' } }
          ],
          isPublished: true
        },
        take: 4
      }),
      // Search Categories
      prisma.category.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' }
        },
        take: 3
      })
    ]);

    // Format results
    const formattedProducts = products.map(product => {
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

    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      coverImage: article.coverImage,
      createdAt: article.createdAt
    }));

    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug
    }));

    return NextResponse.json({
      products: formattedProducts,
      articles: formattedArticles,
      categories: formattedCategories
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


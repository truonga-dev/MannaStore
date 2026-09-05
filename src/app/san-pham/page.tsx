import prisma from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const category = typeof params.category === 'string' ? params.category : 'all';
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';
  
  const limit = 12;
  const skip = (page - 1) * limit;

  // Build where clause
  let whereClause: any = { isActive: true };
  if (category !== 'all') {
    whereClause.categoryId = category;
  }

  // Build orderBy
  let orderByClause: any = { createdAt: 'desc' }; // default: newest
  if (sort === 'price-asc') {
    orderByClause = {
      variants: {
        _count: 'desc' // Fallback for Prisma relationship sort issues if needed, but Prisma supports relation aggregate sorting in newer versions. Actually, since we need to sort by variant price, it's better to fetch and sort, OR we use `orderBy: { variants: { min: { price: 'asc' } } }` if Prisma supports it, but since `price` is on Variant, if Prisma doesn't support nested relation aggregation sort natively without preview features, we might need a workaround. Wait, let's keep it simple for now or fetch all and slice, NO, we want server pagination. Let's see if we can do client side sorting within the page, or just use Prisma sorting.
      }
    };
  }
  
  // Wait, Prisma doesn't natively support sorting by a field in a one-to-many relationship easily unless using aggregate.
  // Given we want server pagination, if we can't sort by variant price in Prisma easily, we might have a problem.
  // Let's use Prisma's nested sorting if possible. Wait, ManaStore_Web has Product 1-N Variants.
  // Actually, we can fetch all IDs if sorting by price, but that's slow.
  // Let's try standard Prisma sorting. If it fails, I'll fallback. 
  // Let's check Prisma schema first.
  
  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      variants: true
    },
    // We'll sort in JavaScript for now if it's price, or if it's newest we use Prisma.
    // Wait, if we sort in JS, we can't paginate in DB easily for price.
    // Let's fetch all matching category, sort in JS, then paginate. It's still better than sending 1000s of items to Client.
    orderBy: { createdAt: 'desc' }
  });

  // Perform JS sorting
  if (sort === 'price-asc') {
    products.sort((a, b) => (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0));
  } else if (sort === 'price-desc') {
    products.sort((a, b) => (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0));
  }

  // Then paginate
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedProducts = products.slice(skip, skip + limit);

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <ProductsClient 
      initialProducts={paginatedProducts as any} 
      dbCategories={categories as any} 
      totalPages={totalPages}
      currentPage={page}
      initialCategory={category}
      initialSort={sort}
    />
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blogData";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Câu chuyện | Manna Store",
  description: "Khám phá những câu chuyện cảm hứng, gợi ý quà tặng, sách bồi linh và kiến thức Cơ Đốc hữu ích từ Manna Store.",
};

export default function BlogListingPage() {
  return (
    <div className="bg-[#F8F7F4] dark:bg-[#0C0C0C] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4">
            Câu chuyện & Cảm hứng
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Nơi nuôi dưỡng tâm linh và khám phá những thông điệp Cơ Đốc ý nghĩa qua từng trang viết.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100 dark:border-gray-800"
            >
              <Link href={`/cau-chuyen/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-gray-900 dark:text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    {post.author}
                  </div>
                </div>
                
                <Link href={`/cau-chuyen/${post.slug}`}>
                  <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    href={`/cau-chuyen/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-primary dark:text-white hover:opacity-70 transition-opacity"
                  >
                    Đọc tiếp <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

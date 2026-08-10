"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";

type ReviewType = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
};

interface ProductReviewsProps {
  productId: string;
  initialReviews: ReviewType[];
  hasPurchased?: boolean;
}

export default function ProductReviews({ productId, initialReviews, hasPurchased = false }: ProductReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Vui lòng đăng nhập để đánh giá");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi đánh giá");
      
      const data = await res.json();
      setReviews([data.review, ...reviews]);
      setComment("");
      setRating(5);
      toast.success("Cảm ơn bạn đã đánh giá!");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (ratingCount: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={interactive ? 24 : 16}
            className={`transition-colors ${interactive ? "cursor-pointer" : ""} ${
              star <= ratingCount ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => interactive && setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h2 className="font-serif text-2xl font-bold mb-8">Đánh Giá Khách Hàng</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Review Stats & Form */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{averageRating}<span className="text-xl text-gray-500">/5</span></div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(Number(averageRating)))}
            </div>
            <p className="text-gray-500 text-sm">Dựa trên {reviews.length} đánh giá</p>
          </div>

          <h3 className="font-bold mb-4">Viết đánh giá của bạn</h3>
          {!session ? (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-center text-gray-500">
              Vui lòng <a href="/dang-nhap" className="text-primary font-medium hover:underline">đăng nhập</a> để viết đánh giá.
            </div>
          ) : !hasPurchased ? (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-center text-gray-500 text-sm">
              Bạn chỉ có thể đánh giá sau khi đã mua sản phẩm này thành công.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">Đánh giá sao</label>
                {renderStars(rating, true)}
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">Nhận xét</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  rows={4}
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi Đánh Giá"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">Chưa có đánh giá nào cho sản phẩm này.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative flex items-center justify-center">
                    {review.user?.image ? (
                      <Image src={review.user.image} alt={review.user.name || "User"} fill className="object-cover" sizes="40px" />
                    ) : (
                      <User className="text-gray-400" size={20} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{review.user?.name || "Khách hàng"}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                {review.comment && (
                  <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

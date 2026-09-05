"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Star, MessageCircle, User as UserIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  customerName: string | null;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  } | null;
}

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [submitError, setSubmitError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!session && !customerName.trim()) {
      setSubmitError("Vui lòng nhập tên của bạn.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          comment,
          customerName: session ? undefined : customerName,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      // Reset form
      setRating(5);
      setComment("");
      if (!session) setCustomerName("");
      
      // Reload reviews
      await fetchReviews();
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 p-6 sm:p-8 bg-gray-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-[#0B1B3D]" />
            Đánh giá sản phẩm
          </h2>
          <p className="text-gray-500 mt-1">Những nhận xét thực tế từ khách hàng của Manna Store</p>
        </div>
        
        {totalReviews > 0 && (
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl font-black text-[#0B1B3D]">{averageRating}</div>
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">Dựa trên {totalReviews} đánh giá</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Form bên trái */}
        <div className="p-6 sm:p-8 lg:col-span-1 bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Viết đánh giá của bạn</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bạn chấm sản phẩm này bao nhiêu sao?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-100 text-gray-200"
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {!session && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên của bạn <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] focus:border-[#0B1B3D] outline-none transition-shadow"
                  placeholder="Nhập tên để hiển thị"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cảm nhận của bạn (không bắt buộc)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] focus:border-[#0B1B3D] outline-none transition-shadow resize-none"
                placeholder="Sản phẩm này chất lượng thế nào?"
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0B1B3D] text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </form>
        </div>

        {/* Danh sách bình luận bên phải */}
        <div className="p-6 sm:p-8 lg:col-span-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B1B3D] mb-4"></div>
              <p>Đang tải đánh giá...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Chưa có đánh giá nào</h4>
              <p className="text-gray-500 mt-1 max-w-sm">Hãy trở thành người đầu tiên đánh giá sản phẩm này để giúp những khách hàng khác có thêm thông tin nhé.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    {review.user?.image ? (
                      <img src={review.user.image} alt="" className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="font-bold text-gray-900">
                          {review.user?.name || review.customerName || "Khách vãng lai"}
                        </span>
                        {review.user && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Thành viên
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {format(new Date(review.createdAt), "dd MMM yyyy, HH:mm", { locale: vi })}
                      </span>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`} 
                        />
                      ))}
                    </div>
                    
                    {review.comment && (
                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

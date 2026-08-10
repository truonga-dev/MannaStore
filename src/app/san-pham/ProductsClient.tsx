"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORY_MAP } from "@/lib/sampleData";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMoreCatOpen, setIsMoreCatOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [{ id: "all", name: "Tất cả" }, ...Object.entries(CATEGORY_MAP).map(([id, name]) => ({ id, name }))];
  
  useEffect(() => {
    const updateVisible = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      
      const estimatedWidths = categories.map(c => 48 + c.name.length * 8.5); 
      
      let currentW = 0;
      let count = 0;
      for (let i = 0; i < categories.length; i++) {
        const reserveArrow = i < categories.length - 1 ? 48 : 0;
        if (currentW + estimatedWidths[i] + reserveArrow > containerWidth) {
          break;
        }
        currentW += estimatedWidths[i];
        count++;
      }
      setVisibleCount(Math.max(1, count));
    };
    
    // Small timeout to ensure DOM is fully rendered before measuring
    const timeout = setTimeout(updateVisible, 10);
    window.addEventListener("resize", updateVisible);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateVisible);
    };
  }, [categories]);

  const visibleCategories = categories.slice(0, visibleCount);
  const moreCategories = categories.slice(visibleCount);
  const isMoreActive = moreCategories.some(cat => cat.id === activeCategory);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];
    
    // Filter
    if (activeCategory !== "all") {
      result = result.filter(p => p.categoryId === activeCategory || (activeCategory === 'thoi-trang' && (p.categoryId === 'ao-thun' || p.categoryId === 'ao-hoodie')));
    }

    // Sort
    result.sort((a, b) => {
      const getPrice = (p: any) => p.variants?.[0]?.price || 0;
      
      if (sortOrder === "price-asc") {
        return getPrice(a) - getPrice(b);
      } else if (sortOrder === "price-desc") {
        return getPrice(b) - getPrice(a);
      } else {
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [initialProducts, activeCategory, sortOrder]);

  return (
    <div className="bg-[#F8F7F4] dark:bg-[#0C0C0C] min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Tất Cả Sản Phẩm</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Khám phá những món quà ý nghĩa và các vật phẩm giúp nuôi dưỡng đời sống tâm linh của bạn mỗi ngày.
          </p>
        </div>

        {/* Horizontal Filters & Controls */}
        <div className="mb-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-6">
            {/* Pill Categories Container */}
            <div className="flex gap-2 flex-1 min-w-0" ref={containerRef}>
              {/* Scrollable part */}
              <div className="flex gap-2 flex-1 overflow-hidden pb-1">
                {visibleCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden shrink-0 ${
                        isActive 
                          ? "text-black bg-white shadow-md scale-105" 
                          : "text-gray-600 dark:text-gray-400 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-transparent hover:bg-gray-50 dark:hover:bg-[#1E293B] hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{cat.name}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="active-pill"
                          className="absolute inset-0 bg-white dark:bg-white rounded-full -z-0"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Thêm Dropdown (outside scroll to prevent clipping) */}
              {moreCategories.length > 0 && (
                <div className="relative shrink-0 pb-1">
                  <button
                    onClick={() => setIsMoreCatOpen(!isMoreCatOpen)}
                    className={`flex items-center justify-center w-[40px] h-[40px] rounded-full transition-all duration-300 ${
                      isMoreActive 
                        ? "text-black bg-white shadow-md scale-105" 
                        : "text-gray-600 dark:text-gray-400 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-transparent hover:bg-gray-50 dark:hover:bg-[#1E293B] hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isMoreCatOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isMoreCatOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsMoreCatOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 md:left-0 top-[44px] w-48 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden z-50 py-1"
                        >
                          {moreCategories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setActiveCategory(cat.id);
                                setIsMoreCatOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                activeCategory === cat.id 
                                  ? 'bg-primary/10 text-primary dark:bg-[#2563EB] dark:text-white' 
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E293B]'
                              }`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-4 shrink-0 bg-white dark:bg-[#0F172A] p-1.5 rounded-full border border-gray-100 dark:border-transparent relative mt-2 xl:mt-0">
              <div className="pl-4 hidden sm:flex items-center gap-2 border-r border-gray-100 dark:border-gray-800/50 pr-4">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Hiển thị</span>
                <span className="bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {filteredAndSortedProducts.length}
                </span>
              </div>
              
              <div className="relative px-2">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 pr-2 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Filter size={16} className="text-gray-400" />
                  {sortOrder === 'newest' ? 'Mới nhất' : sortOrder === 'price-asc' ? 'Giá tăng dần' : 'Giá giảm dần'}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-4 w-48 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden z-50 py-1"
                      >
                        {[
                          { id: 'newest', label: 'Mới nhất' },
                          { id: 'price-asc', label: 'Giá tăng dần' },
                          { id: 'price-desc', label: 'Giá giảm dần' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => {
                              setSortOrder(opt.id);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              sortOrder === opt.id 
                                ? 'bg-primary/10 text-primary dark:bg-[#2563EB] dark:text-white' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E293B]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-[#0B1320] rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredAndSortedProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

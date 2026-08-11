"use client";

import Link from 'next/link';
import { User, Search, Menu, X, LogOut } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useAuthSession } from '@/components/auth/Providers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useDebounce } from '@/hooks/useDebounce';
import { Loader2 } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const { data: session } = useAuthSession();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSearchResults() {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Failed to fetch search results', error);
      } finally {
        setIsSearching(false);
      }
    }

    fetchSearchResults();
  }, [debouncedSearchQuery]);

  // Focus search input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      // Optional: don't clear query immediately so user sees what they searched
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 -ml-2 text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo (Hidden when search is open on mobile to save space, but let's keep it if possible) */}
        <Link
          href="/"
          className={`font-serif text-2xl font-bold tracking-widest text-primary flex flex-col items-center leading-none transition-all duration-300 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}
        >
          MANNA
          <span className="text-[10px] font-sans tracking-[0.3em] font-medium mt-1 uppercase">Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-8 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}`}>
          <Link href="/san-pham" className="text-sm font-medium hover:text-primary/70 transition-colors uppercase tracking-wider">Sản Phẩm</Link>
          <Link href="/danh-muc/qua-tang" className="text-sm font-medium hover:text-primary/70 transition-colors uppercase tracking-wider">Quà Tặng</Link>
          <Link href="/ve-chung-toi" className="text-sm font-medium hover:text-primary/70 transition-colors uppercase tracking-wider">Câu Chuyện</Link>
          <Link href="/bai-viet" className="text-sm font-medium hover:text-primary/70 transition-colors uppercase tracking-wider">Bài Viết</Link>
        </nav>

        {/* Search Bar - Expands to take available space when open */}
        <div className={`absolute left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 transition-all duration-300 ease-in-out z-10 ${isSearchOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>
          <div className="relative w-full">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              {isSearching ? (
                <Loader2 className="absolute left-7 text-gray-400 w-5 h-5 pointer-events-none animate-spin" />
              ) : (
                <Search className="absolute left-7 text-gray-400 w-5 h-5 pointer-events-none" />
              )}
              
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-7 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            {/* Live Search Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden max-h-[70vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sản phẩm gợi ý
                    </div>
                    {searchResults.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/san-pham/${product.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="48px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</h4>
                          <p className="text-sm font-semibold text-primary mt-0.5">
                            {product.price.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </Link>
                    ))}
                    <button 
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-3 text-sm text-primary font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-800 mt-2"
                    >
                      Xem tất cả kết quả cho &quot;{searchQuery}&quot;
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    {isSearching ? 'Đang tìm kiếm...' : `Không tìm thấy kết quả nào cho "${searchQuery}"`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Icons */}
        <div className={`flex items-center gap-2 md:gap-4 text-primary transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            aria-label="Tìm kiếm"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-primary/5 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {session ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/thong-tin" className="flex items-center gap-2 hover:text-primary/80">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold uppercase overflow-hidden relative">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt={session.user.name || "Avatar"} fill className="object-cover" sizes="32px" />
                  ) : (
                    session.user?.name?.charAt(0) || "U"
                  )}
                </div>
              </Link>
              <button onClick={() => signOut()} className="p-2 hover:bg-gray-100 rounded-full" title="Đăng xuất">
                <LogOut className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ) : (
            <Link href="/dang-nhap" className="p-2 hover:bg-primary/5 rounded-full transition-colors hidden md:block" title="Đăng nhập">
              <User className="w-5 h-5" />
            </Link>
          )}

          <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>

          <CartIcon />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white dark:bg-gray-950 px-4 py-4 space-y-4">
          <Link href="/san-pham" className="block text-sm font-medium uppercase tracking-wider p-2">Sản Phẩm</Link>
          <Link href="/danh-muc/qua-tang" className="block text-sm font-medium uppercase tracking-wider p-2">Quà Tặng</Link>
          <Link href="/ve-chung-toi" className="block text-sm font-medium uppercase tracking-wider p-2">Câu Chuyện</Link>
          <Link href="/bai-viet" className="block text-sm font-medium uppercase tracking-wider p-2">Bài Viết</Link>
          {!session && (
            <Link href="/dang-nhap" className="block text-sm font-medium uppercase tracking-wider p-2 text-primary">Đăng nhập / Đăng ký</Link>
          )}
          {session && (
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <Link href="/thong-tin" className="text-sm font-medium flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
                Tài khoản của tôi
              </Link>
              <button onClick={() => signOut()} className="text-red-500 text-sm font-medium p-2">Đăng xuất</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

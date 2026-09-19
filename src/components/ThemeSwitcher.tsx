"use client";

import { useTheme, Theme } from "@/components/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Tránh hydration mismatch
  }

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Sáng', icon: <Sun size={18} /> },
    { value: 'dark', label: 'Tối', icon: <Moon size={18} /> },
    { value: 'system', label: 'Hệ thống', icon: <Monitor size={18} /> },
  ];

  return (
    <div className="flex items-center gap-2">
      {options.map((option) => {
        const isActive = theme === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex flex-col items-center justify-center w-20 h-16 rounded-xl transition-all duration-200 border ${
              isActive
                ? "bg-white/10 border-white/20 text-white shadow-sm"
                : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-300"
            }`}
          >
            <div className="mb-1">{option.icon}</div>
            <span className="text-[11px] font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

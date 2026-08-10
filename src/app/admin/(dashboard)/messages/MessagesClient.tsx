"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Loader2, Mail, MailOpen, Reply, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: string;
};

export default function MessagesClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const url = filter === "ALL" ? "/api/admin/messages" : `/api/admin/messages?status=${filter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách tin nhắn");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus as any } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: newStatus as any });
        }
        toast.success("Đã cập nhật trạng thái");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật");
    }
  };

  const handleMessageClick = (msg: Message) => {
    setSelectedMessage(msg);
    if (msg.status === "UNREAD") {
      updateStatus(msg.id, "READ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hộp Thư Góp Ý
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý tin nhắn từ trang liên hệ của khách hàng.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="lg:col-span-1 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === "ALL"
                    ? "bg-[#0B1B3D] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter("UNREAD")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === "UNREAD"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                Chưa đọc
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Không có tin nhắn nào
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => handleMessageClick(msg)}
                    className={`w-full text-left p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      selectedMessage?.id === msg.id
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    } ${msg.status === "UNREAD" ? "bg-amber-50/50 dark:bg-amber-900/10" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-medium ${msg.status === "UNREAD" ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                        {msg.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(msg.createdAt), "dd/MM", { locale: vi })}
                      </span>
                    </div>
                    <div className={`text-sm mb-1 truncate ${msg.status === "UNREAD" ? "font-medium text-gray-800 dark:text-gray-200" : "text-gray-600 dark:text-gray-400"}`}>
                      {msg.subject}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {msg.message}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col h-[600px]">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedMessage.name}
                      </span>
                      <span className="text-gray-500">&lt;{selectedMessage.email}&gt;</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {format(new Date(selectedMessage.createdAt), "HH:mm, dd/MM/yyyy", { locale: vi })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedMessage.status === "REPLIED" ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                        <Reply className="w-3 h-3" /> Đã phản hồi
                      </span>
                    ) : (
                      <button
                        onClick={() => updateStatus(selectedMessage.id, "REPLIED")}
                        className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg text-sm font-medium transition-colors"
                      >
                        Đánh dấu đã phản hồi
                      </button>
                    )}
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#0B1B3D] text-white hover:bg-[#0B1B3D]/90 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      Trả lời Email
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {selectedMessage.message}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MailOpen className="w-16 h-16 mb-4 opacity-20" />
              <p>Chọn một tin nhắn để xem nội dung</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

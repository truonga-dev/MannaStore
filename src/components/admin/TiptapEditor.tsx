"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useCallback } from 'react';
import { Bold, Italic, List, ListOrdered, ImageIcon, Heading1, Heading2, Heading3, Quote, Code, Undo, Redo } from 'lucide-react';
import toast from 'react-hot-toast';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        const toastId = toast.loading("Đang tải ảnh lên...");
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) throw new Error('Upload failed');
          
          const data = await response.json();
          if (data.url) {
            editor.chain().focus().setImage({ src: data.url }).run();
            toast.success("Tải ảnh thành công!", { id: toastId });
          }
        } catch (error) {
          toast.error("Lỗi khi tải ảnh lên", { id: toastId });
        }
      }
    };
    input.click();
  }, [editor]);

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const btnClass = (active: boolean) => 
    `p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${active ? 'bg-gray-200 dark:bg-gray-700 text-primary' : 'text-gray-600 dark:text-gray-300'}`;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-t-lg">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="In đậm">
        <Bold size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="In nghiêng">
        <Italic size={18} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <button type="button" onClick={() => toggleHeading(1)} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Tiêu đề 1">
        <Heading1 size={18} />
      </button>
      <button type="button" onClick={() => toggleHeading(2)} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Tiêu đề 2">
        <Heading2 size={18} />
      </button>
      <button type="button" onClick={() => toggleHeading(3)} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Tiêu đề 3">
        <Heading3 size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Danh sách chấm">
        <List size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Danh sách số">
        <ListOrdered size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Trích dẫn">
        <Quote size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive('codeBlock'))} title="Khối mã">
        <Code size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <button type="button" onClick={addImage} className={btnClass(false)} title="Chèn ảnh">
        <ImageIcon size={18} />
      </button>

      <div className="flex-1"></div>

      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50">
        <Undo size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50">
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4 bg-white dark:bg-gray-900',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-shadow">
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto max-h-[600px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

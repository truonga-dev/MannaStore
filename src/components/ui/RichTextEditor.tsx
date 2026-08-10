"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Image as ImageIcon
} from 'lucide-react'
import { useCallback } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const addImage = useCallback(() => {
    const url = window.prompt('URL hình ảnh')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
        type="button"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
        type="button"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
        type="button"
      >
        <Strikethrough size={18} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 my-auto"></div>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
        type="button"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
        type="button"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
        type="button"
      >
        <ListOrdered size={18} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 my-auto"></div>

      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
        type="button"
      >
        <ImageIcon size={18} />
      </button>
    </div>
  )
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 text-gray-900 dark:text-gray-100',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  })

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white transition-shadow">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="bg-white dark:bg-gray-950" />
    </div>
  )
}

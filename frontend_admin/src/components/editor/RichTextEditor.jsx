import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaHeading,
} from "react-icons/fa";


// ✅ Move Button OUTSIDE
const ToolbarButton = ({ onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-200 ${
      active
        ? "bg-amber-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);


const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-80 p-4 focus:outline-none text-gray-800 text-base",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const forceUpdate = React.useReducer(() => ({}), {})[1];
  useEffect(() => {
    if (!editor) return;
    editor.on("selectionUpdate", () => {forceUpdate()});
    editor.on("transaction", () => {forceUpdate()});
  }, [editor, forceUpdate]);
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-amber-400 transition">

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b sticky top-0 z-10">
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <FaBold />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <FaItalic />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <FaUnderline />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          <FaHeading />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <FaListUl />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <FaListOl />
        </ToolbarButton>
      </div>

      {/* Editor Body */}
      <div className="max-h-100 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
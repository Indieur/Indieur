import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";

import Image from "@tiptap/extension-image";


const BlogEditor = ({ value, onChange }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
      }),

      Image.configure({
        inline: false,
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });


  if (!editor) {
    return null;
  }


  const addLink = () => {

    const url = window.prompt(
      "Enter URL"
    );

    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };


  const addImage = () => {

    const url = window.prompt(
      "Enter image URL"
    );

    if (!url) return;

    const alt = window.prompt(
      "Enter image ALT text"
    );


    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: alt || "",
      })
      .run();
  };


  return (
    <div className="blog-editor">

      {/* TOOLBAR */}

      <div className="blog-editor-toolbar">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          B
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          I
        </button>


        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
        >
          H2
        </button>


        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          • List
        </button>


        <button
          type="button"
          onClick={addLink}
        >
          🔗 Link
        </button>


        <button
          type="button"
          onClick={addImage}
        >
          🖼 Image
        </button>

      </div>


      {/* EDITOR */}

      <EditorContent editor={editor} />

    </div>
  );
};


export default BlogEditor;
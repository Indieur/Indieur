import React, { useEffect, useRef } from "react";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";

import "./BlogEditor.css";


const BlogEditor = ({ value, onChange }) => {
  const isInternalUpdate = useRef(false);


  /* =========================================================
     CLEAN PASTED HTML
  ========================================================= */

  const cleanPastedHTML = (html) => {
    if (!html) return "";

    const parser = new DOMParser();

    const doc = parser.parseFromString(
      html,
      "text/html"
    );


    /*
     * Remove unwanted elements
     */
    doc
      .querySelectorAll(
        "script, style, meta, link, iframe, object, embed, noscript"
      )
      .forEach((element) => {
        element.remove();
      });


    /*
     * Clean attributes/styles without destroying
     * the HTML structure.
     */
    doc.querySelectorAll("*").forEach((element) => {

      element.removeAttribute("hidden");

      element.removeAttribute("id");

      element.removeAttribute("class");


      /*
       * Clean only problematic inline styles.
       *
       * We DON'T remove the entire style attribute because
       * some pasted content may need other formatting.
       */
      const style =
        element.getAttribute("style");


      if (style) {

        const safeStyles = style
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean)
          .filter((item) => {

            const lower =
              item.toLowerCase();


            /*
             * Remove invisible elements
             */
            if (
              lower === "display:none" ||
              lower === "display: none" ||
              lower === "visibility:hidden" ||
              lower === "visibility: hidden" ||
              lower === "opacity:0" ||
              lower === "opacity: 0"
            ) {
              return false;
            }


            /*
             * Remove copied text color.
             *
             * This prevents white text on a white
             * editor background.
             */
            if (
              lower.startsWith("color:") ||
              lower.startsWith("background-color:")
            ) {
              return false;
            }


            return true;
          });


        if (safeStyles.length > 0) {

          element.setAttribute(
            "style",
            safeStyles.join("; ")
          );

        } else {

          element.removeAttribute("style");

        }
      }


      /*
       * Remove inline JavaScript events
       */
      [...element.attributes].forEach(
        (attribute) => {

          if (
            attribute.name
              .toLowerCase()
              .startsWith("on")
          ) {
            element.removeAttribute(
              attribute.name
            );
          }

        }
      );
    });


    return doc.body.innerHTML;
  };


  /* =========================================================
     MARKDOWN TABLE DETECTION
  ========================================================= */

  const isMarkdownTable = (text) => {
    if (!text) return false;

    const lines = text
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);


    if (lines.length < 2) {
      return false;
    }


    const firstLineHasPipe =
      lines[0].includes("|") &&
      lines[0].split("|").length >= 3;


    const secondLineIsSeparator =
      /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(
        lines[1]
      );


    return (
      firstLineHasPipe &&
      secondLineIsSeparator
    );
  };


  /* =========================================================
     PARSE MARKDOWN TABLE ROW
  ========================================================= */

  const parseMarkdownRow = (line) => {
    let cleanLine = line.trim();


    if (cleanLine.startsWith("|")) {
      cleanLine =
        cleanLine.substring(1);
    }


    if (cleanLine.endsWith("|")) {
      cleanLine =
        cleanLine.substring(
          0,
          cleanLine.length - 1
        );
    }


    return cleanLine
      .split("|")
      .map((cell) => cell.trim());
  };


  /* =========================================================
     MARKDOWN TABLE → HTML
  ========================================================= */

  const markdownTableToHTML = (lines) => {

    if (!lines || lines.length < 2) {
      return "";
    }


    const headerCells =
      parseMarkdownRow(lines[0]);


    let html = `
      <table>
        <thead>
          <tr>
    `;


    headerCells.forEach((cell) => {

      html += `
        <th>
          ${escapeHTML(cell)}
        </th>
      `;

    });


    html += `
          </tr>
        </thead>
        <tbody>
    `;


    /*
     * Skip:
     *
     * line 0 = header
     * line 1 = separator
     */
    lines.slice(2).forEach((line) => {

      const cells =
        parseMarkdownRow(line);


      html += "<tr>";


      cells.forEach((cell) => {

        html += `
          <td>
            ${escapeHTML(cell)}
          </td>
        `;

      });


      html += "</tr>";

    });


    html += `
        </tbody>
      </table>
      <p></p>
    `;


    return html;
  };


  /* =========================================================
     MIXED MARKDOWN CONTENT
     
     Handles:

     Heading

     Paragraph

     | Product | Price |
     |---------|-------|
     | Rice    | €10   |

     Paragraph after table
  ========================================================= */

  const convertMixedMarkdownContent = (text) => {

    const lines = text
      .replace(/\r\n/g, "\n")
      .split("\n");


    let html = "";

    let paragraphLines = [];


    const flushParagraph = () => {

      if (!paragraphLines.length) {
        return;
      }


      const content = paragraphLines
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => escapeHTML(line))
        .join("<br>");


      if (content) {

        html += `
          <p>
            ${content}
          </p>
        `;

      }


      paragraphLines = [];
    };


    let i = 0;


    while (i < lines.length) {

      const currentLine =
        lines[i].trim();


      /*
       * Empty line
       */
      if (!currentLine) {

        flushParagraph();

        i++;

        continue;
      }


      /*
       * Check for Markdown table
       */
      const nextLine =
        lines[i + 1]?.trim() || "";


      const possibleHeader =
        currentLine.includes("|") &&
        currentLine.split("|").length >= 3;


      const possibleSeparator =
        /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(
          nextLine
        );


      if (
        possibleHeader &&
        possibleSeparator
      ) {

        /*
         * Add text before table
         */
        flushParagraph();


        /*
         * Collect table rows
         */
        const tableLines = [
          currentLine,
          nextLine,
        ];


        i += 2;


        while (i < lines.length) {

          const tableLine =
            lines[i].trim();


          /*
           * Stop when table ends.
           */
          if (
            !tableLine ||
            !tableLine.includes("|")
          ) {
            break;
          }


          tableLines.push(
            tableLine
          );


          i++;
        }


        /*
         * Add complete table
         */
        html +=
          markdownTableToHTML(
            tableLines
          );


        continue;
      }


      /*
       * Normal text
       */
      paragraphLines.push(
        currentLine
      );


      i++;
    }


    /*
     * Add content after table
     */
    flushParagraph();


    return html;
  };


  /* =========================================================
     EDITOR
  ========================================================= */

  const editor = useEditor({

    extensions: [

      /* -----------------------------------------------------
         STARTER KIT
      ----------------------------------------------------- */

      StarterKit.configure({

        heading: {
          levels: [1, 2, 3],
        },

      }),


      /* -----------------------------------------------------
         LINK
      ----------------------------------------------------- */

      Link.configure({

        openOnClick: false,

        autolink: true,

        linkOnPaste: true,

      }),


      /* -----------------------------------------------------
         IMAGE
      ----------------------------------------------------- */

      Image.configure({

        inline: false,

        allowBase64: true,

      }),


      /* -----------------------------------------------------
         TABLE KIT - TIPTAP V3
      ----------------------------------------------------- */

      TableKit.configure({

        table: {

          resizable: true,

          HTMLAttributes: {
            class: "blog-table",
          },

        },


        tableRow: {

          HTMLAttributes: {
            class: "blog-table-row",
          },

        },


        tableHeader: {

          HTMLAttributes: {
            class: "blog-table-header",
          },

        },


        tableCell: {

          HTMLAttributes: {
            class: "blog-table-cell",
          },

        },

      }),

    ],


    content: value || "",


    /* =======================================================
       EDITOR PROPS
    ======================================================= */

    editorProps: {

      attributes: {
        class: "blog-editor-content",
      },


      /* =====================================================
         PASTE
      ===================================================== */

      handlePaste(view, event) {

        const clipboardData =
          event.clipboardData;


        if (!clipboardData) {
          return false;
        }


        const html =
          clipboardData.getData(
            "text/html"
          );


        const text =
          clipboardData.getData(
            "text/plain"
          );


        /* =================================================
           HTML PASTE

           IMPORTANT:
           We insert the COMPLETE HTML.

           We DO NOT extract only <table>.
        ================================================= */

        if (html) {

          const cleanedHTML =
            cleanPastedHTML(html);


          if (!cleanedHTML) {
            return false;
          }


          editor
            .chain()
            .focus()
            .insertContent(
              cleanedHTML
            )
            .run();


          return true;
        }


        /* =================================================
           MARKDOWN / PLAIN TEXT
        ================================================= */

        if (text) {

          /*
           * Markdown table mixed with text
           */
          if (
            isMarkdownTable(text)
          ) {

            const converted =
              convertMixedMarkdownContent(
                text
              );


            if (converted) {

              editor
                .chain()
                .focus()
                .insertContent(
                  converted
                )
                .run();


              return true;
            }
          }


          /*
           * Normal plain text
           */
          const paragraphs = text
            .replace(/\r\n/g, "\n")
            .split(/\n\s*\n/)
            .map((paragraph) => {

              const lines =
                paragraph
                  .split("\n")
                  .map((line) =>
                    escapeHTML(
                      line.trim()
                    )
                  )
                  .filter(Boolean);


              if (!lines.length) {
                return "";
              }


              return `
                <p>
                  ${lines.join("<br>")}
                </p>
              `;
            })
            .filter(Boolean)
            .join("");


          if (paragraphs) {

            editor
              .chain()
              .focus()
              .insertContent(
                paragraphs
              )
              .run();


            return true;
          }
        }


        return false;
      },

    },


    /* =======================================================
       UPDATE
    ======================================================= */

    onUpdate: ({ editor }) => {

      isInternalUpdate.current =
        true;


      const html =
        editor.getHTML();


      onChange(html);


      setTimeout(() => {

        isInternalUpdate.current =
          false;

      }, 0);
    },

  });


  /* =========================================================
     SYNC EXTERNAL VALUE
  ========================================================= */

  useEffect(() => {

    if (!editor) {
      return;
    }


    if (isInternalUpdate.current) {
      return;
    }


    const currentHTML =
      editor.getHTML();


    if (
      value !== undefined &&
      value !== currentHTML
    ) {

      editor.commands.setContent(
        value || "",
        false
      );

    }

  }, [value, editor]);


  /* =========================================================
     ADD LINK
  ========================================================= */

  const addLink = () => {

    if (!editor) {
      return;
    }


    const previousUrl =
      editor.getAttributes(
        "link"
      ).href;


    const url = window.prompt(
      "Enter URL",
      previousUrl ||
        "https://"
    );


    if (url === null) {
      return;
    }


    if (url === "") {

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();


      return;
    }


    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({

        href: url,

        target: "_blank",

        rel: "noopener noreferrer",

      })
      .run();

  };


  /* =========================================================
     ADD IMAGE
  ========================================================= */

  const addImage = () => {

    if (!editor) {
      return;
    }


    const url = window.prompt(
      "Enter image URL"
    );


    if (!url) {
      return;
    }


    editor
      .chain()
      .focus()
      .setImage({

        src: url,

      })
      .run();

  };


  /* =========================================================
     INSERT TABLE
  ========================================================= */

  const insertTable = (
    rows = 3,
    cols = 3,
    withHeader = true
  ) => {

    if (!editor) {
      return;
    }


    editor
      .chain()
      .focus()
      .insertTable({

        rows,

        cols,

        withHeaderRow:
          withHeader,

      })
      .run();

  };


  /* =========================================================
     TABLE ACTIONS
  ========================================================= */

  const deleteTable = () => {

    editor
      ?.chain()
      .focus()
      .deleteTable()
      .run();

  };


  const addRowBefore = () => {

    editor
      ?.chain()
      .focus()
      .addRowBefore()
      .run();

  };


  const addRowAfter = () => {

    editor
      ?.chain()
      .focus()
      .addRowAfter()
      .run();

  };


  const deleteRow = () => {

    editor
      ?.chain()
      .focus()
      .deleteRow()
      .run();

  };


  const addColumnBefore = () => {

    editor
      ?.chain()
      .focus()
      .addColumnBefore()
      .run();

  };


  const addColumnAfter = () => {

    editor
      ?.chain()
      .focus()
      .addColumnAfter()
      .run();

  };


  const deleteColumn = () => {

    editor
      ?.chain()
      .focus()
      .deleteColumn()
      .run();

  };


  const toggleHeaderRow = () => {

    editor
      ?.chain()
      .focus()
      .toggleHeaderRow()
      .run();

  };


  const mergeCells = () => {

    editor
      ?.chain()
      .focus()
      .mergeCells()
      .run();

  };


  const splitCell = () => {

    editor
      ?.chain()
      .focus()
      .splitCell()
      .run();

  };


  /* =========================================================
     CLEAR FORMATTING
  ========================================================= */

  const clearFormatting = () => {

    editor
      ?.chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run();

  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (!editor) {
    return null;
  }


  return (

    <div className="blog-editor-wrapper">


      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <div className="blog-editor-toolbar">


        {/* HEADING */}

        <select

          className="editor-select"

          value={

            editor.isActive(
              "heading",
              { level: 1 }
            )
              ? "h1"

              : editor.isActive(
                  "heading",
                  { level: 2 }
                )
              ? "h2"

              : editor.isActive(
                  "heading",
                  { level: 3 }
                )
              ? "h3"

              : "paragraph"

          }

          onChange={(event) => {

            const selected =
              event.target.value;


            if (
              selected ===
              "paragraph"
            ) {

              editor
                .chain()
                .focus()
                .setParagraph()
                .run();


              return;
            }


            editor
              .chain()
              .focus()
              .toggleHeading({

                level: Number(
                  selected.replace(
                    "h",
                    ""
                  )
                ),

              })
              .run();

          }}

        >

          <option value="paragraph">
            Normal
          </option>

          <option value="h1">
            Heading 1
          </option>

          <option value="h2">
            Heading 2
          </option>

          <option value="h3">
            Heading 3
          </option>

        </select>


        {/* BOLD */}

        <button

          type="button"

          className={
            editor.isActive("bold")
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }

          title="Bold"

        >
          <strong>B</strong>
        </button>


        {/* ITALIC */}

        <button

          type="button"

          className={
            editor.isActive("italic")
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }

          title="Italic"

        >
          <em>I</em>
        </button>


        {/* UNDERLINE */}

        <button

          type="button"

          className={
            editor.isActive("underline")
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }

          title="Underline"

        >
          <u>U</u>
        </button>


        {/* STRIKE */}

        <button

          type="button"

          className={
            editor.isActive("strike")
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }

          title="Strike"

        >
          <s>S</s>
        </button>


        <span className="toolbar-divider" />


        {/* BULLET LIST */}

        <button

          type="button"

          className={
            editor.isActive(
              "bulletList"
            )
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }

          title="Bullet List"

        >
          •
        </button>


        {/* ORDERED LIST */}

        <button

          type="button"

          className={
            editor.isActive(
              "orderedList"
            )
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }

          title="Numbered List"

        >
          1.
        </button>


        {/* BLOCKQUOTE */}

        <button

          type="button"

          className={
            editor.isActive(
              "blockquote"
            )
              ? "toolbar-button active"
              : "toolbar-button"
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }

          title="Blockquote"

        >
          ❝
        </button>


        <span className="toolbar-divider" />


        {/* LINK */}

        <button

          type="button"

          className="toolbar-button"

          onClick={addLink}

          title="Add Link"

        >
          🔗
        </button>


        {/* IMAGE */}

        <button

          type="button"

          className="toolbar-button"

          onClick={addImage}

          title="Add Image"

        >
          🖼️
        </button>


        <span className="toolbar-divider" />


        {/* =================================================
            TABLE
        ================================================= */}

        <button

          type="button"

          className="toolbar-button"

          onClick={() =>
            insertTable(
              3,
              3,
              true
            )
          }

          title="Insert 3 × 3 Table"

        >
          ▦
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={addRowBefore}

          title="Add Row Before"

        >
          ↥
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={addRowAfter}

          title="Add Row After"

        >
          ↧
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={deleteRow}

          title="Delete Row"

        >
          −R
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={addColumnBefore}

          title="Add Column Before"

        >
          ←+
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={addColumnAfter}

          title="Add Column After"

        >
          +→
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={deleteColumn}

          title="Delete Column"

        >
          −C
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={toggleHeaderRow}

          title="Toggle Header Row"

        >
          TH
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={mergeCells}

          title="Merge Cells"

        >
          ⊞
        </button>


        <button

          type="button"

          className="toolbar-button"

          onClick={splitCell}

          title="Split Cell"

        >
          ⊟
        </button>


        <button

          type="button"

          className="toolbar-button danger"

          onClick={deleteTable}

          title="Delete Table"

        >
          ×T
        </button>


        <span className="toolbar-divider" />


        {/* UNDO */}

        <button

          type="button"

          className="toolbar-button"

          disabled={
            !editor.can().undo()
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .undo()
              .run()
          }

          title="Undo"

        >
          ↶
        </button>


        {/* REDO */}

        <button

          type="button"

          className="toolbar-button"

          disabled={
            !editor.can().redo()
          }

          onClick={() =>
            editor
              .chain()
              .focus()
              .redo()
              .run()
          }

          title="Redo"

        >
          ↷
        </button>


        {/* CLEAR */}

        <button

          type="button"

          className="toolbar-button"

          onClick={
            clearFormatting
          }

          title="Clear Formatting"

        >
          Tx
        </button>

      </div>


      {/* ===================================================
          EDITOR
      =================================================== */}

      <EditorContent
        editor={editor}
      />


      {/* ===================================================
          FOOTER
      =================================================== */}

      <div className="editor-footer">

        <span>
          Rich text editor
        </span>

        <span>
          Tables supported
        </span>

      </div>

    </div>

  );
};


/* ===========================================================
   ESCAPE HTML
=========================================================== */

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


export default BlogEditor;
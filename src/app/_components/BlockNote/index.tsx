"use client";

import "@blocknote/core/fonts/inter.css";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  locales,
} from "@blocknote/core";
import { Alert } from "./customBlocks/Alert";
import { Image } from "./customBlocks/Image";
import { Debug } from "./Debug";
import { Toolbar } from "./Toolbar";
import { useCallback, useEffect, useState } from "react";
import { request } from "http";
import { MdImage } from "react-icons/md";

export const BlockNote = () => {
  const [html, setHtml] = useState<string>();
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      alert: Alert,
      image: Image,
    },
  });

  const editor = useCreateBlockNote({
    schema,
    // メニューを日本語化
    dictionary: locales.ja,
    domAttributes: {
      blockContent: {},
    },
    initialContent: [
      {
        type: "paragraph",
        content: [
          "Hello, ",
          {
            type: "text",
            text: "world!",
            styles: {
              bold: true,
            },
          },
        ],
      },
      {
        type: "image",
        props: {
          textColor: "default",
          textAlignment: "left",
          type: "image",
          src: "https://cataas.com/cat/81APx1oJqIigJwJM",
          alt: "alt text",
          width: "100",
          height: "100",
          caption: "caption text",
          href: "",
          targetBlank: false,
        },
      },
      {
        type: "paragraph",
      },
    ],
  });

  const insertImage = (editor: typeof schema.BlockNoteEditor) => {
    return {
      title: "画像",
      onItemClick: () => {
        insertOrUpdateBlock(editor, {
          type: "image",
        });
      },
      aliases: ["image", "img"],
      group: "メディア",
      subtext: "画像を挿入します。",
      icon: <MdImage />,
    };
  };

  const onChange = useCallback(async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHtml(html);
  }, [editor]);

  useEffect(() => {
    requestAnimationFrame(() => {
      onChange();
    });
  }, [editor.document, onChange]);

  return (
    <>
      <h1>Block Note</h1>
      <BlockNoteView
        editor={editor}
        // デフォルトのメニューを無効にする
        slashMenu={false}
        // デフォルトのフォーマットメニューを無効にする
        formattingToolbar={false}
        className="w-[75vw]"
        onChange={onChange}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) => {
            // video, image, audioを取り除く
            const ignoreTypes = ["video", "image", "audio"];
            const items = getDefaultReactSlashMenuItems(editor).filter(
              (item) => {
                // @ts-ignore
                return !ignoreTypes.includes(item.key);
              }
            );

            return filterSuggestionItems(
              [...items, insertImage(editor)],
              query
            );
          }}
        />
        <Toolbar />
        <hr
          style={{
            margin: "1lh 0",
          }}
        />
        <Debug html={html || ""} />
      </BlockNoteView>
    </>
  );
};

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
import { useState } from "react";
import { Alert } from "./Alert";
import { Image } from "./Image";
import { Debug } from "./Debug";

export const BlockNote = () => {
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      alert: Alert,
      image: Image,
    },
  });

  const editor = useCreateBlockNote({
    schema,
    dictionary: locales.ja,
    domAttributes: {
      blockContent: {},
    },
    initialContent: [
      {
        type: "paragraph",
      },
      {
        type: "image",
      },
    ],
  });
  const [blocks, setBlocks] = useState<Block[]>([]);

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
    };
  };

  return (
    <>
      <h1>Block Note</h1>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          setBlocks(editor.document);
        }}
        // デフォルトのメニューを無効にする
        slashMenu={false}
        className="w-[75vw]"
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) => {
            // video, image, audioを取り除く
            // const ignoreTypes = ["video", "image", "audio"];
            const ignoreTypes = ["video", "audio"];
            const items = getDefaultReactSlashMenuItems(editor).filter(
              (item) => {
                return !ignoreTypes.includes(item.key);
              }
            );

            return filterSuggestionItems(
              [...items, insertImage(editor)],
              query
            );
          }}
        />
      </BlockNoteView>
      <hr
        style={{
          margin: "1lh 0",
        }}
      />
      <Debug blocks={blocks} />
    </>
  );
};

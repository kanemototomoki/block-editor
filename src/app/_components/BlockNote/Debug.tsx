import {
  Block,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import { useBlockNoteEditor } from "@blocknote/react";
import { FC, } from "react";

type Props = {
  html: string;
};

export const Debug: FC<Props> = ({ html }) => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  return (
    <>
      <div
        style={{
          marginTop: "1lh",
        }}
      >
        <h2>to HTML</h2>
        <div
          style={{
            padding: "4px",
            border: "1px solid #ccc",
          }}
        >
          <pre className="whitespace-pre-wrap break-words p-4 bg-gray-100 border border-gray-300 rounded overflow-x-auto">
            <code>{html}</code>
          </pre>
        </div>
      </div>
      <div
        style={{
          marginTop: "1lh",
        }}
      >
        <h2>to JSON</h2>
        <div
          style={{
            padding: "4px",
            border: "1px solid #ccc",
          }}
        >
          <pre>
            <code>{JSON.stringify(editor.document, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

import {
  Block,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import { useBlockNoteEditor } from "@blocknote/react";
import { FC } from "react";

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
      <div className="mt-4">
        <h2>to HTML</h2>
        <div className="mt-4 border p-2">
          <pre className="whitespace-pre-wrap break-words p-2 bg-gray-100 border border-gray-300 rounded overflow-x-auto">
            <code>{html}</code>
          </pre>
        </div>
      </div>
      <div className="mt-4">
        <h2>to JSON</h2>
        <div className="mt-4 border p-2">
          <pre className="whitespace-pre-wrap break-words p-2 bg-gray-100 border border-gray-300 rounded overflow-x-auto">
            <code>{JSON.stringify(editor.document, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

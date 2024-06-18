import { Block } from "@blocknote/core";
import { FC } from "react";

type Props = {
  blocks: Block[];
};

export const Debug: FC<Props> = ({ blocks }) => {
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
          <pre>{/* <code>{editor.blocksToHTMLLossy()}</code> */}</pre>
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
            <code>{JSON.stringify(blocks, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

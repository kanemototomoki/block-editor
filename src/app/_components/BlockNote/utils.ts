import {
  Block,
  BlockFromConfig,
  BlockNoteEditor,
  BlockSchema,
  FileBlockConfig,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";

export const checkBlockIsImageBlock = <
  B extends BlockSchema,
  I extends InlineContentSchema,
  S extends StyleSchema
>(
  block: Block<any, I, S>,
  editor: BlockNoteEditor<B, I, S>
): block is BlockFromConfig<FileBlockConfig, I, S> => {
  return block.type === "image";
};

import {
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
  checkBlockIsFileBlock,
  checkBlockIsFileBlockWithPlaceholder,
} from "@blocknote/core";
import {
  useBlockNoteEditor,
  useComponentsContext,
  useDictionary,
  useSelectedBlocks,
} from "@blocknote/react";
import {
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  memo,
  KeyboardEvent,
} from "react";
import { RiInputField } from "react-icons/ri";
import { checkBlockIsImageBlock } from "../../../utils";

export const ImageCaption = memo(() => {
  const dict = useDictionary();
  const Components = useComponentsContext()!;
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  const [currentEditingCaption, setCurrentEditingCaption] = useState<string>();
  const selectedBlocks = useSelectedBlocks(editor);

  const imageBlock = useMemo(() => {
    if (selectedBlocks.length !== 1) {
      return undefined;
    }

    const block = selectedBlocks[0];

    if (checkBlockIsImageBlock(block, editor)) {
      setCurrentEditingCaption(block.props.caption);
      return block;
    }

    return undefined;
  }, [editor, selectedBlocks]);

  const handleEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (imageBlock && event.key === "Enter") {
        event.preventDefault();
        editor.updateBlock(imageBlock, {
          // @ts-ignore
          props: {
            caption: currentEditingCaption,
          },
        });
      }
    },
    [currentEditingCaption, editor, imageBlock]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setCurrentEditingCaption(event.currentTarget.value),
    []
  );

  if (!imageBlock || !editor.isEditable) {
    return null;
  }

  return (
    <Components.Generic.Popover.Root>
      <Components.Generic.Popover.Trigger>
        <Components.FormattingToolbar.Button
          className={"bn-button"}
          label={dict.formatting_toolbar.file_caption.tooltip}
          mainTooltip={dict.formatting_toolbar.file_caption.tooltip}
          icon={<RiInputField />}
          isSelected={imageBlock.props.caption !== ""}
        />
      </Components.Generic.Popover.Trigger>
      <Components.Generic.Popover.Content
        className={"bn-popover-content bn-form-popover"}
        variant={"form-popover"}
      >
        <Components.Generic.Form.Root>
          <Components.Generic.Form.TextInput
            name={"caption"}
            icon={<RiInputField />}
            value={currentEditingCaption || ""}
            autoFocus={true}
            placeholder={dict.formatting_toolbar.file_caption.input_placeholder}
            onKeyDown={handleEnter}
            onChange={handleChange}
          />
        </Components.Generic.Form.Root>
      </Components.Generic.Popover.Content>
    </Components.Generic.Popover.Root>
  );
});

ImageCaption.displayName = "ImageCaption";

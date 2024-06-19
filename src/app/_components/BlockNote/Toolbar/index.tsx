import {
  FormattingToolbar,
  FormattingToolbarController,
  FormattingToolbarProps,
  getFormattingToolbarItems,
  useComponentsContext,
} from "@blocknote/react";
import { FC, ReactNode } from "react";
import { ImageCaption } from "./Buttons/ImageCaption";

type Props = FormattingToolbarProps & {
  children?: ReactNode;
};

/**
 *
 * @desc カスタムツールバー
 * @see https://www.blocknotejs.org/docs/ui-components/formatting-toolbar
 */
export const Toolbar: FC<Props> = ({ blockTypeSelectItems, children }) => {
  const ImageCaptionComponent = <ImageCaption key="custom-image" />;

  const toolbarItems = [
    ImageCaptionComponent,
    ...getFormattingToolbarItems(blockTypeSelectItems),
  ];

  return (
    <FormattingToolbarController
      formattingToolbar={() => {
        return <FormattingToolbar>{toolbarItems}</FormattingToolbar>;
      }}
    />
  );
};

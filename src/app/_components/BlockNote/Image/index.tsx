import {
  BlockConfig,
  CustomBlockConfig,
  PropSchema,
  defaultProps,
} from "@blocknote/core";
import {
  ReactCustomBlockImplementation,
  ReactCustomBlockRenderProps,
  createReactBlockSpec,
} from "@blocknote/react";
import { Button, DialogTrigger } from "react-aria-components";
import NextImage from "next/image";
import { Modal } from "./Modal";

const schema = {
  textAlignment: defaultProps.textAlignment,
  textColor: defaultProps.textColor,
  type: {
    default: "image",
  },
  src: {
    default: "",
  },
} satisfies PropSchema;

const config = {
  type: "image",
  propSchema: schema,
  content: "inline",
} satisfies CustomBlockConfig;

export type CustomBlockImpl = ReactCustomBlockImplementation<
  typeof config,
  any,
  any
>;

const render: CustomBlockImpl["render"] = (props) => {
  console.log("render, props: ", props);

  if (props.block.props.src) {
    return (
      <>
        <NextImage
          src={props.block.props.src}
          alt=""
          width={100}
          height={100}
        />
      </>
    );
  }

  return (
    <>
      <DialogTrigger>
        <Button>画像を選択する</Button>
        <Modal {...props} />
      </DialogTrigger>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      ></img>
    </>
  );
};

const parse: CustomBlockImpl["parse"] = (el) => {
  console.log("parse, el: ", el);

  return undefined;
};

const toExternalHTML: CustomBlockImpl["toExternalHTML"] = (props) => {
  console.log("toExternalHTML, props: ", props);
  return <p>toExternalHTML</p>;
};

/**
 * @desc カスタム画像ブロック
 * @see https://www.blocknotejs.org/docs/custom-schemas/custom-blocks#block-implementation-reactcustomblockimplementation
 */
export const Image = createReactBlockSpec(config, {
  render,
  parse,
  toExternalHTML,
});

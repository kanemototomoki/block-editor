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
  alt: {
    default: "",
  },
  width: {
    default: "",
  },
  height: {
    default: "",
  },
  caption: {
    default: "",
  },
  href: {
    default: "",
  },
  targetBlank: {
    default: false,
  },
} satisfies PropSchema;

const config = {
  type: "image",
  propSchema: schema,
  content: "none",
} satisfies CustomBlockConfig;

export type CustomBlockImpl = ReactCustomBlockImplementation<
  typeof config,
  any,
  any
>;

const render: CustomBlockImpl["render"] = (props) => {
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
    </>
  );
};

const parse: CustomBlockImpl["parse"] = (el) => {
  return (
    <NextImage
      src={el.getAttribute("src") || ""}
      alt=""
      width={100}
      height={100}
    />
  );
};

const ImageToExternalHTML: CustomBlockImpl["toExternalHTML"] = (props) => {
  const baseImageDomSpec = (
    <figure>
      {/* INFO: 生成されるHTMLのためnext/imageは使用しない */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.block.props.src} alt="" width={100} height={100} />
      {props.block.props.caption && (
        <figcaption>{props.block.props.caption}</figcaption>
      )}
    </figure>
  );

  if (props.block.props.href) {
    return (
      <a
        href={props.block.props.href}
        target={props.block.props.targetBlank ? "_blank" : undefined}
      >
        {baseImageDomSpec}
      </a>
    );
  }

  return baseImageDomSpec;
};

/**
 * @desc カスタム画像ブロック
 * @see https://www.blocknotejs.org/docs/custom-schemas/custom-blocks#block-implementation-reactcustomblockimplementation
 */
export const Image = createReactBlockSpec(config, {
  render,
  // parse,
  toExternalHTML: (props) => <ImageToExternalHTML {...props} />,
});

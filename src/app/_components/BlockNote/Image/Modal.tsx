import { Button, Dialog, Modal as OriginalModal } from "react-aria-components";
import { CustomBlockImpl } from ".";
import { FC, useEffect, useState } from "react";
import NextImage from "next/image";

type Props = Parameters<CustomBlockImpl["render"]>[0];
const BASE_API_URL = "https://cataas.com/cat";

export const Modal: FC<Props> = (props) => {
  const [displayCat, setDisplayCat] = useState<string>("");

  const fetchCat = async () => {
    const res = await fetch(`${BASE_API_URL}?json=true&width=150`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log("json: ", json);
    setDisplayCat(json._id);
  };

  useEffect(() => {
    const init = async () => {
      await fetchCat();
    };

    init();
  }, []);

  return (
    <OriginalModal>
      <Dialog>
        {({ close }) => (
          <>
            <div className="grid ">
              {displayCat ? (
                <Button
                  onPress={() => {
                    // 選択中のブロックを更新
                    props.editor.updateBlock(props.block, {
                      type: "image",
                      props: { src: `${BASE_API_URL}/${displayCat}` },
                    });

                    // close dialog
                    close();
                  }}
                >
                  <NextImage
                    className="hover:border-blue-200 border-2 border-transparent"
                    src={`${BASE_API_URL}/${displayCat}`}
                    alt=""
                    width={100}
                    height={100}
                  />
                </Button>
              ) : (
                <p>Loading...</p>
              )}
              <Button
                className="bg-white mt-2"
                onPress={() => {
                  setDisplayCat("");
                  fetchCat();
                }}
              >
                reroll
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </OriginalModal>
  );
};

'use client'

import "@blocknote/core/fonts/inter.css";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export const BlockNote = () => {
  const editor = useCreateBlockNote();

  return (
    <>
      <h1>Block Note</h1>
      <BlockNoteView editor={editor}/>
    </>
  )
}


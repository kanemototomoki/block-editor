'use client'

import {Tab, TabList, TabPanel, Tabs as OriginalTabs} from 'react-aria-components'
import {Gutenberg} from "@/app/_components/Gutenberg";
import {Editorjs} from "@/app/_components/Editorjs";
import {BlockNote} from "@/app/_components/BlockNote";

export const Tabs = () => {
  return (
    <OriginalTabs aria-label="block editor tabs">
      <TabList className="flex gap-4 [&>*]:border-2 [&>*]:p-2 aria-selected:[&>*]:bg-sky-200">
        <Tab id="blocknote">Block Note</Tab>
        <Tab id="gutenberg">Gutenberg</Tab>
        <Tab id="editorjs">Editor.js</Tab>
      </TabList>
      <TabPanel id="gutenberg">
        <Gutenberg/>
      </TabPanel>
      <TabPanel id="editorjs">
        <Editorjs/>
      </TabPanel>
      <TabPanel id="blocknote">
        <BlockNote/>
      </TabPanel>
    </OriginalTabs>
  )
}
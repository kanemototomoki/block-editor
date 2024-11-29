"use client";

import {
  Tab,
  TabList,
  TabPanel,
  Tabs as OriginalTabs,
} from "react-aria-components";
import { BlockNote } from "@/app/_components/BlockNote";

export const Tabs = () => {
  return (
    <OriginalTabs aria-label="block editor tabs">
      <TabList className="flex gap-4 [&>*]:border-2 [&>*]:p-2 aria-selected:[&>*]:bg-sky-200">
        <Tab id="blocknote">Block Note</Tab>
      </TabList>
      <TabPanel id="blocknote">
        <BlockNote />
      </TabPanel>
    </OriginalTabs>
  );
};

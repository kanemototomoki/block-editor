"use client";

import dynamic from "next/dynamic";

const DynamicTabs = dynamic(
  () => import("./_components/Tabs").then((module) => module.Tabs),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>
        Source Code:
        <a
          href="https://github.com/kanemototomoki/block-editor"
          target="_blank"
          className="visited:text-purple-600 text-blue-600"
        >
          https://github.com/kanemototomoki/block-editor
        </a>
      </p>
      <hr className="mt-4" />
      <DynamicTabs />
    </main>
  );
}

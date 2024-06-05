'use client'

import dynamic from 'next/dynamic'

const DynamicTabs = dynamic(() => import('./_components/Tabs').then((module) => module.Tabs), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DynamicTabs/>
    </main>
  );
}

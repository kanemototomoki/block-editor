import {Tabs} from "@/app/_components/Tabs";
import {Provider} from "@/app/Provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider>
        <Tabs/>
      </Provider>
    </main>
  );
}

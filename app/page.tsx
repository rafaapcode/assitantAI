import { Chat } from "./_components/chat";

export default function Home() {
  return (
    <main className="flex w-screen justify-center items-center pt-2 md:p-12">
      <div className="container">
        <Chat />
      </div>
    </main>
  );
}

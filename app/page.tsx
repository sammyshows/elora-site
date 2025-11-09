export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center justify-center grow">
        <h1>Hello World</h1>
      </div>

      <footer className="flex items-center justify-center py-4  divide-x divide-zinc-200 dark:divide-zinc-800">
        <a href="/privacy-policy" className="px-3 text-sm text-zinc-500 dark:text-zinc-400">Privacy Policy</a>
        <a href="/terms" className="px-3 text-sm text-zinc-500 dark:text-zinc-400">Terms of Service</a>
      </footer>
    </div>
  );
}

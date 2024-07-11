import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI POC</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 p-6 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI POC</h1>
          <p className="text-lg text-gray-600 mb-8">Made with: NextJS + Tailwind CSS + TypeScript</p>
          <nav className="flex flex-col space-y-4">
            <Link href="/openai" className="text-lg text-blue-500 hover:text-blue-700 transition duration-300 border border-blue-500 hover:bg-blue-500 px-4 py-2 rounded-lg shadow-sm">
                OpenAI Integration
              </Link>
            <Link href="/gemini" className="text-lg text-blue-500 hover:text-blue-700 transition duration-300 border border-blue-500 hover:bg-blue-500 px-4 py-2 rounded-lg shadow-sm">
                Gemini Integration
              </Link>
          </nav>
        </div>
      </main>
    </>
  );
}

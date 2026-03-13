export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-6">Bem-vinda à Biblioteca</h1>
      <a
        href="/dashboard"
        className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
      >
        Dashboard
      </a>
    </div>
  );
}

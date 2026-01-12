"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  async function clipVideo() {
    if (!url || !start || !end) {
      setStatus("Please fill all fields");
      return;
    }

    setStatus("Processing...");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/clip?source=youtube&url=${encodeURIComponent(
          url
        )}&start=${start}&end=${end}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Server error");

      setStatus("Clip complete!");
    } catch (err) {
      console.error(err);
      setStatus("Error while clipping");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
    <div className="bg-zinc-900 p-8 rounded-xl w-96 shadow-lg">
      <h1 className="text-2xl mb-4 text-center text-white">AutoClip</h1>

      <input
        className="w-full mb-3 p-2 rounded bg-zinc-800 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="YouTube or Drive URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 rounded bg-zinc-800 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Start time (00:10)"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 rounded bg-zinc-800 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="End time (00:20)"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button
        onClick={clipVideo}
        className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700 transition"
      >
        Clip Video
      </button>

      <p className="mt-3 text-center text-sm text-zinc-300">{status}</p>
    </div>
  </main>
  );
}
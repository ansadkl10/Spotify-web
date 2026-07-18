import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);

  const searchSong = async () => {
    if (!query) return;
    const res = await fetch(`https://api.nexray.eu.cc/downloader/spotifyplay?q=${encodeURIComponent(query)}`);
    const result = await res.json();
    if (result.status) setData(result.result);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-2xl">
        <input 
          className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4 outline-none"
          placeholder="Search song..." 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchSong} className="w-full bg-green-500 p-2 rounded-lg font-bold">Search</button>

        {data && (
          <div className="mt-6 text-center">
            <img src={data.thumbnail} className="w-40 h-40 mx-auto rounded-md mb-4" />
            <h2 className="text-lg font-bold">{data.title}</h2>
            <p className="text-gray-400 mb-4">{data.artist}</p>
            <audio src={data.download_url} controls className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;


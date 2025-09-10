import React from 'react'

const Login = () => {
  const ping = async () => {
    const r = await fetch ('/api/login',{ credentials:'include'});
    const j = await r.json();
    console.log(j);
    alert(JSON.stringify(j));
  }
  //switching to 127 site if localhost is somehow visited
  if (window.location.hostname === "localhost") {
  window.location.replace(
    `http://127.0.0.1:5173${window.location.pathname}${window.location.search}${window.location.hash}`
  );
}
  return (
    <div className="flex items-center justify-center min-h-screen">
    <button
      onClick={() => window.location.href = "/api/login"}
      className="py-3 px-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60">Log in with Spotify
    </button>
    </div>
    );
};

export default Login
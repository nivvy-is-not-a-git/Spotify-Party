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
    
    <div><h1>React + Flask</h1><a href="/api/login">Log in with Spotify</a></div>
  );
};

export default Login
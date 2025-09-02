import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";


const Create = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
//r.json makes a new promise 
  fetch ("/api/test").then((r) => {
    if (!r.ok) throw new Error("HTTP" + r.status);
    return r.text()
  })
  .then((j) => {
    console.log(j);
  })
  useEffect (() =>{
    fetch ("/api/playlists").then((r) =>{
      if (!r.ok) throw new Error("HTTP" + r.status);
      return r.json()
    })
    .then((j) => {
      console.log("Playlists from backend:", j.items);
      setPlaylists(j.items);
    })
    .catch((err) => {
      console.error("Failed to load playlists", err)
    });
  }, []); //empty dependancy array means that this will only run once and that's when the page first render (when the component is first mounted)
  return (
    <div className="fixed inset-0 grid place-items-center bg-slate-800">
      <main className="bg-white w-1/2 h-3/4 rounded-lg place-items-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Select Playlist 
        </h1>
        <div class="grid grid-cols-4 gap-4" role="group">

              {playlists.map((p) => ( 
                <button
                onClick={() => navigate("/")}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:hover:bg-black dark:focus:ring-green-800"
                >
                <div key = {p.id} className="italic font-extrabold text-white"> {p.name}</div>
                </button>
              ))}
        </div>
      </main>
    </div>
  );
};

export default Create;

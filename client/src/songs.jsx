import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import upvote from "./assets/thumbs_up.png"

const Songs = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const {playlistId}=useParams();
    const [votes, setVotes] = useState([{}]);
    const sortedSongs = [...songs].sort((a,b) => {
      const aId = a.track?.id ?? a.added_at;
      const bId = b.track?.id ?? b.added_at;
      return (votes[bId] || 0) - (votes[aId] || 0);
    });
    function handleClick(){
      
    }
    useEffect (() =>{
        fetch (`/api/playlists/${playlistId}/tracks`).then((r) =>{
          if (!r.ok) throw new Error("HTTP" + r.status);
          return r.json()
        })
        .then((j) => {
          console.log("Songs from backend:", j.items);
          setSongs(j.items);
        })
        .catch((err) => {
          console.error("Failed to load songs", err)
        });
      }, [playlistId]);
    
      useEffect(() => {
        const interval = setInterval(() => {
            const sortedIds = sortedSongs.map(s => s.track?.id ?? s.added_at);
            fetch(`/api/playlists/${playlistId}/reorder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: sortedIds }),
            })
                .then(r => r.json())
                .then(j => {
                    // Optionally handle response
                    // console.log(j.message || "Playlist reordered!");
                })
                .catch(e => {
                    console.error("Failed to reorder playlist");
                });
        }, 10000); 
        return () => clearInterval(interval);
    }, [sortedSongs, playlistId]);
          
        
    return (
      <main className="bg-slate-800 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4" role="group">
                {sortedSongs.map((s) => (
  <div key={s.track?.id ?? s.added_at} className="bg-black text-white rounded-2xl p-6 shadow-lg">
    <button
      type="button"
      onClick={() => {
        const id = s.track?.id ?? s.added_at;
        //question mark after track ensures that if null, it doesnt crash it just returns undefined and putting 2 questions marks in between means that if null, use added_at as the value if its there
        setVotes(prev => ({
          ...prev, [id]: (prev[id] ?? 0) +1
        }));
      }}
      className="w-full flex items-center gap-3"
      aria-label={`Upvote ${s.track?.name ?? "track"}`}
    >
      <span className="italic font-extrabold">{s.track?.name ?? "Unknown track"}</span>
      <img
        src={upvote}
        alt=""
        className="w-6 h-6 ml-auto rounded object-cover"  // ml-auto pushes it to the right
      />
      <span className="ml-2">{votes[s.track?.id ?? s.added_at] || 0}</span>
    </button>
  </div>
))}
        </div>
      </main>

    )
}

export default Songs;
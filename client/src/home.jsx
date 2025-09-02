import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 grid place-items-center bg-rose-50">
      <main className="w-[28rem] max-w-[90vw] flex flex-col items-center gap-6 p-10 bg-white/90 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Collaborative Playlist
        </h1>

        <div className="flex flex-col gap-4 w-full">
          {/* ignore this comment actually this was before i decided to link to frontend instead of backend here using <button> , onClick and window.locate.href instead of ahref because we want all buttons to have same universal properties so we stick with one archetype throughout */}
          <button
            onClick={() => navigate("/create")}
            className="w-full py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
          >
            Create Room
          </button>

          <button
            onClick={() => navigate("/join")}
            className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Join Room
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

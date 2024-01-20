import { useState } from "react";
import "./App.css";

import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [showChat, setShowChat] = useState(false);

  const jionRoom = () => {
    if (room !== "") {
      socket.emit("join", room);
      setShowChat(true);
    }
  };

  return (
    <main style={{ width: "100%", minWidth: "300px" }}>
      {!showChat ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            border: "1px solid gray",
            padding: "15px 10px",
            borderRadius: "10px",
          }}
        >
          <h2>Messanger</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <input
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              placeholder="room key"
              style={{ padding: "10px", width: "90%", flex: "auto" }}
            />
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              placeholder="Username"
              style={{
                padding: "10px",

                width: "90%",
                flex: "auto",
              }}
            />
            <button
              style={{ padding: "10px", minWidth: "300px", width: "100%" }}
              onClick={jionRoom}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}
    </main>
  );
}

export default App;

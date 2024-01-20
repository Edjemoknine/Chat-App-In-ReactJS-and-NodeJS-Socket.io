/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, user, room }) => {
  const [messages, setMessages] = useState([]);
  const [sendMs, setSend] = useState("");

  const sendMsg = () => {
    if (sendMs !== "") {
      const SendingMSG = {
        sendMs,
        room,
        user,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("message", SendingMSG); // ---< message to room 23
      setMessages((prev) => [...prev, SendingMSG]);
      setSend("");
    }
  };
  //   console.log(messages);
  useEffect(() => {
    socket.on("receive", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <section
      style={{
        minHeight: "70vh",
        minWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid gray",
        borderRadius: "5px",
      }}
    >
      <h3
        style={{
          backgroundColor: "blueviolet",
          margin: "0 0 15px 0",
          padding: "10px",
        }}
      >
        Messages: <span style={{ color: "pink" }}>{room}</span>
      </h3>
      <div
        style={{
          height: "50vh",
          padding: "0 10px",
        }}
      >
        <ScrollToBottom scrollViewClassName="view" className="scrollBottom">
          {messages?.map((mes, i) => (
            <div
              style={{
                padding: "0 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: `${mes.user === user ? "flex-end" : "flex-start"}`,
              }}
              key={i}
            >
              <h6
                style={{
                  borderRadius: "10px 10px 10px 0px",
                  backgroundColor: `${
                    mes.user === user ? "greenyellow" : "skyblue"
                  }`,
                  margin: "0",
                  padding: "4px 10px",
                  color: "black",
                  textAlign: "left",
                }}
              >
                {mes.sendMs}
              </h6>
              <div
                style={{
                  fontSize: "10px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    padding: "4px",
                  }}
                >
                  {mes.user}
                </span>
                <span style={{ color: "gray", fontSize: "7px" }}>
                  {mes.time}
                </span>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          onChange={(e) => setSend(e.target.value)}
          type="text"
          value={sendMs}
          style={{ padding: "10px", flex: "auto" }}
          placeholder="send message"
          onKeyPress={(event) => {
            event.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </section>
  );
};

export default Chat;

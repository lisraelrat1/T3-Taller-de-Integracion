import React from "react";

import "./ChatRoom.css";
import useChat from "./useChat";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Button from '@material-ui/core/Button';

const ChatRoom = (props) => {
  const [ui, updateUI] = React.useState({ mode: "read" });
  const [username, updateProject] = React.useState({
    title: "Click here to edit username"
  });

  const { messages, sendMessage} = useChat(username.title); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  // This is the form
  const [title, updateTitle] = React.useState(username.title);

  const onSubmit = (e) => {
    e.preventDefault();
    // Update page data, update ui state, clear form errors
    updateProject((p) => ({ ...p, title }));
    updateUI({ mode: "read" });
  };

  // Select the title text when you enter edit mode
  // This can't just be in a local function because that dom ref isn't rendered
  const titleRef = React.useRef();
  React.useEffect(
    () => {
      // Only run when you are entering edit mode
      if (ui.mode === "edit") {
        titleRef.current.select();
      }
    },
    [ui.mode] // Run when this changes
  );

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.name + ': '}
              <div className="date">{(new Date(message.date)).toLocaleString()}</div>
              <br></br>
              { message.message}
            </li>
          ))}
        </ol>
      </div>
      <div className="new-message-input-username">
      {ui.mode === "read" && (
        <>
          <div className="username">
            <AccountBoxIcon fontSize="large"></AccountBoxIcon>
            <h1
              onClick={() => updateUI({ mode: "edit" })}
              className = "title"
            >
              {username.title}
            </h1>
            <div className="editbutton">
            <Button 
              variant="contained" 
              color="default"
              type="button"
              onClick={() => updateUI({ mode: "edit" })}
              
            >
              edit
            </Button>
            </div>
            
          </div>
        </>
      )}

      {ui.mode === "edit" && (
        <>
          <form className="" onSubmit={onSubmit}>
            <input
              ref={titleRef}
              // className={`flex-1 border-b border-grey-light focus:border-green focus:bg-grey-lightest`}
              type="text"
              placeholder="Title goes here"
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <Button type="submit" variant="contained" 
              color="default"
              className="alignright">
              save
            </Button>
          </form>
        </>
        )}
      </div>

      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
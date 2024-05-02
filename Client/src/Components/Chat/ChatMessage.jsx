import "./chat.css";

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === "123" ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          alt="profile"
        />
        <p>{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;

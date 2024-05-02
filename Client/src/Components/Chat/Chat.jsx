import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import "./chat.css";
import React from "react";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import Speech from 'react-speech';
const Chat = ({questions}) => {
  let initialText = questions.companyInfo;
  console.log(questions);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const speakMessage = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };
  useEffect(()=>{
    console.log("hello");
    if(initialText != null)speakMessage(initialText)
    initialText = null;
  },[]);
  const dummy = useRef();
  const messages = [
    {
      id: 1,
      text: questions?.companyInfo,
      uid: "456",
      photoURL: "https://i.redd.it/bcyq3rjk2w071.png",
    }
  ];

  const [formValue, setFormValue] = useState("");
  const [msgs, setMsgs] = useState(messages);
  const [generalQuestioIndex, setGeneralQuestioIndex] = useState(0);
  const [pyqQuestionIndex, setPyqQuestionIndex] = useState(0);
  const sendMessage = async (e) => {
    e.preventDefault();
    const uid = "123";
    const botText = (generalQuestioIndex!=-1?questions.generalQuestions[generalQuestioIndex]:pyqQuestionIndex!=-1?questions.previousYearQuestions[pyqQuestionIndex].substring(2):"Your Interview is officially Over");
    speakMessage(botText);
    const botQuestion = {
      id: msgs.length + 2,
      text: botText,
      uid: "456",
      photoURL: "https://i.redd.it/bcyq3rjk2w071.png",
    }
    const photoURL = "https://wallpapers.com/images/hd/shadow-boy-white-eyes-unique-cool-pfp-nft-13yuypusuweug9xn.jpg";
    setMsgs([
      ...msgs,
      {
        id: msgs.length + 1,
        text: formValue,
        uid,
        photoURL,
      },
      botQuestion

    ])
    if(generalQuestioIndex != -1){
      setGeneralQuestioIndex(generalQuestioIndex + 1);
      if(generalQuestioIndex === questions.generalQuestions.length - 1) {
        setGeneralQuestioIndex(-1);
      }
    }
    else if(generalQuestioIndex === -1){
      setPyqQuestionIndex(pyqQuestionIndex + 1);
      if(pyqQuestionIndex === questions.previousYearQuestions.length - 1){
        setPyqQuestionIndex(-1);
      }
    }
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
const handleRecord=()=>{
  if(listening){
    SpeechRecognition.stopListening()
  }else{
    SpeechRecognition.startListening()
  }
}
  return (
    <div className="container">
      <h2
        style={{
          width: "100vw",
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#282c34",
        }}
      >
        All the Best
      </h2>
      <main>
        {msgs && msgs.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage} className="formContainer">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type or record your answer here!"
        />
        <button type="submit" disabled={!formValue}>
          {">"}
        </button>
      </form>
        {/* <button onClick={handleRecord}>
          {listening?"stop":"start"}
        </button> */}
      {/* <p style={{color:'black'}}>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p style={{color:'black'}}>{transcript}</p> */}
    </div>
  );
};

export default Chat;
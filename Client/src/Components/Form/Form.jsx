import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import Chat from "../Chat/Chat";
// import IMG from '../../assets/meta_.png';

const Form = () => {
  const [name, setName] = useState(""); 
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [desciption, setDescription] = useState("");
  const [startInterview, setStartIntview] = useState(false);
  const [questionSet,SetquestionSet] = useState([]);

  const sendRequest = async () => {
    const body = { companyName: company, position: role, desciption };
    console.log(body);
    const res = await axios.post("http://localhost:5000/interview", body);
    console.log(res.data);
    setStartIntview(true)
    SetquestionSet(res.data);
    return res.data;
  };

  const handleForm = (e) => {
    e.preventDefault();
    sendRequest();
  };

  if (startInterview) {
    return <Chat questions={questionSet}/>
  } else {
    return (
      <div className="details">
        
        <h3>Provide the following details✍️</h3>
        <br></br>
        <form>
          {/* <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            placeholder="Description"
            value={desciption}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleForm}>Submit</button>
        </form>
      </div>
    );
  }
};

export default Form;

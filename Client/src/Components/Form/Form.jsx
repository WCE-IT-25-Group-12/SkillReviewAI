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
  const [questionSet, SetquestionSet] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    const body = { companyName: company, position: role, desciption };
    console.log(body);
    const res = await axios.post("http://localhost:5000/interview", body);
    console.log(res.data);
    setStartIntview(true);
    SetquestionSet(res.data);
    return res.data;
    setLoading(false);
  };

  const handleForm = (e) => {
    e.preventDefault();
    sendRequest();
  };

  if (startInterview) {
    return <Chat questions={questionSet} />;
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
          <button
            onClick={handleForm}
            className="submit-btnn"
            disabled={loading}
          >
            {loading && (
              <div className="in-cont">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 200 200"
                  color="#fff"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="spinner-secondHalf">
                      <stop
                        offset="0%"
                        stop-opacity="0"
                        stop-color="currentColor"
                      />
                      <stop
                        offset="100%"
                        stop-opacity="0.5"
                        stop-color="currentColor"
                      />
                    </linearGradient>
                    <linearGradient id="spinner-firstHalf">
                      <stop
                        offset="0%"
                        stop-opacity="1"
                        stop-color="currentColor"
                      />
                      <stop
                        offset="100%"
                        stop-opacity="0.5"
                        stop-color="currentColor"
                      />
                    </linearGradient>
                  </defs>

                  <g stroke-width="19">
                    <path
                      stroke="url(#spinner-secondHalf)"
                      d="M 4 100 A 96 96 0 0 1 196 100"
                    />
                    <path
                      stroke="url(#spinner-firstHalf)"
                      d="M 196 100 A 96 96 0 0 1 4 100"
                    />

                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      d="M 4 100 A 96 96 0 0 1 4 98"
                    />
                  </g>

                  <animateTransform
                    from="0 0 0"
                    to="360 0 0"
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1300ms"
                  />
                </svg>
                <p className="submit-btnn-txt">Loading...</p>
              </div>
            )}
            {!loading && <p className="submit-btnn-txt">Submit</p>}
          </button>
        </form>
      </div>
    );
  }
};

export default Form;

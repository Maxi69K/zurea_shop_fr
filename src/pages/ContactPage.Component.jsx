import React, { useState } from 'react';
import { sendContactMail } from '../services/mail.service';

const ContactPageComponent = () => {

    const [inputData, setInputData] = useState({});
    const [isSend, setIsSend] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const onInputHandler = (e) => {
        let copyInputData = {...inputData}
        copyInputData[e.target.name] = e.target.value;
        setInputData(copyInputData);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!inputData.email) {
            setErrMsg('Email field is required!');
        } else if (!inputData.subject) {
            setErrMsg('Subject field is required!');
        } else if (!inputData.message) {
            setErrMsg('Message field is required!');
        } else {
            setErrMsg('');
            //console.log(inputData);
            sendContactMail(inputData)
                .then((res) => {
                    console.log(res.data);
                    setResponseMsg('Message successfully send.');
                  })
                  .catch((err) => {
                    setResponseMsg('Message is not send.');
                    console.log(err);
                  })
                  .finally(() => setIsSend(true));
        }
    }

  return (
    <div className="col-sm-8 col-md-6 col-xl-4 px-3 px-sm-0 m-auto ">
      
      {!isSend ?
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onInput={onInputHandler}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            onInput={onInputHandler}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="message"
            placeholder="message"
            cols="30"
            rows="10"
            onInput={onInputHandler}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
      :
      <h4 className='text-center'>{responseMsg}</h4>
      }
      
      <div className="text-danger my-3">
        {errMsg ? errMsg : null}
      </div>
    </div>
  );
};

export default ContactPageComponent;

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./OpenConversation.css";
import { useSelector } from "react-redux";
import { useConversation } from "../../contexts/ConversationsContext";

const OpenConversation = () => {
  const {
    selectedConversationIndex,
    conversations,
    addMessagetoConversation,
    sendMessage,
  } = useConversation();
  const user = useSelector((state) => state.user);
  const {
    userInfo: { userId },
  } = user;
  const [selectedConversation, setSelectedConversation] = useState(null);
  const text = useRef();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  useEffect(() => {
    if (selectedConversationIndex !== null) {
      setSelectedConversation(conversations[selectedConversationIndex]);
    }
  }, [selectedConversationIndex, conversations]);

  // useEffect(() => {
  //   console.log("changed");
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ smooth: true });
  //   }
  // }, [lastMessageRef.current]);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const textmessage = text.current.value;

    sendMessage(selectedConversation.recepients, textmessage);
    text.current.value = "";
    console.log(textmessage);
  };

  return (
    <>
      {selectedConversationIndex === null ? (
        <p>No conversations selected</p>
      ) : (
        <>
          {selectedConversation && (
            <div className='convo-container'>
              <div className='convo-messages'>
                <div style={{ marginTop: "auto" }}></div>
                {selectedConversation.messages.map((message, index) =>
                  message.sender === userId ? (
                    <div key={index}>
                      <div
                        ref={
                          selectedConversation.messages.length - 1 === index
                            ? setRef
                            : null
                        }
                        className='convo-message-right'
                      >
                        <div className='text'>{message.text}</div>
                      </div>
                      <small
                        className='convo-message-right'
                        style={{ marginRight: "5px" }}
                      >
                        You
                      </small>
                    </div>
                  ) : (
                    <div key={index}>
                      <div className='convo-message-left'>
                        <div className='text'>{message.text}</div>
                      </div>
                      <small
                        lassName='convo-message-left'
                        style={{ marginLeft: "5px" }}
                      >
                        {message.userId}
                      </small>
                    </div>
                  )
                )}
              </div>
              <form className='convo-sendmessage' onSubmit={onSubmitHandler}>
                <textarea ref={text}></textarea>
                <input type='submit' value='SEND'></input>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OpenConversation;

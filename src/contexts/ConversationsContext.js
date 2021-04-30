import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useContacts } from "./ContactsContext";
import { useSocket } from "./SocketsContext";
import { useTest } from "./TestContext";
const conversationContext = React.createContext();
const useConversation = () => {
  return useContext(conversationContext);
};
const ConversationsProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  const {
    userInfo: { userId },
  } = user;
  const conversationsFromLocalStorage = JSON.parse(
    localStorage.getItem("conversations")
  )
    ? JSON.parse(localStorage.getItem("conversations"))
    : [];

  const [conversations, setConversations] = useState(
    conversationsFromLocalStorage
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(
    null
  );
  const { contacts } = useContacts();
  const test = useTest();

  const socket = useSocket();

  const createConversation = (recepients) => {
    console.log("inside", recepients);
    // const recepientInfo = [];
    const recepientInfo = recepients.map((recepient) => {
      const contactInfo = contacts.find((contact) => contact.id === recepient);
      return contactInfo;
    });
    setConversations([
      ...conversations,
      { recepients, recepientInfo, messages: [] },
    ]);

    console.log(conversations);
    localStorage.setItem("conversations", JSON.stringify(conversations));
  };

  const addMessagetoConversation = useCallback(
    ({ recepients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recepients, recepients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          } else {
            return conversation;
          }
        });
        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recepients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    console.log("change happend", conversations);
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations, setConversations]);

  useEffect(() => {
    console.log(socket, "effect running");
    if (socket === null) return;
    socket.on("all", () => {
      console.log("woohoo");
    });
    socket.on("for_id", () => {
      console.log("my eyes only");
    });
    socket.on("receive-message", addMessagetoConversation);
    return () => socket.off("receive-message");
  }, [socket, addMessagetoConversation]);

  const sendMessage = (recepients, textmessage) => {
    socket.emit("send-message", { recepients, text: textmessage });
    addMessagetoConversation({ recepients, text: textmessage, sender: userId });
  };

  /////extra

  const changeSelectedConversationIndex = (index) => {
    setSelectedConversationIndex(index);
  };

  return (
    <conversationContext.Provider
      value={{
        conversations,
        createConversation,
        changeSelectedConversationIndex,
        selectedConversationIndex,
        addMessagetoConversation,
        sendMessage,
      }}
    >
      {children}
    </conversationContext.Provider>
  );
};

const arrayEquality = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};
export { ConversationsProvider, useConversation };

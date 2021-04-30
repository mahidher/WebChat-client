import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useConversation } from "../../contexts/ConversationsContext";
import { useContacts } from "../../contexts/ContactsContext";
const Conversations = () => {
  const {
    conversations,
    changeSelectedConversationIndex,
    selectedConversationIndex,
  } = useConversation();
  const { contacts, getContactName } = useContacts();
  // const [selectedConversation, setSelectedConversation] = useState(0);
  // const changeSelectedConversation = (index) => {
  //   setSelectedConversation(index);
  // };
  return (
    <>
      <ListGroup variant='flush'>
        {conversations &&
          conversations.map((conversation, index) => (
            <ListGroup.Item
              action
              active={selectedConversationIndex === index}
              onClick={() => changeSelectedConversationIndex(index)}
              key={index}
            >
              {conversation.recepients.map((recepient, recepIndex) => (
                <>
                  {recepIndex !== 0 && <>,</>}
                  {getContactName(recepient)}
                </>
              ))}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default Conversations;

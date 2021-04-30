import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsContext";
import { useConversation } from "../../contexts/ConversationsContext";
const ConversationModal = ({ handleClose }) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversation();
  const [newConversation, setNewConversation] = useState([]);
  const onChangeHandler = (e) => {
    const newConvo = e.target.value;
    console.log("changed", e.target.value);
    if (newConversation.includes(newConvo)) {
      const filtered = newConversation.filter((convo) => convo !== newConvo);

      setNewConversation(filtered);
    } else {
      setNewConversation([...newConversation, newConvo]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    createConversation(newConversation);
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>CREATE NEW CONVERSATION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Select contacts to add:</h4>
        <Form onSubmit={onSubmitHandler}>
          {contacts.map((contact, index) => (
            <Form.Group>
              <Form.Check
                type='checkbox'
                key={index}
                value={contact.id}
                id={index}
                label={contact.name}
                onChange={onChangeHandler}
              />
            </Form.Group>
          ))}
          <Modal.Footer>
            <Button type='submit' variant='primary' onClick={handleClose}>
              CREATE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ConversationModal;

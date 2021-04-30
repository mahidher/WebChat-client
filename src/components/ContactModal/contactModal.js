import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsContext";
const ContactModal = ({ handleClose }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create Contact</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmitHandler}>
        <Modal.Body>
          <label for='id'>
            <h4>Enter Id:</h4>
          </label>
          <input type='text' id='id' name='id' ref={idRef} />
          <label for='name'>
            <h4>Enter name:</h4>
          </label>
          <input type='text' id='name' name='name' ref={nameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit' onClick={handleClose}>
            CREATE
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
};

export default ContactModal;

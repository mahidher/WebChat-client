import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Conversations from "../../components/Conversations/conversations";
import Contacts from "../../components/Contacts/contacts";
import ConversationModal from "../../components/ConversationModal/conversationModal";
import ContactModal from "../../components/ContactModal/contactModal";
import "./sidebar.css";
const Sidebar = () => {
  const [conversations, setConversations] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.user);
  const {
    userInfo: { userId },
  } = user;
  const switchSidebarHandler = (val) => {
    if (val === "conversations") {
      console.log("inside if");
      document.querySelector(".nav-item-1").classList.add("active");
      document.querySelector(".nav-item-2").classList.remove("active");
      setConversations(true);
    } else {
      document.querySelector(".nav-item-1").classList.remove("active");
      document.querySelector(".nav-item-2").classList.add("active");
      setConversations(false);
    }
  };

  return (
    <div className='side-bar'>
      <div className='nav-bar'>
        <div
          className='nav-item nav-item-1 active'
          onClick={() => switchSidebarHandler("conversations")}
        >
          CONVERSATIONS
        </div>
        <div
          className='nav-item nav-item-2'
          onClick={() => switchSidebarHandler("contacts")}
        >
          CONTACTS
        </div>
      </div>
      <div className='nav-content'>
        {conversations ? <Conversations /> : <Contacts />}
      </div>
      <div className='create-content'>
        <div className='create-content-2'>
          <p class='your-id'>
            <span style={{ fontWeight: "bold" }}>Your ID: </span>
            {userId}
          </p>
          <input
            className='new-content'
            type='submit'
            value={conversations ? "New Conversation" : "New Contact"}
            onClick={handleShow}
          ></input>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        {conversations ? (
          <ConversationModal handleClose={handleClose} />
        ) : (
          <ContactModal handleClose={handleClose} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;

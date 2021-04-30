import React, { useContext, useState, useEffect } from "react";

const contactsContext = React.createContext();
const useContacts = () => {
  return useContext(contactsContext);
};
const ContactsProvider = ({ children }) => {
  const contactsFromLocalStorage = JSON.parse(localStorage.getItem("contacts"))
    ? JSON.parse(localStorage.getItem("contacts"))
    : [];
  const [contacts, setContacts] = useState(contactsFromLocalStorage);
  // useEffect(() => {
  //   console.log("effect", contacts);
  //   setContacts(
  //     JSON.parse(localStorage.getItem("contacts"))
  //       ? JSON.parse(localStorage.getItem("contacts"))
  //       : []
  //   );
  // }, []);
  const getContactName = (id) => {
    console.log("id", id);
    var val = id;
    contacts.forEach((contact) => {
      if (contact.id === id) {
        console.log(contact.id);
        val = contact.name;
      }
    });
    return val;
  };
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const createContact = (id, name) => {
    console.log("inside", id, name);
    setContacts([...contacts, { id, name }]);
    // setContacts((prevContacts) => {
    //   return [...prevContacts, { id, name }];
    // });
    console.log(contacts);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };
  return (
    <contactsContext.Provider
      value={{ contacts, createContact, getContactName }}
    >
      {children}
    </contactsContext.Provider>
  );
};

export { useContacts, ContactsProvider };

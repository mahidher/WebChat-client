import React, { useContext, useState, useEffect } from "react";

const testContext = React.createContext();
const useTest = () => {
  return useContext(testContext);
};
const TestProvider = ({ children }) => {
  const [test, setTest] = useState("hello");

  //   useEffect(() => {
  //     setTest("mahi");
  //   });

  return <testContext.Provider value={test}>{children}</testContext.Provider>;
};

export { TestProvider, useTest };

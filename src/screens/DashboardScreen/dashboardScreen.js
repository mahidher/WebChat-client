import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./dashboardScreen.css";
import OpenConversation from "../../components/OpenConversation/OpenConversation";

import Sidebar from "../../components/Sidebar/sidebar";
const DashboardScreen = ({ history }) => {
  const user = useSelector((state) => state.user);
  const {
    userInfo: { userId },
  } = user;
  useEffect(() => {
    if (!user || !userId) {
      history.push("/");
    }
  });
  return (
    <div className='dashboard'>
      <Sidebar />
      <OpenConversation />
    </div>
  );
};

export default DashboardScreen;

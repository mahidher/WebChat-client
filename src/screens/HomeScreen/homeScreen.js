import React, { useState, useEffect } from "react";
import "./homeScreen.css";
import { uuid as uuidv4 } from "uuidv4";
import { login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
const HomeScreen = ({ history }) => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo.userId) {
      history.push("/dashboard");
    }
  }, [userInfo, history]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(id));
  };

  const createIdHandler = () => {
    setId(uuidv4());
  };
  return (
    <div className='home-grid'>
      <div className='home-content'>
        <form onSubmit={onSubmitHandler}>
          <h1>Messaging Made Simple.</h1>

          <label for='id'>
            <h4>Enter Id:</h4>
          </label>
          <input
            className=''
            type='text'
            id='id'
            name='id'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input type='submit' value='Login' />
          <h6>
            Not a User?{" "}
            <span className='create-id' onClick={createIdHandler}>
              Create A New Id.
            </span>
          </h6>
        </form>
      </div>

      <video
        className='home-video'
        src='/computer_video.mp4'
        muted
        loop
        autoPlay
      ></video>
    </div>
  );
};

export default HomeScreen;

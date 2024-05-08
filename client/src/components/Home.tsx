import React, { useContext } from "react";
import "../css/global.css";
import "../css/home.css";
import { logout } from "../API/users";
import { Link, useNavigate } from "react-router-dom";
import { UserFrontend } from "common";

const Home: React.FC<{
  user: UserFrontend | null;
  setUser: React.Dispatch<React.SetStateAction<UserFrontend | null>>;
}> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const onClickLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setUser(null);
    logout();
    localStorage.removeItem("user");
    navigate("login");
  };

  return (
    <div className="Home">
      {user ? (
        <Link to="/login" id="logOut" onClick={onClickLogout} />
      ) : (
        <>
          <Link to="/register" id="register" />
          <Link to="/login" id="logIn" />
        </>
      )}
      <header id="roadtripGermany"></header>
      <Link id="actualRouts" to="/routsOverview" />
      <Link id="insertRoadtrip" to="/insertRoadtrip" />
    </div>
  );
};

export default Home;

import { FormEventHandler, useEffect, useState } from "react";
import { login } from "../API/users";
import "../css/global.css";
import "../css/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserFrontend } from "common";

const Login: React.FC<{
  user: UserFrontend | null;
  setUser: React.Dispatch<React.SetStateAction<UserFrontend | null>>;
}> = ({ user, setUser }) => {
  const [message, setMessage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [page2, setPage2] = useState<boolean>(false);
  const [username, setUsername] = useState("Nighel");
  const [password, setPassword] = useState("123Aa%jafjdak;");

  const swipeLeft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPage2(true);
  };

  useEffect(() => {
    if (location.state?.message) setMessage(location.state.message);
  }, [location]);

  const onClickArrowBack = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPage2(false);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const res = login(username, password);
    res
      .then(({ data, status }) => {
        //console.log(resolve.data.message);
        if (status !== 200) {
          setMessage(data.message);
          return;
        }
        setUser(data.user);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <header>
        <Link to="/home">
          <div id="homeButton"></div>
        </Link>

        <Link to="/register">
          <div id="register"></div>
        </Link>
      </header>

      <div id="SignInWindow">
        <h1></h1>
        <div
          id="arrowBack"
          className={page2 ? "previousPage clicked" : "previousPage"}
          onClick={onClickArrowBack}
        ></div>
        <p id="message">{message}</p>
        <div id="swipeContainer">
          <form id="logInForm" onSubmit={onSubmit}>
            <div
              id="usernamePage"
              className={page2 ? "swipe clicked" : "swipe"}
            >
              <input
                name="usrName"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                id="weiter"
                className="nextPage button"
                onClick={swipeLeft}
              >
                weiter
              </button>
            </div>
            <div
              id="passwordPage"
              className={page2 ? "swipe clicked" : "swipe"}
            >
              <input
                name="pw"
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                id="logIn"
                className="button"
                value="einloggen"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

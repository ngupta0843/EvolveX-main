import "./Header.css";
import styled from "styled-components";
import { useHistory, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import tutorSpotLogo from '../images/tutorSpotLogo.png'

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    history("/login");
  };

  return (
    <>
      <div className="header">
        <div className="header_left">
          <img src="" className="logo-img" />
        </div>
        <div className="pages">
          <NavMenu>
            <a onClick={() => history("/")}>
              <span>Home</span>
            </a>
            <a onClick={() => history("/quiz")}>
              <span>Create Quiz</span>
            </a>
            <a onClick={() => history("/flashcards")}>
              <span>Flashcard</span>
            </a>
            <a onClick={() => history("/analytics")}>
              <span>Analytics</span>
            </a>
          </NavMenu>
        </div>
        <div className="header_right">
          {user ? (
            //signed in
            <>
              <NavMenu>
                <a onClick={() => history("/login")}>
                  <span>My account</span>
                </a>
              </NavMenu>
              <button onClick={logout} className="btn signUp-btn">
                <b>Logout</b>
              </button>{" "}
            </>
          ) : (
            //not signed in
            <>
              <NavMenu>
                <a onClick={() => history("/login")}>
                  <span>Login</span>
                </a>
              </NavMenu>
              <button
                onClick={() => history("/register")}
                className="btn signUp-btn"
              >
                <b>Start for Free</b>
              </button>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  //   flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: black;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: 1px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(179, 12, 120);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

export default Header;

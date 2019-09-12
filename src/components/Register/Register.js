import axios from "axios";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  resetFields,
  updateState
} from "./../../redux/AuthReducer/AuthReducer";
import Peep from "../../Logo/Peep-inverted.svg";

const Background = styled.div`
  position: absolute;
  width: 2000px;
  height: 1500px;
  transform: skewX(-55deg) translateX(-1450px);
  background-color: ${props => props.theme.teal2};
  z-index: -1;
`;

const Logo = styled.img`
  position: absolute;
  height: 15rem;
  width: auto;
  left: 40px;
  top: 40px;
`;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const LoginBox = styled.div`
  width: 20rem;
  padding: 40px;
  font-size: 18px;
  color: #72767d;
  background: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 26px;
  line-height: 32px;
  margin-bottom: 8px;
  font-weight: 300;
  color: #72767d;
`;

const Subtitle = styled.div`
  color: #72767d;
  font-size: 18px;
  line-height: 22pxl;
  font-weight: 400;
  outline: 0;
`;
const formStyle = {
  textAlign: "left",
  marginTop: "20px"
};
const InputBox = styled.div`
  .loginMargin {
    margin-bottom: 10px;
  }
`;

const LoginH5 = styled.h5`
  color: #b9bbbe;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex: 1;
  font-weight: 200;
`;
const LoginInput = styled.input`
  color: #72767d;
  /* background-color: rgba(0, 0, 0, 0.1); */
  border-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  border: none;
  border-bottom: solid 2px #4fd1c5;
  outline: none;
`;

const ForgotButton = styled.button`
    color: #7289da;
    display: block;
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 20px;
    margin-top: 4px;
    width: auto;
    height: auto;
    padding: 2px 4px;
    box-sizing: border-box;
    background: none;
    border: none;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    text-decoration:none;
    outline: none;
}
`;
const ForgotDiv = styled.div`
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4fd1c5;
  line-height: 16px;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  .needP,
  .needP:visited {
    color: #72767d;
  }
`;
const LoginButton = styled.button`
  color: black;
  background-color: #4fd1c5;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  width: 100%;
  height: 44px;
  min-width: 130px;
  min-height: 44px;
  transition: background-color 0.17s ease, color 0.17s ease;
  display: flex;
  align-items: center;
  padding: 2px 16px;
  font-weight: 500;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    transition: 400ms;
    transform: scale(0.97);
    background-color: #319795;
  }
`;
const LoginDiv = styled.div`
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
  line-height: 24px;
  user-select: none;
  font-family: "Signika", sans-serif;
`;
//---end-styles/
const Register = props => {
  const handleChange = event => {
    props.updateState({ [event.target.name]: event.target.value });
  };

  const clickGoBack = () => {
    props.resetFields();
  };

  const handleRegister = event => {
    event.preventDefault();
    axios
      .post("/auth/register", {
        email: props.email,
        nickname: props.nickname,
        password: props.password
      })
      .then(() => {
        props.history.push("/");
      })
      .catch(() => {
        console.log("Not working");
      });
  };

  return (
    <>
      <Background></Background>
      <Logo src={Peep} alt="logo"></Logo>
      <CenterWrapper>
        <LoginBox>
          <Title>Create an account</Title>
          <Subtitle>Time to use peep!</Subtitle>
          <form style={formStyle} type="submit" onSubmit={handleRegister}>
            <InputBox>
              <div className="loginMargin">
                <LoginH5>Email</LoginH5>
              </div>
              <LoginInput
                onChange={handleChange}
                name="email"
                className="email-input"
              />
            </InputBox>
            <br />
            <InputBox>
              <div className="loginMargin">
                <LoginH5>Nickname</LoginH5>
              </div>
              <LoginInput
                onChange={handleChange}
                name="nickname"
                className="nickname-input"
              />
            </InputBox>
            <br />
            <InputBox>
              <div className="loginMargin">
                {" "}
                <LoginH5>Password</LoginH5>
              </div>
              <LoginInput
                onChange={handleChange}
                name="password"
                type="password"
                className="password-input"
              />
            </InputBox>
            <br />
            <LoginButton type="submit">
              <LoginDiv>Register</LoginDiv>
            </LoginButton>
            <Link to="/">
              <ForgotButton onClick={clickGoBack}>
                <ForgotDiv className="login">
                  <span className="needP">Already have an account?</span> Login
                </ForgotDiv>
              </ForgotButton>
            </Link>
          </form>
        </LoginBox>
      </CenterWrapper>
    </>
  );
};

const mapStateToProps = state => {
  return {
    email: state.authReducer.email,
    nickname: state.authReducer.nickname,
    password: state.authReducer.password
  };
};

export default connect(
  mapStateToProps,
  { updateState, resetFields }
)(Register);

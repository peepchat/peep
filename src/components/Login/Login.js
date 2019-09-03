import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateState, loginUser } from "../../redux/AuthReducer/AuthReducer";
import { Link } from "react-router-dom";

//---start-styles--

const CenterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: url("https://discordapp.com/assets/fd91131ea693096d6be5e8aa99d18f9e.jpg")
    no-repeat fixed center;
`;
const LoginBox = styled.div`
  width: 20rem;
  padding: 40px;
  font-size: 18px;
  color: #72767d;
  background: #36393f;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-sizing: border-box;
`;
const Title = styled.div`
  font-size: 26px;
  line-height: 32px;
  margin-bottom: 8px;
  font-weight: 300;
  color: #fff;
`;
const Subtitle = styled.div`
  color: #72767d;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  outline: 0;
`;
const formStyle = {
  textAlign: "left",
  marginTop: "20px"
};
const InputBox = styled.div``;

const LoginH5 = styled.h5`
  color: #b9bbbe;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex: 1;
  margin-bottom: rem;
  font-weight: 200;
`;
const LoginInput = styled.input`
  color: #f6f6f7;
  background-color: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
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
}
`;
const ForgotDiv = styled.div`
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #7289da;
  line-height: 16px;
`;
const LoginButton = styled.button`
  color: #fff;
  background-color: #7289da;
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
  border: none;
  border-radius: 3px;
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
  color: #fff;
  line-height: 24px;
  user-select: none;
`;
const WrongInfo = styled.p`
  margin: 0 auto;
  color: red;
`;
//---end-styles/

const Login = props => {
  const [error, setError] = useState(false);

  const handleChange = event => {
    props.updateState({ [event.target.name]: event.target.value });
    console.log(props.email);
  };

  const handleLogin = event => {
    event.preventDefault();
    props
      .loginUser(props.email, props.password)
      .then(() => {
        props.history.push(`/peep/dm/profile/${props.email}`);
      })
      .catch(() => setError(true));
  };

  return (
    <CenterWrapper>
      <LoginBox>
        <Title>Welcome Back</Title>
        <Subtitle>Time to use peep!</Subtitle>
        <form style={formStyle} type="submit" onSubmit={handleLogin}>
          <InputBox>
            <LoginH5>Email</LoginH5>
            <LoginInput onChange={handleChange} name="email" />
          </InputBox>
          <InputBox>
            <LoginH5>Password</LoginH5>
            <LoginInput
              onChange={handleChange}
              name="password"
              type="password"
            />
          </InputBox>
          <ForgotButton>
            <ForgotDiv>Forgot your password?</ForgotDiv>
          </ForgotButton>
          <LoginButton type="submit" onClick={handleLogin}>
            <LoginDiv>Login</LoginDiv>
          </LoginButton>
          {error ? <WrongInfo>Wrong username & password</WrongInfo> : null}
          <ForgotButton>
            <Link to="/register">
              <ForgotDiv>Need an account? Register</ForgotDiv>
            </Link>
          </ForgotButton>
        </form>
      </LoginBox>
    </CenterWrapper>
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
  { updateState, loginUser }
)(Login);

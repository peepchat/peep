import React from "react";
import styled from "styled-components";

//---start-styles

const CenterWrapper = styled.div`
  width: 100%;
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
line-height: 22pxl
font-weight: 400;
outline:0;
`;
const formStyle = {
textAlign:"left",
marginTop: "20px"

}
const InputBox = styled.div`
  
`;

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
    background-color: rgba(0,0,0,.1);
    border-color: rgba(0,0,0,.3);
    padding: 10px;
    height: 40px;
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;

`
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
`
const ForgotDiv = styled.div`
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #7289da;
    line-height: 16px;
`
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
    transition: background-color .17s ease,color .17s ease;
    display:flex;
    align-items: center;
    padding: 2px 16px;
    font-weight: 500;
    box-sizing: border-box;
    border: none;
    border-radius: 3px;
`
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
`
//---end-styles/

const Login = props => {
  return (
    <CenterWrapper>
      <LoginBox>
        <Title>Welcome Back</Title>
        <Subtitle>Time to use peep!</Subtitle>
        <form style ={formStyle}>
          <InputBox>
            <LoginH5>Email</LoginH5>
            <LoginInput/>
          </InputBox>
          <InputBox>
            <LoginH5>Password</LoginH5>
            <LoginInput/>
          </InputBox>
         <ForgotButton><ForgotDiv>Forgot your password?</ForgotDiv></ForgotButton>
          <LoginButton><LoginDiv>Login</LoginDiv></LoginButton>
          <ForgotButton><ForgotDiv>Need an account? Register</ForgotDiv></ForgotButton>
        </form>
      </LoginBox>
    </CenterWrapper>
  );
};

export default Login;

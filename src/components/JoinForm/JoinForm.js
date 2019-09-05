import React, { useState, useEffect } from "react";
import styled from "styled-components";

const JoinForm = props => {
  return (
    <ModalWrapper>
      <HeadWrapper>
        <HeadFirstDiv>Join A Group</HeadFirstDiv>
        <HeadSecondDiv>
          Enter an instant invite below to join an existing group
        </HeadSecondDiv>
        <HeadThirdDiv>
          <input placeholder="Enter an instant invite..."></input>
        </HeadThirdDiv>
      </HeadWrapper>
      <FooterWrapper>
        <BackButton onClick={props.viewDefault}>Back</BackButton>
        <JoinButton>Join</JoinButton>
      </FooterWrapper>
    </ModalWrapper>
  );
};

export default JoinForm;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeadWrapper = styled.div`
  width: 75%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeadFirstDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  line-height: 1.618;
`;

const HeadSecondDiv = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  line-height: 1.618;
`;

const HeadThirdDiv = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  input {
    padding: 1rem;
    border: none;
    font-size: 1rem;
    background: none;
    color: gray;
    width: 80%;
    outline: none;
    border-bottom: #81e6d9 2px solid;
    padding-left: 0;
    width: 75%;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  font-size: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 50%;
  background: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  border: none;
  margin-left: 6rem;
  background-color: #81e6d9;
  outline: none;

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

const JoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 50%;
  background: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  border: none;
  margin-right: 6rem;
  background-color: #81e6d9;
  outline: none;

  &:hover {
    transition: 400ms;
    background-color: #4fd1c5;
    color: white;
    transform: scale(0.95);
  }
`;

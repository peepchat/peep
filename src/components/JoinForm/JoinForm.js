import React, { useState, useEffect } from "react";
import styled from "styled-components";

const JoinForm = props => {
  return <ModalWrapper>Testing2</ModalWrapper>;
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormWrapper = styled.input`
  width: 75%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
`;

export default JoinForm;

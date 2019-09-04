import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CreateForm = props => {
  return (
    <ModalWrapper>
      <BackButton onClick={props.viewDefault}>Back</BackButton>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BackButton = styled.button`
  width: 5%;
  height: 5%;
`;

const FormWrapper = styled.input`
  width: 75%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
`;

export default CreateForm;

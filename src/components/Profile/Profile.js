import React, { useState } from "react";
import styled from "styled-components";
import { uploadPic } from "../../redux/UserReducer/userReducer";
import { connect } from "react-redux";

const WidgetButton = styled.button`
  width: 50%;
  height: 50%;
`;

const Profile = props => {
  const checkUploadResult = async (error, resultEvent) => {
    if (resultEvent.event === "success") {
      await setImageurl(resultEvent.info.secure_url);
      await props.uploadPic(imageurl);
    }
  };

  const [imageurl, setImageurl] = useState("");

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dtkvcgoz6",
      uploadPreset: "pvstqpgq",
      sources: ["local", "url", "dropbox", "facebook", "instagram"]
    },
    (error, result) => {
      checkUploadResult(error, result);
    }
  );

  return (
    <div>
      <div>
        Profile <WidgetButton onClick={() => widget.open()}></WidgetButton>
      </div>
    </div>
  );
};

export default connect(
  null,
  { uploadPic }
)(Profile);

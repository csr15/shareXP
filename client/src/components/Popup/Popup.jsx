import React from "react";

import Styled from "styled-components";

export default function Popup(props) {
  const Text = Styled.p`
    font-weight: 600;
  `;
  return (
    <div className="alert-popup">
      <Text className={`alert ${props.type}`} role="alert">
        {props.text}
      </Text>
    </div>
  );
}

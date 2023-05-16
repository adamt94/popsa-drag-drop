import React from "react";
import styled from "styled-components";

const StyledActions = styled.div`
  display: flex;
`;

const Icon = styled.div`
  background: #ededed;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonLayout = styled(Icon)``;

const ButtonMenu = styled(Icon)``;

export default function ActionBar() {
  return (
    <>
      <StyledActions>
        <ButtonLayout>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path and other content */}
          </svg>
        </ButtonLayout>
        <ButtonMenu>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path and other content */}
          </svg>
        </ButtonMenu>
      </StyledActions>
    </>
  );
}

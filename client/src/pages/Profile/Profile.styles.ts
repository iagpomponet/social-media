import styled from "styled-components";

export const editPicSvgWrapper = styled.div`
  backdrop-filter: blur(4px);
  background-color: rgba(15, 20, 25, 0.75);

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const uploadInput = styled.input.attrs({ type: "file" })`
  opacity: 0;
  z-index: 2;
  cursor: pointer;

  height: 30px;
  width: 30px;
  position: absolute;
  display: block;
`;

export const EditPicAvatarContainer = styled.div`
  position: relative;
  display: inline-block;

  div {
    height: 30px;
    width: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  }

  svg {
    z-index: 1;
  }
`;

import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

export const PrintWrapper = styled.div``;

export const Placeholder = styled.div`
  width: 100%;
  height: 152px;
  background: #2778a5;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

export const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;

  img {
    max-width: 100%;
    height: 100%;
    transition: opacity 0.5s ease-in-out;
    &.drag-over {
      opacity: 0.5;
    }
    &.drag-start {
      opacity: 0.5;
    }
  }
`;
export const PrintPhoto = styled(motion.div)`
  position: relative;
  width: calc(50% - 10px);
  height: 152px;
  div {
    &.drag-over {
      opacity: 0.5;
    }
    &.drag-start {
      opacity: 0.5;
    }
  }
`;
export const Photo = styled.div`
  img {
    max-width: 100%;
    height: 100%;
    &.drag-over {
      opacity: 0.5;
    }
    &.drag-start {
      opacity: 0.5;
    }
  }
`;

export const OnDropAnimation = styled(motion.div)<{ src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const FadeOutImage = styled(motion.div)<{ src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
import React, { useState } from "react";
import styled from "styled-components";
import { swapImagePositions } from "../../utils/swapImagePositions";
import Draggable from "../Draggable/Draggable";
import { AnimatePresence, motion } from "framer-motion";
import ActionBar from "../ActionBar/ActionBar";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled.div`
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
const PrintPhoto = styled(motion.div)`
  position: relative;
  width: calc(50% - 10px);
  div {
    &.drag-over {
      opacity: 0.5;
    }
    &.drag-start {
      opacity: 0.5;
    }
  }
`;
const Photo = styled.div`
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

const Circle = styled(motion.div)<{ src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FadeOutImage = styled(motion.div)<{ src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export type PrintablePageData = {
  title: string;
  images: string[];
};
type PrintablePageProps = {
  data: PrintablePageData[];
};

const circleVariants = {
  open: (height = 10) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    transition: {
      type: "spring",

      stiffness: 20,
      restDelta: 30,
    },
  }),
  closed: {
    clipPath: "circle(30px at 50% 50%)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const fadeOutVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
};

export default function PrintablePage({ data }: PrintablePageProps) {
  const [photoBookData, setPhotoBookData] = useState(data);
  const [showDropAnimation, setShowDropAnimation] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [dest, setDest] = useState<string | null>(null);

  const swapImages = (img1: string, img2: string) => {
    const updatedPosition = swapImagePositions(photoBookData, img1, img2);
    setPhotoBookData([...updatedPosition]);
  };

  return (
    <Wrapper>
      {Object.values(photoBookData).map(
        (entry: PrintablePageData, i: number) => {
          return (
            <PrintWrapper key={i}>
              <Header>
                <Title>{entry.title}</Title>
                <ActionBar />
              </Header>
              <PageLayout>
                {entry.images.map((image, j) => {
                  return (
                    <PrintPhoto key={j}>
                      <Draggable
                        draggableItemPreview={image}
                        onDragStart={(element) => {
                          setSrc(element.querySelector("img")?.src || "");
                        }}
                        onDragEnd={(element) => {
                          setDest(element.querySelector("img")?.src || "");
                          setShowDropAnimation(true);
                        }}
                      >
                        <>
                          <AnimatePresence>
                            {showDropAnimation && dest == image && (
                              <Circle
                                src={src || ""}
                                initial="closed"
                                animate="open"
                                variants={circleVariants}
                                onAnimationComplete={() => {
                                  setShowDropAnimation(false);
                                  swapImages(src || "", dest || "");
                                }}
                              />
                            )}
                          </AnimatePresence>
                          <Photo>
                            <AnimatePresence>
                              {showDropAnimation && src == image && (
                                <FadeOutImage
                                  src={dest || ""}
                                  variants={fadeOutVariant}
                                  initial="initial"
                                  animate="animate"
                                />
                              )}
                            </AnimatePresence>
                            <img src={image} alt={`photo image ${i + j}`} />
                          </Photo>
                        </>
                      </Draggable>
                    </PrintPhoto>
                  );
                })}
              </PageLayout>
            </PrintWrapper>
          );
        }
      )}
    </Wrapper>
  );
}

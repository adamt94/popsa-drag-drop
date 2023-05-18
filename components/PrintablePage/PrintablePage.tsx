import React, { useState } from "react";
import { swapImagePositions } from "../../utils/swapImagePositions";
import Draggable from "../Draggable/Draggable";
import { AnimatePresence, motion } from "framer-motion";
import ActionBar from "../ActionBar/ActionBar";
import {
  Wrapper,
  PrintWrapper,
  Header,
  Title,
  PageLayout,
  PrintPhoto,
  OnDropAnimation,
  Photo,
  FadeOutImage,
  Placeholder,
  BorderAnimation,
} from "./styles";

export type PrintablePageData = {
  title: string;
  images: string[];
};
type PrintablePageProps = {
  data: PrintablePageData[];
};

const onDropAnimatinVariants = {
  open: (height = 10) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 30,
      duration: 0.8,
    },
  }),
  openWithDelay: (height = 10) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 30,
      delay: 0.01,
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
                          setSrc(
                            element.querySelector("img")?.src || "placeholder"
                          );
                        }}
                        onDragEnd={(element) => {
                          setDest(
                            element.querySelector("img")?.src || "placeholder"
                          );
                          setShowDropAnimation(true);
                        }}
                      >
                        <>
                          <AnimatePresence>
                            {showDropAnimation && dest == image && (
                              <React.Fragment>
                                <BorderAnimation
                                  initial="closed"
                                  animate="open"
                                  variants={onDropAnimatinVariants}
                                />
                                <OnDropAnimation
                                  src={src || ""}
                                  initial="closed"
                                  animate="openWithDelay"
                                  variants={onDropAnimatinVariants}
                                  onAnimationComplete={() => {
                                    setShowDropAnimation(false);
                                    swapImages(src || "", dest || "");
                                  }}
                                >
                                  <motion.div
                                    className="inner"
                                    variants={onDropAnimatinVariants}
                                    animate="openWithDelay"
                                  />
                                </OnDropAnimation>
                              </React.Fragment>
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
                                >
                                  <img src={dest || ""} />
                                </FadeOutImage>
                              )}
                            </AnimatePresence>

                            {image === "placeholder" ? (
                              <Placeholder />
                            ) : (
                              <img src={image} alt={`photo image ${i + j}`} />
                            )}
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

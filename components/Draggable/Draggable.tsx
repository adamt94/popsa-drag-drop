import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggablePreview } from "../DraggablePreview/DraggablePreview";

const circleVariants = {
  open: (height = 10) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 50%)`,
    transition: {
      type: "spring",

      stiffness: 20,
      restDelta: 40,
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

const PrintPhoto = styled(motion.div)`
  position: relative;
  width: calc(50% - 10px);

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

type DraggableProps = {
  images: string[];
  onDrop: (index: number, pageIndex: number) => void;
  onDragStart: (index: number, pageIndex: number) => void;
  pageIndex: number;
};

export const Draggable = ({
  images,
  onDrop,
  onDragStart,
  pageIndex,
}: DraggableProps) => {
  const [showDropAnimation, setShowDropAnimation] = useState(false);

  const handleDragStart = (
    event: React.DragEvent<HTMLImageElement>,
    index: number
  ) => {
    const previewImage = useDraggablePreview({
      src: images[index],
      width: 100,
      height: 100,
      borderColor: "white",
    });
    // Using the html d&d api limited to a Image element rather then react component
    event.dataTransfer.setDragImage(previewImage, 50, 50);

    event.currentTarget.classList.add("drag-start");
    onDragStart(index, pageIndex);
  };

  const handleDragOver = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    console.log("ENTER");
    console.log(event.currentTarget);
    event.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLImageElement>,
    index: number
  ) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");
    document.getElementById("drag-preview")?.remove();
    setShowDropAnimation(true);
    onDrop(index, pageIndex);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-start");
  };

  return (
    <>
      {images.map((image, index) => (
        <PrintPhoto key={image} initial={false}>
          <AnimatePresence>
            {showDropAnimation && (
              <Circle
                src={image}
                initial="closed"
                animate="open"
                variants={circleVariants}
                onAnimationComplete={() => {
                  setShowDropAnimation(false);
                }}
              />
            )}
          </AnimatePresence>
          <motion.img
            src={image}
            alt={`Page ${pageIndex} Image ${index} `}
            draggable
            onDragStart={(event) => handleDragStart(event as any, index)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd as any}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, index)}
            transition={{ duration: 0.5 }}
          />
        </PrintPhoto>
      ))}
    </>
  );
};

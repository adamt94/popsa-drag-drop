import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggablePreview } from "../DraggablePreview/DraggablePreview";

const sidebar = {
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
      opacity: 0.5; /* Modify the opacity for the drag-over item */
    }
    &.drag-start {
      opacity: 0.5; /* Modify the opacity for the drag-over item */
    }
  }
`;

const Circle = styled(motion.div)`
  background: url(${(props) => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Draggable = ({ images, onDrop, onDragStart, pageId }) => {
  const [showDropAnimation, setShowDropAnimation] = useState(false);

  const handleDragStart = (event, index) => {
    const previewImage = useDraggablePreview({
      src: images[index],
      width: 100,
      height: 100,
    });
    // this can be refactored to use react node, this is limited to Image
    event.dataTransfer.setDragImage(previewImage, 50, 50);

    event.target.classList.add("drag-start");
    onDragStart(index, pageId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    console.log("ENTER");
    console.log(event.target);
    event.target.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");
  };

  const handleDrop = async (event, index) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");
    setShowDropAnimation(true);
    onDrop(index, pageId);
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-start");
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
                variants={sidebar}
                onAnimationComplete={() => {
                  setShowDropAnimation(false);
                }}
              />
            )}
          </AnimatePresence>
          <motion.img
            src={image}
            alt={`Page ${pageId} Image ${index} `}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, index)}
            onAnimationComplete={() => {
              setIsExpanded(false);
            }}
            transition={{ duration: 0.5 }}
          />
        </PrintPhoto>
      ))}
    </>
  );
};

import styled from "styled-components";
import Actions from "./actions";
import { useState } from "react";
import { motion, useCycle, AnimatePresence } from 'framer-motion';

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
`;

const PrintPhoto = styled(motion.div)`
position: relative;
  width: calc(50% - 10px);

  img {
    max-width: 100%;
  }
`;

const Circle = styled(motion.div)`
  background: url(${props => props.src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Cover = styled.div`

  width: 100%;
  height: 100%;
  position: absolute;
  background-color: red;
  `;

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};


export const Dragable = ({initialImages}) => {
  const [images, setImages] = useState(initialImages);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
    event.dataTransfer.dropEffect = 'move';
    const dragImage = new Image();
    dragImage.src = images[index];

  // Set the drag image and offset
  dragImage.style.width = '100px';
  dragImage.style.height = '100px';
  dragImage.style.borderRadius = '50%';
  dragImage.style.maxWidth = '100%';
  dragImage.style.maxHeight = '100%';
  dragImage.style.position = 'absolute';
  dragImage.style.top = '-9999px';
  dragImage.style.left = '-9999px';
  dragImage.style.border = '3px solid white';
  dragImage.style.objectFit = 'cover';
  document.body.appendChild(dragImage);
    // Set the drag image and offset
    event.dataTransfer.setDragImage(dragImage, 50, 100);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.target.classList.add('drag-over');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove('drag-over');
  };

  const handleDrop = async (event, index) => {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData('text/plain');
    const newImages = [...images];
    newImages.splice(index, 0, newImages.splice(sourceIndex, 1)[0]);
    setImages(newImages);
    event.target.classList.remove('drag-over');
    setIsExpanded(true);
  };
  
  return (
    <>
   
      {images.map((image, index) => (
        <PrintPhoto key={image} initial={false}  animate={isOpen ? "open" : "closed"}>
          <AnimatePresence> {isExpanded  && <Cover>  <Circle
  src={image}
  className="circle"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5 }}
  onAnimationComplete={()=>{setIsExpanded(false)}}
  
/></Cover>}
</AnimatePresence >
          <motion.img
            src={image}
            alt={`Image ${index}`}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(event, info) => handleDrop(event, index, info)}
            onAnimationComplete={()=>{setIsExpanded(false)}} 
            transition={{ duration: 0.5 }}
          />
        </PrintPhoto>
      ))}
    </>
  );
}


export default function PrintPage({ data }) {
  return (
    <>
      <Wrapper>
        {Object.values(data).map((entry, i) => {
          return (
            <PrintWrapper key={i}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions />
              </Header>
              <PageLayout>
                <Dragable initialImages={entry.images} />
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </>
  );
}

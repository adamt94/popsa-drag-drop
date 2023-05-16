import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  z-index: 999;
  position: absolute;
`;

const DraggedComponent = ({isVisible}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return  isVisible && <Circle style={{ left: position.x - 10, top: position.y - 20 }} />;
};

export default DraggedComponent;

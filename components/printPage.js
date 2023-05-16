import styled from "styled-components";
import Actions from "./actions";
import { Draggable } from "./Draggable/Draggable";
import { useState } from "react";
import { swapImagePositions } from "../utils/swapImagePositions";

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

export default function PrintPage({ data }) {
  const [photoBookData, setPhotoBookData] = useState(data);
  const [draggedSrcIndex, setDraggedSrcIndex] = useState(null);

  const swapImages = (index, pageId) => {
    const newPhotoBookData = swapImagePositions(
      photoBookData,
      [pageId, index],
      draggedSrcIndex
    );
    setPhotoBookData(newPhotoBookData);
  };

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
                <Draggable
                  images={entry.images}
                  onDragStart={(index, pageId) => {
                    setDraggedSrcIndex([pageId, index]);
                  }}
                  onDrop={swapImages}
                  pageId={i}
                />
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </>
  );
}

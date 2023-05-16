import React, { useState } from "react";
import styled from "styled-components";
import ActionBar from "../ActionBar/Actionbar";
import { Draggable } from "../Draggable/Draggable";
import { swapImagePositions } from "../../utils/swapImagePositions";

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

export type PrintablePageData = {
  title: string;
  images: string[];
};
type PrintablePageProps = {
  data: PrintablePageData[];
};

export default function PrintablePage({ data }: PrintablePageProps) {
  const [photoBookData, setPhotoBookData] = useState(data);
  const [draggedSrcIndex, setDraggedSrcIndex] = useState<
    [number, number] | null
  >(null);

  const swapImages = (index: number, pageId: number) => {
    if (draggedSrcIndex) {
      const newPhotoBookData = swapImagePositions(
        photoBookData,
        [pageId, index],
        draggedSrcIndex
      );

      setPhotoBookData(newPhotoBookData);
    }
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
                <Draggable
                  images={entry.images}
                  onDragStart={(index: number, pageIndex: number) => {
                    setDraggedSrcIndex([pageIndex, index]);
                  }}
                  onDrop={swapImages}
                  pageIndex={i}
                />
              </PageLayout>
            </PrintWrapper>
          );
        }
      )}
    </Wrapper>
  );
}

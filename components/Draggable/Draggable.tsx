import React, { DragEventHandler, ReactNode } from "react";
import { DraggablePreview } from "../DraggablePreview/DraggablePreview";

interface DraggableItemProps {
  draggableItemPreview?: string;
  onDragStart: (element: HTMLDivElement) => void;
  onDragEnd: (element: HTMLDivElement) => void;
  children: ReactNode;
}

const addDragClass = (element: HTMLDivElement) => {
  element.classList.add("drag-over");
};

const removeDragClasses = (element: HTMLDivElement) => {
  element.classList.remove("drag-over");
  element.classList.remove("drag-start");
};

export default function DragWrapper({
  draggableItemPreview,
  onDragStart,
  children,
  onDragEnd,
}: DraggableItemProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    const dragImage = DraggablePreview({
      src: draggableItemPreview || "",
      width: 100,
      height: 100,
      borderColor: "white",
    });
    event.dataTransfer.setDragImage(dragImage!, 50, 50);
    event.currentTarget.classList.add("drag-start");
    onDragStart(event.currentTarget);
  };

  const handleDragOver = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    onDragEnd(event.currentTarget);
    removeDragClasses(event.currentTarget);
  };

  const handleDragEndAndRemovePreview = (
    event: React.DragEvent<HTMLImageElement>
  ) => {
    event.preventDefault();
    removeDragClasses(event.currentTarget);
    document.getElementById("drag-preview")?.remove();
  };

  const getDragEventHandlers = () => ({
    onDragEnd: handleDragEndAndRemovePreview,
    onDragStart: handleDragStart,
    onDragLeave: handleDragLeave,
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  });

  return (
    <div className="drag-wrapper">
      {React.Children.map(children, (child, index) => (
        <div key={index} draggable {...getDragEventHandlers()}>
          {child}
        </div>
      ))}
    </div>
  );
}

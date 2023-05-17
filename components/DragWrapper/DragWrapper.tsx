import React, { DragEventHandler, ReactNode } from "react";
import { useDraggablePreview } from "../DraggablePreview/DraggablePreview";

interface DragWrapperProps {
  imagePreview?: string;
  onDragStart: (element: HTMLDivElement) => void;
  onDragEnd: (element: HTMLDivElement) => void;
  children: ReactNode;
}

export default function DragWrapper({
  imagePreview,
  onDragStart,
  children,
  onDragEnd,
}: DragWrapperProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    const dragImage = useDraggablePreview({
      src: imagePreview,
      width: 100,
      height: 100,
      borderColor: "white",
    });
    // Using the html d&d api limited to a Image element rather then react component
    event.dataTransfer.setDragImage(dragImage!, 50, 50);
    event.currentTarget.classList.add("drag-start");
    console.log(event.currentTarget);
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
    event.currentTarget.classList.remove("drag-over");
    event.currentTarget.classList.remove("drag-start");
  };

  const handleDragEnd = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");
    event.currentTarget.classList.remove("drag-start");
  };

  {
    return (
      <div className="drag-wrapper">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            draggable
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
}

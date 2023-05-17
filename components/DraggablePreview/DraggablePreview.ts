export const DraggablePreview = ({
    src,
    width,
    height,
    borderColor,
  }: {
    src: string;
    width: number;
    height: number;
    borderColor: string;
  }): HTMLImageElement => {
    const previewImage = document.createElement("img");
    previewImage.src = src;
    previewImage.style.width = `${width}px`;
    previewImage.style.height = `${height}px`;
    previewImage.style.borderRadius = "50%";
    previewImage.style.maxWidth = "100%";
    previewImage.style.maxHeight = "100%";
    previewImage.style.position = "absolute";
    previewImage.style.border = `3px solid ${borderColor}`;
    previewImage.style.objectFit = "cover";
    previewImage.style.pointerEvents = "none";
    // prevent appended element from showing up in the DOM (it's only used for dragging)
    previewImage.style.top = "-1000px";
    previewImage.style.left = "-1000px";
    previewImage.id = "drag-preview";
    document.body.appendChild(previewImage);
  
    return previewImage;
  };
  
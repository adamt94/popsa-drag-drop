export const useDraggablePreview = ({ src, width, height, borderColor }) => {
  const previewImage = new Image();
  previewImage.src = src;
  previewImage.style.width = `${width}px`;
  previewImage.style.height = `${height}px`;
  previewImage.style.borderRadius = "50%";
  previewImage.style.maxWidth = "100%";
  previewImage.style.maxHeight = "100%";
  previewImage.style.position = "absolute";
  previewImage.style.border = "3px solid white";
  previewImage.style.objectFit = "cover";
  document.body.appendChild(previewImage);

  return previewImage;
};

// import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryWrapper } from "./ImageGallery.styled";

export const ImageGallery = ({ images }) => (
  <ImageGalleryWrapper className="gallery">
    {images.map(image => (
      <ImageGalleryItem image={image} />
    ))}
  </ImageGalleryWrapper>
);

// ImageGallery.propTypes = {};

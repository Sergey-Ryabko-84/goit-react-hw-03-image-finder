// import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => (
  <Item key={image.id} className="gallery-item">
    <Image src={image.webformatURL} alt={image.tags} />
  </Item>
);

// ImageGalleryItem.propTypes = {};

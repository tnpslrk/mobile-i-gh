import { useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from '@/layout/Gallery/Images.ts';

const PhotoGallery = () => {
  const [imageSizes, setImageSizes] = useState<{ [key: string]: { width: number, height: number } }>({});

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setImageSizes((prevSizes) => ({
      ...prevSizes,
      [src]: { width, height },
    }));
  };

  return (
    <Gallery>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // Ensures the grid is uniformly spaced
          gridGap: 2,
        }}>
        {images.map((image, index) => {
          const sizes = imageSizes[image.source];
          const isPortrait = sizes && sizes.height > sizes.width;

          const smallItemStyles: React.CSSProperties = {
            cursor: 'pointer',
            objectFit: isPortrait ? 'cover' : 'contain', // Crop only if portrait
            width: '100px', // Fixed width for all thumbnails
            height: '68px', // Fixed height for all thumbnails
          };

          const width = isPortrait ? '853' : '1280';
          const height = isPortrait ? '1280' : '853';

          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width={width}
              height={height}>
              {({ ref, open }) => (
                <img
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.source}
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                  onLoad={(e) => handleImageLoad(e, image.source)}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Responsive_image = ({image_screen, image_mobile, image_alt}) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);  // Initialwert auf null setzen

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setImageSrc(image_mobile);
    } else {
      setImageSrc(image_screen);
    }
  }, [windowWidth, image_mobile, image_screen]);  // Add image_mobile and image_screen to dependency array

  return (
    <div className="image-box">
      {/* Bedingung für das Rendern des Image Elements */}
      {imageSrc ? (
        <Image src={imageSrc} alt={image_alt} title="header image" width={1920} height={1080} />
      ) : (
        <div>Loading...</div>
      )}
      <div className='overlaybox'></div>
    </div>
  );
};

Responsive_image.displayName = 'Responsive Image';

export default Responsive_image;
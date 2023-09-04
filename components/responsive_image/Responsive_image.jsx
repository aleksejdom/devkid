import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css' 

const Responsive_image = ({image_screen, image_mobile}) => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    // Aktualisieren Sie die Breite, wenn das Fenster skaliert wird
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setImageSrc(`${image_mobile}`);
    } else {
      setImageSrc(`${image_screen}`);
    }
  }, [windowWidth]);

  return (
    <div className="image-box">
      <Image src={imageSrc} alt="header" title="header image" width={1920} height={1080} />
      <div className='overlaybox'></div>
    </div>
  );
};

Responsive_image.displayName = 'Responsive Image';

export default Responsive_image;
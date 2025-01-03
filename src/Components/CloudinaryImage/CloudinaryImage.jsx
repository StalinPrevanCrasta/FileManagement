import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryImage = ({ imageId, width = 500, height = 500 }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dm3itgnqr' // Ensure this is your Cloudinary cloud name
    }
  });

  const image = cld.image(imageId).resize(auto().gravity(autoGravity())).width(width).height(height);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '20px',
      margin: '20px'
    }}>
      <AdvancedImage cldImg={image} alt="Cloudinary Image" />
    </div>
  );
};

export default CloudinaryImage;
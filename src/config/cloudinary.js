import { Cloudinary } from '@cloudinary/url-gen';

const cloudinaryConfig = {
  cloudName: 'dfrhhnpxv',
  uploadPreset: 'ml_default',
  folder: 'file-manager'
};

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName
  }
});

export default cloudinaryConfig; 
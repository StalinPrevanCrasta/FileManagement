import { Cloudinary } from '@cloudinary/url-gen';

const cloudinaryConfig = {
  cloudName: 'dm3itgnqr',
  uploadPreset: 'ml_default', // Ensure this preset is whitelisted for unsigned uploads
  folder: 'file-manager'
};

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudinaryConfig.cloudName
  }
});

export default cloudinaryConfig;
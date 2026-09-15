import { Jimp } from 'npm:jimp@1.6.0';

// Featured blog images are cropped to this exact size (px).
export const BLOG_IMAGE_WIDTH = 1200;
export const BLOG_IMAGE_HEIGHT = 628;

// Cover-crop a generated image to the blog featured-image dimensions and upload it.
export async function resizeAndUploadBlogImage(base44, imageUrl, filenameBase) {
  const image = await Jimp.read(imageUrl);
  image.cover({ w: BLOG_IMAGE_WIDTH, h: BLOG_IMAGE_HEIGHT });
  const buffer = await image.getBuffer('image/jpeg');
  const file = new File([buffer], `${filenameBase}.jpg`, { type: 'image/jpeg' });
  const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });
  return result.file_url;
}
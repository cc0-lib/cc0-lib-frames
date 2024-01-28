export const getImage = async () => {
  const data = await fetch("https://cc0-lib.wtf/api/random");

  if (!data.ok) {
    throw null;
  }

  const { image } = await data.json();

  if (!image) {
    return null;
  }

  const timestamp = Date.now();

  // return image url with timestamp to avoid caching
  const imageUrl = `${image.url}?${timestamp}`;

  return imageUrl;
};

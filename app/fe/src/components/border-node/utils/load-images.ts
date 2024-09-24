export interface Texture {
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function loadImages(imageCount: number) {
  const images: HTMLImageElement[] = [];

  for (let i = 0; i < imageCount; i++) {
    const image = await loadImage(`/assets/particles/magic-fog/${i}.png`);

    images.push(image);
  }

  return images;
}

export default function createImg(name: string) {
  return { src: `/assets/${name}.jpg`, alt: name };
}

import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { Avoid } from "~/components/border-node";
import { Point, generatePoints } from "~/components/border-node/utils/generate-points.ts";

interface Chunk {
  x: number;
  y: number;
  chunkSize: number;
  textures: Texture[];
  minDistance: number;
  avoid: Avoid;
}

interface ExtendedSprite extends Sprite {
  originalWidth: number;
  originalHeight: number;
  initialScale: number;
}

interface FixPosition {
  avoid: Avoid;
  point: Point;
  chunkSize: number;
  sprite: ExtendedSprite;
}

const OFFSET = 0.6;
const OPACITY_LIMIT = 0.8;

function fixPosition({ cx, cy, avoid, point, chunkSize, sprite }: FixPosition) {
  let { x: spriteX, y: spriteY } = point;
  const { originalWidth, originalHeight } = sprite;
  const maxX = chunkSize - originalWidth * OFFSET;
  const maxY = chunkSize - originalHeight * OFFSET;

  switch (avoid) {
    case "top":
      spriteY = Math.max(spriteY, originalHeight);
      break;
    case "bottom":
      spriteY = Math.min(spriteY, maxY);
      break;
    case "left":
      spriteX = Math.max(spriteX, originalWidth);
      break;
    case "right":
      spriteX = Math.min(spriteX, maxX);
      break;
  }

  return { spriteX, spriteY };
}

export function createChunk({ x, y, chunkSize, textures, minDistance, avoid }: Chunk) {
  const cloudContainer = new Container();
  let count = 0;
  const tickers: (() => void)[] = [];
  const points = generatePoints({ startX: x, startY: y, chunkSize, minDistance });
  const ticker = Ticker.shared;

  // Для каждой точки создаём спрайт
  points.forEach(point => {
    const textureIndex = Math.floor(Math.random() * textures.length);
    const texture = textures[textureIndex];
    const sprite = new Sprite(texture);
    const originalWidth = texture.width;
    const originalHeight = texture.height;

    const rotationSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? -1 : 1);
    let growSpeed = (Math.random() * 100) / (originalWidth * originalHeight);

    growSpeed = Math.min(0.005, growSpeed);
    sprite["originalWidth"] = originalWidth;
    sprite["originalHeight"] = originalHeight;
    sprite["initialScale"] = Math.random() * 0.3 + 0.3;
    sprite.scale.set(sprite["initialScale"]);

    let { spriteX, spriteY } = fixPosition({ point, avoid, chunkSize, sprite: sprite as ExtendedSprite });

    sprite.x = spriteX;
    sprite.y = spriteY;
    sprite.anchor.set(0.5);
    sprite.alpha = 1;

    // Функция анимации
    const animate = () => {
      sprite.rotation += rotationSpeed;

      // Увеличиваем масштаб до 1
      if (sprite.scale.x < 1) {
        sprite.scale.x += growSpeed;
        sprite.scale.y += growSpeed;

        if (sprite.scale.x > OPACITY_LIMIT) {
          sprite.alpha -= (growSpeed * OPACITY_LIMIT) / (1 - OPACITY_LIMIT);
        }

        if (sprite.scale.x > 1) {
          sprite.scale.set(sprite["initialScale"]);
          sprite.alpha = 1;
        }
      }
    };

    // Добавляем функцию анимации в тикер
    ticker.add(animate);

    // Сохраняем функцию для последующего удаления
    tickers.push(animate);

    // Добавляем спрайт в контейнер
    cloudContainer.addChild(sprite);

    count++;
  });

  return { cloudContainer, count, tickers };
}

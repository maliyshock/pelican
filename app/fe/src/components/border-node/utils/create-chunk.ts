import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { Avoid } from "~/components/border-node";
import { generatePoints } from "~/components/border-node/utils/generate-points.ts";
import { fixPosition } from "~/components/border-node/utils/fix-position.ts";

interface Chunk {
  x: number;
  y: number;
  chunkSize: number;
  textures: Texture[];
  minDistance: number;
  avoid: Avoid;
}

export interface ExtendedSprite extends Sprite {
  originalWidth: number;
  originalHeight: number;
  initialScale: number;
}

const OPACITY_LIMIT = 0.8;

export function createChunk({ x, y, chunkSize, textures, minDistance, avoid }: Chunk) {
  const cloudContainer = new Container();
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

    ticker.add(animate);
    tickers.push(animate);
    cloudContainer.addChild(sprite);
  });

  return { cloudContainer, tickers };
}

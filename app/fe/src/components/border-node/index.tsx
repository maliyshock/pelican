import { useEffect, useRef } from "react";
import { Application, Assets, Ticker } from "pixi.js";
import { NodeProps } from "@xyflow/react";
import "./border-node.scss";
import { createChunk } from "~/components/border-node/utils/create-chunk";

export type Avoid = "right" | "bottom" | "left" | "top";
export type Orientation = "album" | "portrait";

const MIN_DISTANCE_SCALE = 0.2;

interface BorderNodeProps extends NodeProps {
  width: number;
  height: number;
  data: {
    avoid: Avoid;
  };
}

export function BorderNode({ width, height, data }: BorderNodeProps) {
  const { avoid } = data;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let app: Application;
    const tickerFunctions: (() => void)[] = [];

    const run = async () => {
      if (canvasRef.current !== null) {
        const images = new Array(12).fill(0).map((_, i) => `/assets/particles/magic-fog/${i}.png`);
        const textures = await Promise.all(images.map(url => Assets.load(url)));

        const options = {
          canvas: canvasRef.current!,
          width,
          height,
          backgroundAlpha: 0,
        };

        // Создаём приложение PixiJS
        app = new Application();
        await app.init(options);

        const orientation: Orientation = width > height ? "album" : "portrait";
        const chunkSize = Math.min(width, height);
        const chunkCounter = Math.ceil(Math.max(width, height) / chunkSize);
        const minDistance = chunkSize * MIN_DISTANCE_SCALE; // Настройте при необходимости

        // Создаём несколько чанков
        // TODO: не нужны тут чанки получается
        for (let i = 0; i < chunkCounter; i++) {
          const { cloudContainer, tickers } = createChunk({
            x: orientation === "album" ? i * chunkSize : 0,
            y: orientation === "portrait" ? i * chunkSize : 0,
            chunkSize,
            textures,
            minDistance,
            avoid,
          });

          app.stage.addChild(cloudContainer);

          // Собираем функции тикеров для последующего удаления
          tickerFunctions.push(...tickers);
        }
      }
    };

    run();

    // Очистка при размонтировании компонента
    return () => {
      if (app) {
        app.destroy(true, true);
      }

      // Удаляем функции из тикера
      tickerFunctions.forEach(fn => {
        Ticker.shared.remove(fn);
      });
    };
  }, [width, height, avoid]);

  return (
    <div className="border-node">
      <canvas ref={canvasRef} className="border-node__canvas" height={height} width={width} />
    </div>
  );
}

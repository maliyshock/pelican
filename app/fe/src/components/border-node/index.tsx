import { useEffect, useRef } from "react";
import { Application, Container } from "pixi.js";
import { NodeProps } from "@xyflow/react";
import "./border-node.scss";
import { loadImages } from "~/components/border-node/utils/load-images.ts";
const OVERLAP_FACTOR = 0.25;

export type Avoid = "right" | "bottom" | "left" | "top";

interface BorderNodeProps extends NodeProps {
  width: number;
  height: number;
  data: {
    avoid: Avoid;
  };
}

type Orientation = "album" | "portrait";

interface Chunk {
  orientation: Orientation;
  x: number;
  y: number;
  chunkSize: number;
  images: HTMLImageElement[];
}

function createChunk({ orientation, x, y, chunkSize, images }: Chunk) {
  const cloudContainer = new Container();

  return cloudContainer;
}

export function BorderNode({ width, height, data }: BorderNodeProps) {
  const { avoid } = data;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const run = async () => {
      if (canvasRef.current !== null) {
        const images = await loadImages(13);
        const app = new Application();
        const options = {
          canvas: canvasRef.current!,
          width,
          height,
          backgroundAlpha: 0,
        };

        // Initialize the application
        await app.init(options);

        const orientation: Orientation = width > height ? "album" : "portrait";
        const chunkSize = Math.min(width, height);
        const chunkCounter = Math.max(width, height) / chunkSize;

        // Создаем несколько облаков
        for (let i = 0; i < chunkCounter; i++) {
          const chunk = createChunk({
            orientation,
            x: orientation === "album" ? i * chunkSize : 0,
            y: orientation === "portrait" ? i * chunkSize : 0,
            chunkSize,
            images,
          });

          app.stage.addChild(chunk);
        }
      }
    };

    run();
  }, [width, height, avoid]);

  return (
    <div className="border-node">
      <canvas ref={canvasRef} className="border-node__canvas" height={height} width={width} />
    </div>
  );
}

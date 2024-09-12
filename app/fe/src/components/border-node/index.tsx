import { useEffect, useRef } from "react";
import { Application, Container, Graphics } from "pixi.js";
import { NodeProps } from "@xyflow/react";
import "./border-node.scss";
const BASE_SIZE = 40;
const OVERLAP_FACTOR = 0.75; // 75% размера для 25% наслоения
const MAX_ROTATION = Math.PI / 6;

export type Avoid = "right" | "bottom" | "left" | "top";

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
    // const run = async () => {
    //   if (canvasRef.current !== null) {
    //     const app = new Application();
    //     const options = {
    //       canvas: canvasRef.current!,
    //       width,
    //       height,
    //       backgroundAlpha: 0,
    //     };
    //
    //     // Initialize the application
    //     await app.init(options);
    //
    //     function createCloudPart(x: number, y: number, size: number) {
    //       const graphics = new Graphics();
    //
    //       graphics.rect(-size / 2, -size / 2, size, size);
    //       graphics.fill(0x87ceeb);
    //       graphics.position.set(x, y);
    //       graphics.rotation = (Math.random() - 0.5) * MAX_ROTATION;
    //
    //       return graphics;
    //     }
    //
    //     function createCloud(x: number, y: number) {
    //       const cloudContainer = new Container();
    //       const partsCount = Math.floor(Math.random() * 7) + 4;
    //
    //       const centralPart = createCloudPart(0, 0, BASE_SIZE);
    //
    //       cloudContainer.addChild(centralPart);
    //
    //       for (let i = 1; i < partsCount; i++) {
    //         const angle = Math.random() * Math.PI * 2;
    //         const partSize = BASE_SIZE * (0.7 + Math.random() * 0.6);
    //         const distance = ((BASE_SIZE + partSize) / 2) * OVERLAP_FACTOR;
    //         const partX = Math.cos(angle) * distance;
    //         const partY = Math.sin(angle) * distance;
    //         const part = createCloudPart(partX, partY, partSize);
    //
    //         cloudContainer.addChild(part);
    //       }
    //
    //       cloudContainer.x = x;
    //       cloudContainer.y = y;
    //
    //       return cloudContainer;
    //     }
    //
    //     // Создаем несколько облаков
    //     for (let i = 0; i < 5; i++) {
    //       const cloud = createCloud(Math.random() * app.screen.width, Math.random() * app.screen.height);
    //
    //       app.stage.addChild(cloud);
    //     }
    //   }
    // };
    //
    // run();
  }, [width, height, avoid]);

  return (
    <div className="border-node">
      <canvas ref={canvasRef} className="border-node__canvas" height={height} width={width} />
    </div>
  );
}

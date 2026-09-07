"use client";

import { useEffect, useRef, useState } from "react";

import cn from "-/modules/shared/utils/cn";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D imageTexture;
uniform vec2 imageResolution;
uniform vec2 resolution;
uniform float progress;
uniform float pixelSize;
varying vec2 vUv;

const float bayerMatrix8x8[64] = float[64](
  0.0, 48.0, 12.0, 60.0, 3.0, 51.0, 15.0, 63.0,
  32.0, 16.0, 44.0, 28.0, 35.0, 19.0, 47.0, 31.0,
  8.0, 56.0, 4.0, 52.0, 11.0, 59.0, 7.0, 55.0,
  40.0, 24.0, 36.0, 20.0, 43.0, 27.0, 39.0, 23.0,
  2.0, 50.0, 14.0, 62.0, 1.0, 49.0, 13.0, 61.0,
  34.0, 18.0, 46.0, 30.0, 33.0, 17.0, 45.0, 29.0,
  10.0, 58.0, 6.0, 54.0, 9.0, 57.0, 5.0, 53.0,
  42.0, 26.0, 38.0, 22.0, 41.0, 25.0, 37.0, 21.0
);

vec2 coverUv(vec2 uv) {
  float screenAspect = resolution.x / resolution.y;
  float imageAspect = imageResolution.x / imageResolution.y;

  if (screenAspect > imageAspect) {
    float scale = imageAspect / screenAspect;
    uv.y = (uv.y - 0.5) * scale + 0.5;
  } else {
    float scale = screenAspect / imageAspect;
    uv.x = (uv.x - 0.5) * scale + 0.5;
  }

  return uv;
}

void main() {
  vec2 uv = coverUv(vUv);
  vec4 color = texture2D(imageTexture, uv);
  vec2 pixel = floor(gl_FragCoord.xy / max(pixelSize, 1.0));
  int x = int(mod(pixel.x, 8.0));
  int y = int(mod(pixel.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] / 64.0;
  float reveal = step(threshold, progress);

  gl_FragColor = vec4(color.rgb, color.a * reveal);
  #include <colorspace_fragment>
}
`;

type DitherRevealSceneProps = {
  src: string;
  duration: number;
  pixelSize: number;
};

function DitherRevealScene({ src, duration, pixelSize }: DitherRevealSceneProps) {
  const texture = useLoader(THREE.TextureLoader, src);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const startTime = useRef<number | null>(null);
  const { viewport, size, gl } = useThree();
  const [uniforms] = useState(() => ({
    imageTexture: { value: texture },
    imageResolution: { value: new THREE.Vector2(1, 1) },
    resolution: { value: new THREE.Vector2(1, 1) },
    progress: { value: 0 },
    pixelSize: { value: pixelSize },
  }));

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame(({ clock }) => {
    const material = materialRef.current;
    if (!material) return;

    const dpr = gl.getPixelRatio();
    const width = Math.max(1, Math.floor(size.width * dpr));
    const height = Math.max(1, Math.floor(size.height * dpr));
    const image = texture.image as { width: number; height: number };

    material.uniforms.imageTexture.value = texture;
    material.uniforms.imageResolution.value.set(image.width, image.height);
    material.uniforms.resolution.value.set(width, height);
    material.uniforms.pixelSize.value = Math.max(1, pixelSize);

    startTime.current ??= clock.elapsedTime;
    material.uniforms.progress.value =
      duration <= 0 ? 1 : Math.min(1, (clock.elapsedTime - startTime.current) / duration);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export type DitherRevealProps = {
  src: string;
  alt: string;
  duration?: number;
  pixelSize?: number;
  className?: string;
};

export default function DitherReveal({
  src,
  alt,
  duration = 1_200,
  pixelSize = 3,
  className,
}: DitherRevealProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      role="img"
      aria-label={alt}
    >
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 6] }}
        dpr={1}
        gl={{ alpha: true, antialias: true }}
      >
        <DitherRevealScene key={src} src={src} duration={duration} pixelSize={pixelSize} />
      </Canvas>
    </div>
  );
}

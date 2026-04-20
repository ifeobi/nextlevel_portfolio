import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

/** Matches Tailwind `sm` (640px): smaller scene + touch-friendly controls below this width. */
const MOBILE_MAX_PX = 639;

const Computers = ({ isMobile }: { isMobile: boolean }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={3} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.22 : 0.62}
        position={isMobile ? [0, -3.2, -0.5] : [0, -2.85, -1.35]}
        rotation={[-0.01, 0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // One-finger drag orbit fights vertical scrolling on touch; narrow viewports use auto-rotate
  // + pinch-zoom so users can scroll the page but still interact with pinch.
  const touchFriendly = isMobile;

  return (
    <Canvas
      frameloop="always"
      shadows
      className={`!bg-transparent ${touchFriendly ? "touch-pan-y" : "touch-none"}`}
      style={{ background: "transparent" }}
      camera={{ position: [18, 3.4, 6], fov: 26 }}
      gl={{
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={!touchFriendly}
          enableZoom={touchFriendly}
          autoRotate={touchFriendly}
          autoRotateSpeed={0.35}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
          minDistance={12}
          maxDistance={28}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

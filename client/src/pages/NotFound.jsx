import React from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Text, Stars } from "@react-three/drei";

function Error404() {
return ( <Float speed={2} rotationIntensity={1} floatIntensity={2}> <Text
     fontSize={3}
     color="#60a5fa"
     anchorX="center"
     anchorY="middle"
   >
404 </Text> </Float>
);
}

export default function NotFound() {
return (
<div style={{ width: "100%", height: "100vh", position: "relative" }}>
<Canvas camera={{ position: [0, 0, 8] }}>
<color attach="background" args={["#050816"]} /> <ambientLight intensity={1.5} />
<directionalLight position={[5, 5, 5]} intensity={3} />

```
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
    />

    <Error404 />

    <OrbitControls
      enableZoom={false}
      autoRotate
      autoRotateSpeed={1.5}
    />
  </Canvas>

  <div
    style={{
      position: "absolute",
      bottom: "15%",
      width: "100%",
      textAlign: "center",
      color: "#fff",
    }}
  >
    <h2 style={{ fontSize: "2rem" }}>Page Not Found</h2>
    <p style={{ color: "#94a3b8" }}>
      The page you're looking for doesn't exist.
    </p>

    <Link
      to="/"
      style={{
        padding: "12px 28px",
        background: "#3b82f6",
        color: "#fff",
        borderRadius: "30px",
        textDecoration: "none",
        fontWeight: "bold"
      }}
    >
      Back Home
    </Link>
  </div>
</div>


);
}

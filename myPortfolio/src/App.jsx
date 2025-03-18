import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model() {
  const result = useLoader(GLTFLoader, '/computador.gltf');
  // Position the model at the center (0,0,0)
  return <primitive object={result.scene} position={[-1, -1, -8.7]} />;
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas 
        shadows
        camera={{ 
          position: [10, 5, 5], // Position camera in front of the model
          fov: 60
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        
        {/* Simple environment with just what's needed */}
        <gridHelper args={[10, 10]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          target={[0, 0, 0]} // Make camera look at center
        />
        
        {/* The main model positioned at center */}
        <Model />
      </Canvas>
    </div>
  );
}

export default App;
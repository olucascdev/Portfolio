import "./App.css";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function Model({ onClick }) {
  const result = useLoader(GLTFLoader, "/computador.gltf");

  return (
    <primitive 
      object={result.scene} 
      position={[-1, -3, -8.7]} 
      rotation={[0, 0, 0]}  
      onClick={onClick}  
      style={{ cursor: "pointer" }}
    />
  );
}

function CameraController({ focus }) {
  const { camera } = useThree();

  if (focus) {
    camera.fov = 9.5;  
    camera.position.set(20, -0.05, 0);  
  } else {
    camera.fov = 35;  
    camera.position.set(10, 5, 5);  
  }

  camera.updateProjectionMatrix();
  return null;
}

function Scene() {
  const [focus, setFocus] = useState(false);

  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [10, 5, 5], fov: 55 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <CameraController focus={focus} />
        <Model onClick={() => setFocus(!focus)} />

        <Html
          occlude="blending"
          wrapperClass="computador"
          position={[0.25, 0.26, -0.17]} 
          transform
          distanceFactor={1.5} 
          rotation={[0, Math.PI / 2, 0]}  
        >
          
           
           <iframe
             src="http://localhost:3000/"  
           />
        </Html>
      </Canvas>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scene />} />
        
      </Routes>
    </Router>
  );
}

export default App;
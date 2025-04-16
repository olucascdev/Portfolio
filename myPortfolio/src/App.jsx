import "./App.css";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as THREE from "three";

function Model({ onClick }) {
  const result = useLoader(GLTFLoader, "computador/computador.gltf");
  
  useEffect(() => {
    if (result.scene) {
      result.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = 0.3;
            child.material.metalness = 0.7;
          }
        }
      });
    }
  }, [result.scene]);

  return (
    <primitive
      object={result.scene}
      position={[-1, -3, -8.7]}
      rotation={[0, 0, 0]}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = "pointer"}
      onPointerOut={() => document.body.style.cursor = "auto"}
    />
  );
}

function CameraController({ focus }) {
  const { camera } = useThree();
  const targetFov = useRef(focus ? 8.5 : 35);
  const targetPosition = useRef(focus ? [20, 1.5, 0] : [10, 5, 5]);
  
  useEffect(() => {
    targetFov.current = focus ? 8.5 : 35;
    targetPosition.current = focus ? [20, 1.5, 0] : [10, 5, 5];
  }, [focus]);

  useFrame(() => {
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.1);
    camera.position.lerp(
      new THREE.Vector3(...targetPosition.current),
      0.1
    );
    camera.updateProjectionMatrix();
  });

  return null;
}

function Scene() {
  const [focus, setFocus] = useState(false);
  const directionalLight = useRef();
  
  useEffect(() => {
    if (directionalLight.current) {
      directionalLight.current.shadow.camera.near = 0.5;
      directionalLight.current.shadow.camera.far = 50;
      directionalLight.current.shadow.camera.left = -10;
      directionalLight.current.shadow.camera.right = 10;
      directionalLight.current.shadow.camera.top = 10;
      directionalLight.current.shadow.camera.bottom = -10;
      directionalLight.current.shadow.camera.updateProjectionMatrix();
    }
  }, []);

  return (
    <div id="canvas-container">
      <div className="developer-badge">
        <div className="developer-name">Lucas Correia.</div>
        <div className="developer-title">Software Developer</div>
      </div>
      
      <Canvas 
        camera={{ position: [10, 5, 5], fov: 55 }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
      >
        
        <ambientLight intensity={0.8} color="#ffffff" />
        
        <directionalLight
          ref={directionalLight}
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.5}
          color="#4466aa"
        />
        
        <directionalLight
          position={[0, 5, -10]}
          intensity={0.3}
          color="#802040"
        />
        
        <Environment preset="city" />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          dampingFactor={0.1}
        />
        
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
          <div className="crt-container">
            <iframe src="https://papayawhip-gerbil-706892.hostingersite.com/" className="crt-screen" />
          </div>
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
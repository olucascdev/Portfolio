import "./App.css";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";

function Model({ onClick }) {
  const result = useLoader(GLTFLoader, "/computador.gltf");

  return (
    <primitive 
      object={result.scene} 
      position={[-1, -3, -8.7]} 
      onClick={onClick} // Captura clique no modelo
      style={{ cursor: "pointer" }}
    />
  );
}

function CameraController({ focus }) {
  const { camera } = useThree();

  if (focus) {
    camera.fov = 9.5 ; // Aumenta o FOV para uma visão mais próxima
    camera.position.set(20, -0.05, 0); // Ajusta a posição da câmera para a tela
  } else {
    camera.fov = 35; // Volta ao FOV original
    camera.position.set(10, 5, 5); // Retorna à posição inicial
  }

  camera.updateProjectionMatrix(); // Atualiza a câmera após mudança
  return null;
}

function App() {
  const [focus, setFocus] = useState(false);

  return (
    <div id="canvas-container">
      <Canvas 
        camera={{ position: [10, 5, 5], fov: 55 }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <gridHelper args={[10, 10]} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        
        {/* Controlador da Câmera */}
        <CameraController focus={focus} />

        {/* Modelo que ativa o foco ao clicar */}
        <Model onClick={() => setFocus(!focus)} />
      </Canvas>
    </div>
  );
}

export default App;

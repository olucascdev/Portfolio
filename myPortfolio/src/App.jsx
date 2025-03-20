import "./App.css";
import { Canvas, useThree, useLoader, } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";
import { EffectComposer, Scanline, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";






function Model({ onClick }) {
  const result = useLoader(GLTFLoader, "/computador.gltf");

  return (
    <primitive 
      object={result.scene} 
      position={[-1, -3, -8.7]} 
      rotation={[0, 0, 0]}  // Ajuste a rotação se necessário

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

        {/*<gridHelper args={[10, 10]} />*/}
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        
        {/* Controlador da Câmera */}
        <CameraController focus={focus} />

        {/* Modelo que ativa o foco ao clicar */}
        <Model onClick={() => setFocus(!focus)} />
        <Html
          occlude="blending"
          wrapperClass="computador"
          position={[0.25, 0.26, -0.17]} // Ajuste fino para alinhar com a tela
          transform
          distanceFactor={1.5} // Ajusta o tamanho do HTML de acordo com a cena
          rotation={[0, Math.PI /2, 0]}  // Ajuste a rotação se necessário
        >
          <iframe
            src="https://winxp.vercel.app/"  
            style={{ border: "none", background: "white" }}
          />
            
          
      </Html>
      
      
      </Canvas>
    </div>
  );
}

export default App;

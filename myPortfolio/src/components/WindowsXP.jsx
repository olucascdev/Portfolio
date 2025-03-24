import React, { useState } from "react";
import { Button } from "@react95/core";
import { Computer, Folder, Notepad } from "@react95/icons";

const WindowsXP = () => {
  const [openWindow, setOpenWindow] = useState(false);

  return (
    <div
      style={{
        width: "647px",
        height: "523px",
        background: "#008080",
        padding: "10px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Ícones na área de trabalho */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "flex-start" }}>
        <div onClick={() => setOpenWindow(true)} style={{ cursor: "pointer", textAlign: "center" }}>
          <Computer />
          <p style={{ margin: 0, color: "white" }}>Meu Computador</p>
        </div>
        <div style={{ cursor: "pointer", textAlign: "center" }}>
          <Folder />
          <p style={{ margin: 0, color: "white" }}>Meus Documentos</p>
        </div>
        <div style={{ cursor: "pointer", textAlign: "center" }}>
          <Notepad />
          <p style={{ margin: 0, color: "white" }}>Bloco de Notas</p>
        </div>
      </div>

      {/* Janela estilo XP */}
      {openWindow && (
        <Window style={{ position: "absolute", top: "20%", left: "30%", width: 300 }}>
          <WindowHeader>
            <span>Meu Computador</span>
            <Button onClick={() => setOpenWindow(false)}>X</Button>
          </WindowHeader>
          <Toolbar>
            <Button variant="menu">Arquivo</Button>
            <Button variant="menu">Editar</Button>
            <Button variant="menu">Exibir</Button>
          </Toolbar>
          <WindowContent>
            <p>Bem-vindo ao Meu Computador!</p>
          </WindowContent>
        </Window>
      )}

      {/* Barra de tarefas estilo Windows XP */}
      <div
        style={{
          width: "100%",
          height: "40px",
          background: "#0A0A8A",
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          padding: "5px",
        }}
      >
        {/* Botão Iniciar */}
        <Button style={{ background: "#00A", color: "white", fontWeight: "bold", display: "flex", alignItems: "center", padding: "5px 10px", marginRight: "10px" }}>
          
          Iniciar
        </Button>

        {/* Espaço vazio para a barra de tarefas */}
        <div style={{ flex: 1, background: "#3A3A9A", height: "25px", borderRadius: "5px" }}></div>
      </div>
    </div>
  );
};

export default WindowsXP;

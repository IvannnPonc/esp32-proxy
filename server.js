// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

// Permitir que tu página de Netlify acceda al proxy
app.use(cors({
  origin: "https://invernaderito.netlify.app/", // ⚠️ reemplazá por tu dominio real
}));

app.use(express.json());

// Ruta para manejar el encendido y apagado del relé
app.post("/rele", async (req, res) => {
  const { state } = req.body;
  try {
    const espResponse = await fetch(`http://10.38.118.177/rele?state=${state}`); // ⚠️ IP local de tu ESP32
    const text = await espResponse.text();
    res.json({ ok: true, response: text });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy activo en el puerto ${PORT}`));

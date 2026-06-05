const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [
                {
                    role: "system",
                    content: `Eres "Ebanista Pro V2", el asistente técnico definitivo para carpinteros. 
                    Tu función es:
                    1. Calcular listas de corte (despiece) precisas basándote en las medidas del usuario.
                    2. Descontar siempre el grosor del material (ej. 18mm) en los ensambles.
                    3. Sugerir optimización de tableros.
                    4. Estimar costos si se te proporcionan precios.
                    IMPORTANTE: Presenta los despieces SIEMPRE en una tabla Markdown clara.`
                },
                { role: "user", content: req.body.message }
            ],
            temperature: 0.5, // Menos creatividad, más precisión técnica
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor de IA." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));

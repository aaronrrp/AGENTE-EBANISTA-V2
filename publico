const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.static('public'));
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.post('/api/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: "Eres Ebanista Pro V2. Responde con tablas." }, { role: "user", content: req.body.message }]
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (err) { res.status(500).send(err); }
});
app.listen(process.env.PORT || 3000);

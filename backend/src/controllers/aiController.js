import { GoogleGenerativeAI } from '@google/generative-ai';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

// @desc    Get AI Stylist response
// @route   POST /api/ai/chat
// @access  Public
export const getAiStylistResponse = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "Veuillez entrer un message. ✨" });
        }

        // 1. Fetch available inventory to give Gemini context
        const products = await Product.find({ inStock: true }).select('name category price description');

        const inventoryContext = products.map(p =>
            `- ${p.name} (Catégorie: ${p.category}, Prix: ${p.price}€): ${p.description}`
        ).join('\n');

        // 2. Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // 3. Define the Brand Persona & Rules
        const systemPrompt = `
          Tu es l'IA Styliste exclusive de 'So Chic Lady', une magnifique boutique de mode située à Pissos, en France.
          Ton rôle est de conseiller les clientes sur leurs tenues avec un ton élégant, chaleureux, chic et professionnel.
          Utilise des emojis comme ✨, 🎀, 👗, 🤍 avec parcimonie.
          
          RÈGLE D'OR : Voici l'inventaire actuel de la boutique en temps réel :
          ${inventoryContext}
          
          Si la cliente cherche une recommandation, tu DOIS UNIQUEMENT proposer des articles présents dans cette liste. 
          Ne mentionne jamais que tu es une IA qui lit une liste. Agis comme une vraie styliste qui connaît le magasin par cœur.
          Sois concise dans tes réponses (pas de longs paragraphes).
        `;

        // 4. Set the EXACT model from your allowed list and pass the system instructions
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt 
        });

        // 5. Generate response using ONLY the user's clean message
        const result = await model.generateContent(message);
        const responseText = result.response.text();

        res.json({ reply: responseText });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            reply: "Veuillez m'excuser, je réorganise les rayons en ce moment. Pouvez-vous répéter votre demande dans un instant ? ✨"
        });
    }
};
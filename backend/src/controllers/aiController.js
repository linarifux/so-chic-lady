import { GoogleGenerativeAI } from '@google/generative-ai';
import Product from '../models/Product.js';
import StoreConfig from '../models/StoreConfig.js';
import { BRAND_BIBLE } from '../utils/brandBible.js';
import dotenv from 'dotenv';

dotenv.config();

export const getAiStylistResponse = async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "Veuillez entrer un message. ✨" });
        }

        // 1. Fetch real-time inventory
        const products = await Product.find({ inStock: true }).select('name category price description');
        const inventoryContext = products.map(p =>
            `- ${p.name} (Catégorie: ${p.category}, Prix: ${p.price}€): ${p.description}`
        ).join('\n');

        // 2. Fetch Dynamic Store Configuration (Get the first/only document)
        let config = await StoreConfig.findOne();
        
        // Safety fallback: if the database is empty, create a default config on the fly
        if (!config) {
            config = await StoreConfig.create({});
        }

        // 3. Construct the Master System Prompt
        const systemPrompt = `
          Tu es l'IA Styliste exclusive de 'So Chic Lady'.
          
          ${BRAND_BIBLE}
          
          # DÉTAILS OPÉRATIONNELS EN TEMPS RÉEL (Respecte scrupuleusement ces règles) :
          - Horaires : ${config.storeHours}
          - Livraison : ${config.shippingInfo}
          - Retours : ${config.returnPolicy}
          - Promotions actuelles : ${config.currentPromotions}
          
          # RÈGLE D'OR - INVENTAIRE ACTUEL :
          Voici l'inventaire actuel de la boutique en temps réel :
          ${inventoryContext}
          
          Si la cliente cherche une recommandation, tu DOIS UNIQUEMENT proposer des articles présents dans l'inventaire. 
          Ne mentionne jamais que tu es une IA qui lit une liste. Agis comme une vraie styliste.
          Sois concise et utilise des emojis (✨, 🎀, 👗) avec parcimonie.
        `;

        // 4. Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt 
        });

        // 5. Generate Response
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
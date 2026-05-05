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


// @desc    Get AI "Complete the Look" recommendations
// @route   GET /api/ai/recommendations/:productId
// @access  Public
export const getCompleteTheLook = async (req, res) => {
    try {
        const mainProductId = req.params.productId;

        // 1. Fetch the main product
        const mainProduct = await Product.findById(mainProductId);
        if (!mainProduct) return res.status(404).json({ message: "Produit introuvable" });

        // 2. Fetch all OTHER in-stock products
        const otherProducts = await Product.find({ 
            _id: { $ne: mainProductId }, 
            inStock: true 
        }).select('_id name category color description');

        // If we don't have enough products, just return random ones (fallback)
        if (otherProducts.length < 3) {
            return res.json(otherProducts);
        }

        // 3. Format inventory for Gemini (Including the MongoDB _id)
        const inventoryContext = otherProducts.map(p =>
            `ID: ${p._id} | Nom: ${p.name} | Catégorie: ${p.category} | Desc: ${p.description}`
        ).join('\n');

        // 4. Initialize Gemini (Forcing JSON Output!)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: {
                // This is a magic setting: It forces Gemini to return valid JSON!
                responseMimeType: "application/json",
            }
        });

        const prompt = `
            Tu es un styliste de mode expert pour la marque 'So Chic Lady'.
            La cliente regarde actuellement cet article :
            Nom : ${mainProduct.name}
            Catégorie : ${mainProduct.category}
            Description : ${mainProduct.description}

            Voici le reste de notre inventaire :
            ${inventoryContext}

            TA MISSION : Choisis EXACTEMENT 3 articles dans cet inventaire qui s'accordent parfaitement avec l'article de la cliente pour créer une tenue complète et chic (par exemple, si elle regarde un bas, propose un haut et des accessoires).
            
            Tu DOIS renvoyer UNIQUEMENT un tableau JSON contenant les 3 IDs. 
            Format attendu : ["ID_1", "ID_2", "ID_3"]
        `;

        // 5. Ask Gemini
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Parse the JSON array returned by Gemini
        const recommendedIds = JSON.parse(responseText);

        // 6. Fetch the full product objects from the database using those IDs
        const recommendedProducts = await Product.find({
            _id: { $in: recommendedIds }
        });

        res.json(recommendedProducts);

    } catch (error) {
        console.error('AI Recommendation Error:', error);
        // Fallback: If Gemini fails, just return 3 random products
        const fallbackProducts = await Product.aggregate([
            { $match: { inStock: true } },
            { $sample: { size: 3 } }
        ]);
        res.json(fallbackProducts);
    }
};


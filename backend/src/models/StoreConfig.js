import mongoose from 'mongoose';

const storeConfigSchema = new mongoose.Schema({
    returnPolicy: { 
        type: String, 
        default: "Les retours sont gratuits sous 14 jours. Les articles soldés ne sont ni repris ni échangés." 
    },
    shippingInfo: { 
        type: String, 
        default: "Livraison offerte dès 100€ d'achat. Expédition sous 24 à 48h." 
    },
    currentPromotions: { 
        type: String, 
        default: "Aucune promotion spéciale en cours. Découvrez nos nouveautés !" 
    },
    storeHours: { 
        type: String, 
        default: "Du mardi au samedi, de 10h00 à 19h00. Fermé le dimanche et lundi." 
    }
}, { timestamps: true });

export default mongoose.model('StoreConfig', storeConfigSchema);
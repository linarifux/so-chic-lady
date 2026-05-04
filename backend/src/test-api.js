const API_KEY = "AIzaSyDDw_ImD46DN7koTxjGVTtGmcqDcXAeDdQ"; 

async function listAllowedModels() {
  console.log("Asking Google which models are unlocked for this key...");
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();

    if (data.models) {
      // Filter out older PaLM models to just show Gemini
      const geminiModels = data.models
        .filter(m => m.name.includes("gemini"))
        .map(m => {
            return {
                name: m.name.replace('models/', ''),
                description: m.displayName,
                supportedMethods: m.supportedGenerationMethods
            };
        });
        
      console.log("\n✅ AVAILABLE GEMINI MODELS FOR YOUR KEY:\n");
      console.table(geminiModels);
      console.log("\nLook for the model that supports 'generateContent'.");
    } else {
      console.log("❌ ERROR RESPONSE:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

listAllowedModels();
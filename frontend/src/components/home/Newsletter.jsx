const Newsletter = () => {
  return (
    <section className="py-24 bg-[#333333] text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">Rejoignez le Club So Chic</h2>
        <p className="text-gray-300 font-light mb-8">
          Inscrivez-vous à notre newsletter pour recevoir nos nouveautés, offres exclusives et conseils mode en avant-première.
        </p>
        <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-2">
          <input 
            type="email" 
            placeholder="Votre adresse email" 
            required
            className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 placeholder-gray-400 focus:outline-none focus:border-[#E5A3B8] rounded-sm transition-colors"
          />
          <button 
            type="submit" 
            className="bg-[#E5A3B8] text-[#333333] px-8 py-4 font-medium uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-sm shadow-lg shrink-0"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4 font-light">
          En vous inscrivant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
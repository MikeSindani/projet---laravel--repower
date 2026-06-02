import { Head } from '@inertiajs/react';
import { Calculator, MessageCircle, Minus, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { useCartStore } from '../store/useCartStore';

const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp.value;

interface Appliance {
  id: string;
  name: string;
  defaultPower: number; // Watts
  power: number; // Watts
  quantity: number;
  hours: number; // hours per day
}

const INITIAL_APPLIANCES: Appliance[] = [
  { id: 'ampoules', name: 'Ampoules LED', defaultPower: 10, power: 10, quantity: 0, hours: 6 },
  { id: 'tv', name: 'Téléviseur', defaultPower: 100, power: 100, quantity: 0, hours: 5 },
  { id: 'frigo', name: 'Réfrigérateur', defaultPower: 200, power: 200, quantity: 0, hours: 24 },
  { id: 'clim', name: 'Climatiseur', defaultPower: 1500, power: 1500, quantity: 0, hours: 6 },
  { id: 'chauffe_eau', name: 'Chauffe-eau / Réchauffeur', defaultPower: 2000, power: 2000, quantity: 0, hours: 2 },
  { id: 'ordinateur', name: 'Ordinateur', defaultPower: 80, power: 80, quantity: 0, hours: 4 },
];

function QuoteRequest() {
  const { items, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    emplacement: '',
    type_projet: '',
    puissance: '',
    message: ''
  });

  const [useCalculator, setUseCalculator] = useState(false);
  const [appliances, setAppliances] = useState<Appliance[]>(INITIAL_APPLIANCES);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplianceChange = (id: string, field: keyof Appliance, value: number) => {
    setAppliances((prev) =>
      prev.map((app) => (app.id === id ? { ...app, [field]: value } : app))
    );
  };

  // Calculations
  const calculations = useMemo(() => {
    let totalPower = 0; // W
    let totalEnergy = 0; // Wh

    appliances.forEach((app) => {
      totalPower += app.power * app.quantity;
      totalEnergy += app.power * app.quantity * app.hours;
    });

    const recommendedInverter = Math.ceil((totalPower * 1.25) / 100) / 10; // kW (with 25% margin, rounded to nearest 0.1)
    const recommendedBattery = Math.ceil((totalEnergy * 1.3) / 100) / 10; // kWh (with 30% safety margin / depth of discharge factor)

    return {
      totalPower,
      totalEnergy: totalEnergy / 1000, // kWh
      recommendedInverter: Math.max(recommendedInverter, 0),
      recommendedBattery: Math.max(recommendedBattery, 0),
    };
  }, [appliances]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Préparation du message WhatsApp
    const productsList = items.map(item => `- ${item.name} (${item.category})`).join('\n');
    
    let calculatorDetails = '';

    if (useCalculator) {
      const activeApps = appliances.filter(a => a.quantity > 0);
      const itemsDetail = activeApps
        .map(a => `- ${a.name}: ${a.quantity}x de ${a.power}W (utilisé ${a.hours}h/j)`)
        .join('\n');
      
      calculatorDetails = 
        `\n*BESOINS ÉLECTRIQUES ESTIMÉS (CALCULATEUR):*\n` +
        `${itemsDetail || 'Aucun équipement renseigné'}\n` +
        `• Puissance crête totale: ${calculations.totalPower} W\n` +
        `• Énergie consommée: ${calculations.totalEnergy.toFixed(1)} kWh/jour\n` +
        `• Recommandation Onduleur: ${calculations.recommendedInverter.toFixed(1)} kW\n` +
        `• Recommandation Batterie: ${calculations.recommendedBattery.toFixed(1)} kWh\n`;
    }

    const estimatedPower = useCalculator 
      ? `${calculations.recommendedInverter.toFixed(1)} kW (Onduleur rec.)` 
      : formData.puissance;

    const message = encodeURIComponent(
      `*DEMANDE DE DEVIS - REPOWER SARL*\n\n` +
      `*Client:* ${formData.nom}\n` +
      `*Entreprise:* ${formData.entreprise || 'N/A'}\n` +
      `*Email:* ${formData.email}\n` +
      `*Téléphone:* ${formData.telephone}\n` +
      `*Emplacement:* ${formData.emplacement}\n` +
      `*Type de projet:* ${formData.type_projet}\n` +
      `*Puissance estimée:* ${estimatedPower}\n` +
      calculatorDetails +
      `\n*PRODUITS SÉLECTIONNÉS:*\n${productsList || 'Aucun produit spécifique'}\n\n` +
      `*Notes:* ${formData.message || 'Aucune'}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      <Head title="Demander un Devis" />
      <div className="relative bg-background pt-20 text-on-background font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container dark:selection:bg-secondary dark:selection:text-white min-h-screen flex flex-col dark:bg-surface-container dark:text-gray-200">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="https://www.totalenergies.fr/fileadmin/_processed_/5/4/csm_onduleur_solaire_f27b08b7ac.jpeg" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.4] dark:opacity-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent/50 to-background/90 dark:from-gray-950/95 dark:via-transparent/60 dark:to-gray-950/95" />
      </div>

      {/* Main Content Canvas */}
      <main className="w-full relative z-10 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-md items-start">
          
          {/* Hero / Context Area */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-lg-mobile md:text-headline-lg-mobile lg:font-headline-xl lg:text-headline-xl dark:text-white">
                Demander un Devis
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-gray-400">
                Obtenez une évaluation précise pour votre infrastructure énergétique. Nos ingénieurs analyseront vos besoins pour concevoir une solution solaire robuste et pérenne, adaptée aux exigences de la RDC.
              </p>
            </div>
            {/* Industrial Visual */}
            <div className="w-full aspect-[4/3] rounded border border-outline-variant bg-surface-container overflow-hidden mt-4 dark:border-[#2d3438] dark:bg-gray-900">
              <img 
                alt="Installation solaire industrielle" 
                className="w-full h-full object-cover grayscale-[20%] contrast-125 opacity-90" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWX314JvM_pFQhn1jxpKzLGGnsv74NDtBPpMbglm1yHP190v8-B8377jSOxdYGIAvFfAwv4hsWT0K_T7sSkr2jPeMiCACut-o-8D7dKvYpxMroaYBhZMpQAvdhTG_G2q3PWy5dyCDE7itLajylyxpbGxmKsg44Ze-SCxB-4wlN5KB7GwuYj_ZYBRjqYcM1JQAiLV54DKaXhiO6V6WMtP-nLnSu_2A6xFjbYwR7JqsHIbKopU40eeJFe24x-Dek-mbkSETYQo1762sf"
              />
            </div>


          </div>

          {/* Form Area (Bento-style rigid card) */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded shadow-sm dark:bg-surface-container dark:border-[#2d3438]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Section 1: Coordonnées */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-outline-variant pb-2 mb-2 dark:border-[#2d3438]">
                  <h2 className="font-headline-md text-headline-md text-primary dark:text-white">Coordonnées</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="nom">Nom complet *</label>
                    <input 
                      className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500" 
                      id="nom" 
                      name="nom" 
                      required 
                      type="text"
                      value={formData.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="entreprise">Entreprise (Optionnel)</label>
                    <input 
                      className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500" 
                      id="entreprise" 
                      name="entreprise" 
                      type="text"
                      value={formData.entreprise}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="email">Adresse Email *</label>
                    <input 
                      className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500" 
                      id="email" 
                      name="email" 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="telephone">Téléphone *</label>
                    <input 
                      className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500" 
                      id="telephone" 
                      name="telephone" 
                      required 
                      type="tel"
                      value={formData.telephone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Détails du Projet */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-outline-variant pb-2 mb-2 dark:border-[#2d3438]">
                  <h2 className="font-headline-md text-headline-md text-primary dark:text-white">Détails du Projet</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="emplacement">Emplacement *</label>
                    <select 
                      className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors appearance-none dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500" 
                      id="emplacement" 
                      name="emplacement" 
                      required
                      value={formData.emplacement}
                      onChange={handleChange}
                    >
                      <option disabled value="">Sélectionnez une zone...</option>
                      <option value="lubumbashi">Lubumbashi (Zone Principale)</option>
                      <option value="kinshasa">Kinshasa</option>
                      <option value="kolwezi">Kolwezi</option>
                      <option value="autre">Autre province (RDC)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface mb-1 dark:text-gray-200">Type de projet *</label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          className="w-4 h-4 text-primary-container border-outline-variant focus:ring-primary-container dark:bg-[#252b2e] dark:border-[#2d3438] dark:checked:bg-secondary dark:focus:ring-secondary" 
                          name="type_projet" 
                          required 
                          type="radio" 
                          value="residentiel"
                          checked={formData.type_projet === 'residentiel'}
                          onChange={handleChange}
                        />
                        <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface dark:text-gray-400 dark:group-hover:text-white">Résidentiel</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          className="w-4 h-4 text-primary-container border-outline-variant focus:ring-primary-container dark:bg-[#252b2e] dark:border-[#2d3438] dark:checked:bg-secondary dark:focus:ring-secondary" 
                          name="type_projet" 
                          type="radio" 
                          value="commercial"
                          checked={formData.type_projet === 'commercial'}
                          onChange={handleChange}
                        />
                        <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface dark:text-gray-400 dark:group-hover:text-white">Commercial</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          className="w-4 h-4 text-primary-container border-outline-variant focus:ring-primary-container dark:bg-[#252b2e] dark:border-[#2d3438] dark:checked:bg-secondary dark:focus:ring-secondary" 
                          name="type_projet" 
                          type="radio" 
                          value="industriel"
                          checked={formData.type_projet === 'industriel'}
                          onChange={handleChange}
                        />
                        <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface dark:text-gray-400 dark:group-hover:text-white">Industriel (Lourd)</span>
                      </label>
                    </div>
                  </div>

                  {!useCalculator && (
                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="puissance">Besoins énergétiques estimés</label>
                      <select 
                        className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors appearance-none dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500" 
                        id="puissance" 
                        name="puissance"
                        value={formData.puissance}
                        onChange={handleChange}
                      >
                        <option disabled value="">Capacité cible...</option>
                        <option value="under_10kw">Moins de 10 kW</option>
                        <option value="10_50kw">10 kW - 50 kW</option>
                        <option value="50_200kw">50 kW - 200 kW</option>
                        <option value="over_200kw">Plus de 200 kW</option>
                        <option value="inconnu">Je ne suis pas sûr</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Toggle Calculator */}
                <div className="mt-4 p-4 rounded-xl border border-secondary/20 bg-secondary/5 dark:bg-secondary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calculator className="text-secondary" size={24} style={{ color: 'var(--color-secondary, #ff8a65)' }} />
                    <div>
                      <h3 className="font-bold text-primary dark:text-white text-sm">Calculateur de charge intelligent</h3>
                      <p className="text-xs text-on-surface-variant dark:text-gray-400">Estimez précisément vos besoins en fonction de vos appareils.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={useCalculator}
                      onChange={(e) => setUseCalculator(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary" style={{ '--tw-peer-checked-bg': 'var(--color-secondary, #ff8a65)' } as React.CSSProperties}></div>
                  </label>
                </div>

                {/* Calculator UI */}
                {useCalculator && (
                  <div className="mt-4 p-5 rounded-xl border border-outline-variant bg-surface-container-low dark:border-[#2d3438] dark:bg-[#1e2224] flex flex-col gap-6">
                    <h3 className="font-bold text-primary dark:text-white text-base border-b border-outline-variant pb-2 dark:border-[#2d3438]">
                      Détaillez vos équipements
                    </h3>
                    <div className="flex flex-col gap-4">
                      {appliances.map((app) => (
                        <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-lg border border-outline-variant bg-white dark:border-[#2d3438] dark:bg-[#252b2e]">
                          <div className="flex-1">
                            <p className="font-bold text-primary dark:text-gray-100 text-sm">{app.name}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <label className="text-xs text-on-surface-variant dark:text-gray-400 flex items-center gap-1">
                                Puissance (W):
                                <input 
                                  type="number" 
                                  className="w-16 p-1 border border-outline-variant rounded bg-surface text-center text-xs dark:bg-[#1e2224] dark:border-[#2d3438]"
                                  value={app.power}
                                  onChange={(e) => handleApplianceChange(app.id, 'power', Math.max(0, parseInt(e.target.value) || 0))}
                                />
                              </label>
                              <label className="text-xs text-on-surface-variant dark:text-gray-400 flex items-center gap-1">
                                Utilisation (h/j):
                                <input 
                                  type="number" 
                                  className="w-12 p-1 border border-outline-variant rounded bg-surface text-center text-xs dark:bg-[#1e2224] dark:border-[#2d3438]"
                                  value={app.hours}
                                  onChange={(e) => handleApplianceChange(app.id, 'hours', Math.min(24, Math.max(0, parseInt(e.target.value) || 0)))}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end md:self-auto">
                            <button
                              type="button"
                              onClick={() => handleApplianceChange(app.id, 'quantity', Math.max(0, app.quantity - 1))}
                              className="p-1.5 rounded-full border border-outline-variant hover:bg-surface-container dark:border-[#2d3438] dark:hover:bg-[#1e2224]"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-sm w-8 text-center">{app.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleApplianceChange(app.id, 'quantity', app.quantity + 1)}
                              className="p-1.5 rounded-full border border-outline-variant hover:bg-surface-container dark:border-[#2d3438] dark:hover:bg-[#1e2224]"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Results Panel */}
                    <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 dark:bg-secondary/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-gray-400">Puissance Totale</p>
                        <p className="text-lg font-extrabold text-primary dark:text-white mt-1">{calculations.totalPower} W</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-gray-400">Énergie / Jour</p>
                        <p className="text-lg font-extrabold text-primary dark:text-white mt-1">{calculations.totalEnergy.toFixed(1)} kWh</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-secondary dark:text-secondary">Onduleur Recommandé</p>
                        <p className="text-lg font-extrabold text-secondary dark:text-secondary mt-1">{calculations.recommendedInverter.toFixed(1)} kW</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-secondary dark:text-secondary">Batterie Minimale</p>
                        <p className="text-lg font-extrabold text-secondary dark:text-secondary mt-1">{calculations.recommendedBattery.toFixed(1)} kWh</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1 mt-2">
                  <label className="font-label-md text-label-md text-on-surface dark:text-gray-200" htmlFor="message">Notes additionnelles</label>
                  <textarea 
                    className="bg-surface border border-outline-variant rounded p-3 font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors resize-none dark:bg-[#252b2e] dark:border-[#2d3438] dark:text-white dark:focus:border-orange-500 dark:focus:ring-orange-500 dark:placeholder:text-gray-500" 
                    id="message" 
                    name="message" 
                    placeholder="Spécifiez des contraintes de site ou des équipements spécifiques..." 
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Action Area */}
              <div className="pt-4 border-t border-outline-variant flex justify-end dark:border-[#2d3438]">
                <button 
                  className="bg-secondary text-on-secondary font-label-md text-label-md px-8 py-3 rounded active:scale-95 transition-transform duration-150 hover:bg-secondary-container hover:text-on-secondary-container border border-transparent hover:border-secondary flex items-center gap-2 dark:bg-secondary dark:hover:bg-secondary-container dark:text-white" 
                  type="submit"
                  style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
                >
                  <MessageCircle size={20} />
                  Envoyer le devis par WhatsApp
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
      </div>
    </>
  );
}

export default QuoteRequest;
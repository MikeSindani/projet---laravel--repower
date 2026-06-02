import { Head } from '@inertiajs/react'
import {
    ArrowRight,
    BatteryCharging,
    Bolt,
    CheckCircle2,
    Construction,
    Cpu,
    Factory,
    Leaf,
    ShieldCheck,
    SunMedium,
    Wrench,
} from 'lucide-react'

export default function Services() {

  
  const installationItems = [
    {
    title: 'Résidentiel',
    text: 'Autonomie énergétique pour votre foyer.',
  },
  {
    title: 'Commercial',
    text: 'Réduction drastique des coûts opérationnels.',
  },
  {
    title: 'Industriel',
    text: 'Centrales de haute puissance et mini-réseaux.',
  },
]

const storageItems = [
  {
    title: 'Technologie lithium',
    text: 'Cycles profonds, recharge rapide et longévité supérieure sur le long terme.',
  },
  {
    title: 'Technologie gel',
    text: 'Solution robuste et économique pour les environnements exigeants.',
  },
]

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Certification internationale',
    text: 'Matériel provenant des meilleurs fabricants mondiaux, sélectionné pour la fiabilité.',
  },
  {
    icon: Factory,
    title: 'Expertise locale',
    text: 'Équipes d ingénieurs et de techniciens formés aux exigences du terrain congolais.',
  },
  {
    icon: Wrench,
    title: 'Garantie longue durée',
    text: 'Des solutions pensées pour durer, avec un accompagnement technique dans le temps.',
  },
]

  return (
    <>
      <Head title="Nos Services" />
      <main className="bg-surface text-on-surface dark:bg-[#191c1e] dark:text-gray-200">
      <section className="relative flex h-[80vh] items-center overflow-hidden bg-primary-container dark:bg-[#1e2224]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-primary-container/70" />
          <img
            alt="Centrale solaire industrielle"
            className="h-full w-full object-cover"
            src="https://www.totalenergies.fr/fileadmin/_processed_/5/4/csm_onduleur_solaire_f27b08b7ac.jpeg"
          />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-max-width px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl border-l-4 border-secondary pl-6 md:pl-8">
            <h1 className="font-headline-xl text-headline-xl text-white">
              Nos Services Énergétiques
            </h1>
            <p className="mt-4 font-body-lg text-body-lg text-primary-fixed dark:text-gray-300">
              Solutions photovoltaïques de pointe pour l industrie, le commerce et
              l{"'"} habitat en République Démocratique du Congo.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-max-width px-margin-mobile py-24 md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="group relative overflow-hidden border border-outline-variant bg-white p-8 md:col-span-8 md:min-h-[500px] md:p-12 dark:border-outline dark:bg-[#1e2224]">
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3 text-secondary dark:text-secondary">
                <SunIcon />
                <span className="font-label-md text-label-md uppercase tracking-widest">
                  Innovation durable
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary dark:text-white">
                Installation Solaire
              </h2>
              <p className="mt-6 max-w-md font-body-md text-body-md text-on-surface-variant dark:text-gray-400">
                Déploiement complet de systèmes photovoltaïques adaptés à vos besoins
                spécifiques. Nous couvrons tous les secteurs d activité avec une
                expertise technique certifiée.
              </p>
              <ul className="mb-10 mt-8 space-y-4">
                {installationItems.map((item) => (
                  <li className="flex items-start gap-3" key={item.title}>
                    <CheckCircle2 className="mt-0.5 text-secondary dark:text-secondary" size={20} />
                    <span className="font-body-md text-body-md font-bold text-primary dark:text-white">
                      {item.title}:
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant dark:text-gray-400">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10">
              <a
                className="inline-flex items-center gap-2 border border-primary-container px-8 py-3 font-label-md text-label-md text-primary-container transition-all duration-300 hover:bg-primary-container hover:text-white dark:border-secondary-fixed dark:text-secondary-fixed dark:hover:bg-secondary-fixed dark:hover:text-on-secondary"
                href="#contact"
              >
                Voir les réalisations
                <ArrowRight size={16} />
              </a>
            </div>

            <Bolt className="absolute -right-16 -top-8 h-64 w-64 text-primary/8 transition-opacity group-hover:text-primary/15 dark:text-white/5 dark:group-hover:text-white/10" />
          </div>

          <div className="border border-outline bg-tertiary p-8 text-white md:col-span-4 md:p-12 dark:border-outline dark:bg-tertiary-container">
            <BatteryCharging className="mb-8 text-secondary" size={48} />
            <h2 className="font-headline-md text-headline-md">Systèmes de Stockage</h2>
            <p className="mb-8 mt-6 font-body-md text-body-md text-on-tertiary-container">
              Assurez une continuité de service 24/7 avec nos solutions de stockage
              d'énergie haute performance.
            </p>
            <div className="mt-auto space-y-6">
              {storageItems.map((item) => (
                <div
                  className="border border-outline bg-white/5 p-6"
                  key={item.title}
                >
                  <h3 className="mb-2 font-label-md text-label-md uppercase text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-on-tertiary-container">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-6 border border-outline-variant bg-surface-container-low p-8 md:col-span-6 md:p-10 dark:border-outline dark:bg-surface-container">
            <div className="rounded-lg bg-primary-container p-4 dark:bg-primary">
              <Cpu className="text-white" size={30} />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary dark:text-white">
                Onduleurs et Régulateurs
              </h2>
              <p className="mb-6 mt-4 font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">
                Installation de composants de conversion de puissance de classe
                industrielle. Nous utilisons uniquement des marques certifiées pour
                garantir la stabilité de votre réseau.
              </p>
              <a
                className="group inline-flex items-center gap-2 font-label-md text-label-md text-secondary"
                href="#contact"
              >
                Fiche technique
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={16}
                />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-6 border border-outline-variant bg-white p-8 md:col-span-6 md:p-10 dark:border-outline dark:bg-surface-container">
            <div className="rounded-lg bg-secondary p-4">
              <Construction className="text-white" size={30} />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary dark:text-white">
                Maintenance et Support
              </h2>
              <p className="mb-6 mt-4 font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">
                Un service après-vente réactif pour maximiser le rendement de vos
                installations. Monitoring à distance et interventions techniques
                prioritaires.
              </p>
              <a
                className="group inline-flex items-center gap-2 font-label-md text-label-md text-primary-container dark:text-secondary-fixed"
                href="#contact"
              >
                Contacter le support
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={16}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary-container py-20 text-center dark:bg-[#1e2224]">
        <div className="pointer-events-none absolute inset-0 flex h-full w-full flex-wrap items-center justify-center gap-12 opacity-10">
          <Cpu className="h-24 w-24 text-white" />
          <Bolt className="h-24 w-24 text-white" />
          <Leaf className="h-24 w-24 text-white" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-margin-mobile">
          <h2 className="font-headline-lg text-headline-lg text-white">
            Pret a passer a l{"'"}avenir de la RDC avec precision ?
          </h2>
          <p className="mb-10 mt-6 font-body-lg text-body-lg text-primary-fixed">
            Nos experts sont a votre disposition pour une etude de faisabilite
            gratuite et un devis personnalise adapte a votre projet.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <a
              className="rounded-lg bg-secondary px-10 py-4 font-bold text-white shadow-lg transition-all active:scale-95"
              href="#contact"
            >
              Demander un devis
            </a>
            <a
              className="rounded-lg border-2 border-white bg-transparent px-10 py-4 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              href="#services"
            >
              Nos projets
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface-bright py-24 dark:border-outline dark:bg-surface-container">
        <div className="mx-auto max-w-max-width px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="md:w-1/2">
              <img
                alt="Detail de cellules solaires"
                className="h-[400px] w-full rounded-xl border border-outline-variant object-cover shadow-xl dark:border-outline"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm5LMoC1FI3Z4kFuPFGHP-V0V7lGW07LANd6W9fexes0heOlhfRjG239mw1_hB-G48c0QJwo-4uza0Hh5KM4ylHFRl9Pk2SsSx56oZdBM7AFX2nV1hW9REpJCCWnQkJDPX1Z35QcUhzhMM36utvFx4lp98muHVVDjmOQ40enoqkB11pD1XCusUsKIRxeJgmUbkzxCKVjDlII9n_358IHLKR8o_xUhzu2nXdHSX0EpAXIFKcf6JCANhjVR1HhZzZEvDAiKDIcwgDCud"
              />
            </div>
            <div className="md:w-1/2">
              <span className="mb-4 block font-label-md text-label-md text-secondary">
                QUALITE SUPERIEURE
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary dark:text-on-surface">
                Pourquoi REPOWER SARL ?
              </h2>
              <div className="mt-8 space-y-8">
                {reasons.map(({ icon: Icon, title, text }) => (
                  <div className="flex gap-4" key={title}>
                    <Icon
                      className="shrink-0 text-primary-container dark:text-secondary-fixed"
                      size={34}
                    />
                    <div>
                      <h4 className="mb-2 text-lg font-bold text-primary dark:text-on-surface">
                        {title}
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

function SunIcon() {
  return (<SunMedium size={40} /> )
}

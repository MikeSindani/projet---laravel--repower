import { Head } from '@inertiajs/react'
import {
  Headphones,
  Lightbulb,
  MapPinned,
  ShieldCheck
} from 'lucide-react'

const strengths = [
  {
    title: 'Qualité',
    text: "L'excellence comme standard minimal pour chaque panneau posé.",
  },
  {
    title: 'Professionnalisme',
    text: 'Une rigueur méthodologique héritée des standards industriels mondiaux.',
  },
  {
    title: 'Engagement',
    text: "Une passion pour le développement de notre nation par l'énergie.",
  },
  {
    title: 'Innovation',
    text: 'Recherche constante de solutions plus performantes et mieux adaptées.',
  },
]

function AboutPage() {
  return (
    <>
      <Head title="À Propos" />
      <main className="bg-background font-body-md text-body-md text-on-surface dark:bg-[#191c1e] dark:text-gray-200">
      <section className="relative flex h-screen md:h-[80dvh] items-center overflow-hidden bg-primary-container/70 dark:bg-[#191c1e]/75">
        <div className="absolute inset-0 opacity-40 bg-primary-container/70">
          <img
            alt="Parc solaire industriel"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcodBO8HxSxGvkpKX8JRjB1OAXy2es1xaYA_acBnn7fmVugNtdst8MzzP9koEuTSYgR71vXSOtKmLw9p2az-um8IqzjJfdiUHzaMVDkjhbNJ1lo3PSh5oP0nQrPSNcik2jsXtj02QxKLHRrqeR-mlpJKzwpLwnS4KP6ALULBVDGYiVO0borPbK1EXmXU0l7PG-AUXaoklcveZb7xaJK-jFS4i2kirJrtrie9FxbimZZG6lby8x3_kLQQubCkuouxOaov552FwVNjFI"
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-max-width px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded bg-secondary-container px-4 py-1 font-label-md text-label-md text-white dark:bg-secondary">
              A PROPOS DE NOUS
            </span>
            <h1 className="mb-6 font-headline-xl text-headline-xl text-white">
              Notre Mission : Electrifier l&apos;avenir de la RDC
            </h1>
            <p className="max-w-2xl font-body-lg text-body-lg text-primary-fixed dark:text-gray-300">
              REPOWER-RDC s&apos;engage a transformer le paysage energetique de la
              Republique Democratique du Congo grace a des solutions solaires
              durables, innovantes et accessibles.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-max-width px-margin-mobile py-24 md:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-gutter-md lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-6 font-headline-lg text-headline-lg text-primary dark:text-white">
              Ancrage Local, Ambition Nationale
            </h2>
            <p className="mb-6 text-on-surface-variant dark:text-gray-400">
              Basés au cœur industriel de la RDC à Lubumbashi, nous rayonnons sur
              toute la région du Katanga et au-delà. Notre histoire est celle d'une
              proximité forte avec les acteurs économiques et résidentiels locaux.
            </p>
            <div className="flex flex-col gap-4 border-l-4 border-secondary py-2 pl-6">
              <div className="font-headline-md text-headline-md text-primary dark:text-white">
                Lubumbashi
              </div>
              <p className="italic text-on-surface-variant dark:text-gray-400">
                Notre centre operationnel strategique pour le developpement
                energetique du pays.
              </p>
            </div>
          </div>

          <div className="relative h-[400px] lg:col-span-7">
            <div className="absolute inset-0 rounded-lg border border-outline-variant bg-surface-container-low p-2 dark:border-outline dark:bg-surface-container">
              <img
                alt="Vue aerienne de Lubumbashi"
                className="h-full w-full rounded object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYcg_LP6Wm_QTDz9Xf8-473bCP2v7FUeoF_OgRBbfpXPDRKnYgKHdIQLU10I4LiAVP4KnBRx_32auo7q0lzBNYCbZqbw6DdX3lMWAczBOeZog63RFaIXbJA77zifEieANCJQ_MZKDjuraCcPxEGmWN86xtgcA3cAPFpE8CrVraf2MWIy4kZvkdIG4PGvmgZdBQSom4QPY02E88dCmU_3Aywb9w7LRSliT-M8kvlRUdvc2QNcXjvy8Y_qwabIMTznrq9TtLQK-f0Qw-"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24 dark:bg-surface-container/30">
        <div className="mx-auto max-w-max-width px-margin-mobile md:px-margin-desktop">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
              Une Expertise Sans Compromis
            </h2>
            <p className="mx-auto max-w-2xl text-on-surface-variant dark:text-on-surface-variant">
              Nous fusionnons la connaissance profonde du terrain congolais avec les
              standards technologiques internationaux les plus rigoureux.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter-md md:grid-cols-3">
            <div className="rounded-lg border border-outline-variant bg-white p-8 md:col-span-2 dark:border-outline dark:bg-surface-container/90">
              <ShieldCheck className="mb-6 text-secondary" size={40} />
              <h3 className="mb-4 font-headline-md text-headline-md text-primary dark:text-white">
                Équipements de Classe Mondiale
              </h3>
              <p className="mb-6 text-on-surface-variant dark:text-on-surface-variant">
                Nous sélectionnons exclusivement des composants certifiés Tier-1.
                Nos onduleurs, batteries et panneaux solaires sont pensés pour les
                conditions climatiques spécifiques de la RDC tout en garantissant un
                rendement optimal sur des décennies.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="rounded bg-primary-container px-3 py-1 font-label-md text-label-md text-white">
                  Photovoltaique
                </span>
                <span className="rounded bg-primary-container px-3 py-1 font-label-md text-label-md text-white">
                  Stockage Lithium
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-primary-container p-8 text-white">
              <MapPinned className="mb-6 text-secondary-fixed" size={40} />
              <h3 className="mb-4 font-headline-md text-headline-md">
                Ingenierie de Precision
              </h3>
              <p className="text-primary-fixed">
                Chaque installation est précédée d'un audit technique complet pour
                adapter la solution aux besoins réels de consommation.
              </p>
            </div>

            <div className="rounded-lg border border-outline-variant bg-white p-8 dark:border-outline dark:bg-surface-container/90">
              <Headphones className="mb-6 text-primary dark:text-secondary-fixed" size={40} />
              <h4 className="mb-2 font-headline-md text-headline-md text-primary dark:text-white">
                Fiabilité
              </h4>
              <p className="text-on-surface-variant dark:text-on-surface-variant">
                Maintenance proactive et support technique local 24/7.
              </p>
            </div>

            <div className="rounded-lg border border-outline-variant bg-white p-8 dark:border-outline dark:bg-surface-container/90 md:col-span-2">
              <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <div className="flex-1">
                  <Lightbulb className="mb-4 text-primary dark:text-secondary-fixed" size={40} />
                  <h4 className="mb-2 font-headline-md text-headline-md text-primary dark:text-white">
                    Innovation Continue
                  </h4>
                  <p className="text-on-surface-variant dark:text-on-surface-variant">
                    Integration de systemes de monitoring intelligents pour un suivi
                    en temps reel de votre production energetique.
                  </p>
                </div>
                <div className="h-32 w-full overflow-hidden rounded bg-surface-container md:w-48 dark:bg-surface-container-high">
                  <img
                    alt="Interface de monitoring energetique"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDngz-kTwFQbxC-JIAdEmWd7ZuLwgycEbCfkCtBM-JxFSk3NofkHh-TtC4SZ1tHiFXhb9P2a_N48nHzXuWQ_al-CjMArhR8I9xlE6XVw74dv0r8AdvqclmAl5Sjw_tmVmULVVOq5PX5lL7S75Kxdktpsb0TPJ1ZOQ642RygLLcrVrJptmNidoHR094bNQYQuSlAfiJgLsciT3llcOUXipwW2nOIRmiZrlXSxD34ZS73OsjmQ7loczo-9Zq3VS_pe30uUfbWtgtWAPAP"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-max-width px-margin-mobile py-24 md:px-margin-desktop">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
            La Force de Notre Equipe
          </h2>
          <p className="text-on-surface-variant dark:text-on-surface-variant">
            Plus que des techniciens, nos collaborateurs sont des ambassadeurs de la
            transition energetique en RDC.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-gutter-md sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((strength) => (
            <div
              className="group border border-outline-variant p-8 transition-colors duration-300 hover:bg-primary-container dark:border-outline dark:hover:bg-primary-container"
              key={strength.title}
            >
              <h5 className="mb-4 font-headline-md text-headline-md text-primary group-hover:text-white dark:text-white">
                {strength.title}
              </h5>
              <p className="text-body-md text-on-surface-variant group-hover:text-primary-fixed dark:text-on-surface-variant">
                {strength.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tertiary py-24">
        <div className="mx-auto max-w-max-width px-margin-mobile text-center md:px-margin-desktop">
          <h2 className="mb-8 font-headline-xl text-headline-xl text-white">
            Pret a transformer votre consommation energetique ?
          </h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              className="rounded bg-secondary px-10 py-4 font-label-md text-label-md text-white transition-opacity hover:opacity-90"
              href="/#contact"
            >
              Contactez notre equipe
            </a>
            <a
              className="rounded border border-white px-10 py-4 font-label-md text-label-md text-white transition-all hover:bg-white hover:text-tertiary"
              href="/nos-produits"
            >
              Decouvrir nos produits
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

export default AboutPage

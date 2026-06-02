import { Head, Link } from '@inertiajs/react';
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Headphones,
  Lightbulb,
  Mail,
  MessageCircle,
  Phone,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  SunMedium,
  Trash2,
  Users,
  Wrench
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { useCartStore } from '../store/useCartStore';
import { useQuoteStore } from '../store/useQuoteStore';

const values = [
  'Équipements fiables de grade industriel',
  'Installation professionnelle certifiée',
  'Respect strict des normes de sécurité',
  'Soutien au développement économique local',
]

const heroSlides = [
  {
    type: 'video' as const,
    badge: 'Bienvenu(e) chez REPOWER SARL',
    heading: "L'énergie de demain, disponible aujourd'hui à Lubumbashi",
    description:
      'Solution complète d\'installation des panneaux solaires , onduleurs , batteries pour résidence, commerce et industries. Expertise locale, équipement de qualité services après ventes',
  },
  {
    type: 'image' as const,
    image: 'https://images.pexels.com/photos/18306344/pexels-photo-18306344.jpeg',
    badge: 'Solutions Industrielles',
    heading: 'Parcs solaires haute performance pour le Katanga',
    description:
      'Conception et déploiement de systèmes solaires industriels pour les mines et grandes entreprises de la région.',
  },
  {
    type: 'image' as const,
    image: 'https://tse2.mm.bing.net/th/id/OIP.IBvYCm1pME8fJ_Kh_-4DqQHaFk?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Onduleurs Intelligents',
    heading: 'Convertisseurs hybrides 12kw pour une énergie stable',
    description:
      "Gestion optimale de l'énergie avec nos onduleurs hybrides certifiés pour un courant stable 24h/24.",
  },
  {
    type: 'image' as const,
    image: 'https://tse3.mm.bing.net/th/id/OIP.pHN5g6U6kYwLJbaC0xI0TAHaDI?w=2560&h=1083&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Batteries LiFePO4 Gen 3',
    heading: 'Stockage énergie : 6000+ cycles, 10-15 ans de durée de vie',
    description: 'Nos batteries lithium fer phosphate garantissent une autonomie maximale, meme lors des journees sans soleil.',
  },
]

const teamValues = [
  {
    icon: Users,
    title: 'Professionnalisme',
    text: 'Chaque membre de notre équipe est formé aux dernières technologies photovoltaïques mondiales.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    text: 'Nous recherchons continuellement les solutions les plus efficaces pour le contexte spécifique du Katanga.',
  },
  {
    icon: ShieldCheck,
    title: 'Engagement',
    text: 'Nous accompagnons nos clients bien au-delà de l\'installation, pour assurer la pérennité de leur investissement.',
  }
]

const faqs = [
  {
    question: 'Le solaire est-il fiable pendant la saison des pluies en RDC ?',
    answer:
      'Oui. Nos panneaux captent aussi la lumiere diffuse, et nos systemes de stockage sont dimensionnes pour maintenir une bonne autonomie meme lors de journees nuageuses.',
  },
  {
    question: 'Puis-je devenir totalement autonome vis-à-vis de la SNEL ?',
    answer:
      'Absolument. Avec un dimensionnement correct et des batteries lithium de haute capacité, nous concevons des systèmes "Off-grid" qui vous permettent de vous passer totalement du réseau national.',
  },
  {
    question: 'Combien de temps dure une installation complète ?',
    answer:
      'Pour un système résidentiel standard, il faut généralement 2 à 4 jours après validation technique. Les projets industriels suivent un planning dédié selon la puissance installée.',
  },
  {
    question: 'Offrez-vous des facilités de paiement ou du crédit bail ?',
    answer:
      'Nous étudions chaque projet au cas par cas. Pour les industries et commerces, des solutions de financement via nos partenaires bancaires locaux à Lubumbashi sont envisageables.',
  },
  {
    question: 'Quelle est la durée de vie des batteries lithium proposées ?',
    answer:
      'Nos batteries LiFePO4 (Lithium Fer Phosphate) sont conçues pour plus de 6000 cycles, soit environ 10 à 15 ans de vie utile selon l\'usage quotidien.',
  },
  {
    question: 'Comment fonctionne la maintenance après installation ?',
    answer:
      'Nous proposons des contrats de maintenance préventive et disposons d\'un service technique réactif basé à Lubumbashi pour toute intervention urgente.',
  },
]

function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (fading || index === active) {
        return
      }

      setFading(true)
      setTimeout(() => {
        setActive(index)
        setFading(false)
      }, 350)
    },
    [active, fading],
  )

  const next = useCallback(() => goTo((active + 1) % heroSlides.length), [active, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(next, 6000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [active, next])

  useEffect(() => {
    const vid = videoRef.current

    if (!vid) {
      return
    }

    if (active === 0) {
      vid.currentTime = 0; vid.play().catch(() => { })
    } else {
      vid.pause()
    }
  }, [active])

  const slide = heroSlides[active]

  return (
    <div className="absolute inset-0 z-0" style={{ backgroundColor: '#191c1e' }}>
      {/* Background layers */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: active === i ? 1 : 0 }}
        >
          {s.type === 'video' ? (
            <video
              ref={videoRef}
              autoPlay loop muted playsInline
              className="absolute h-full w-full object-cover"
              poster="https://lh3.googleusercontent.com/aida/ADBb0uhNFjhNYmgtLl5uursTH0SAIdKVFLWbnZXjnEoZ3B1e_lbyKt8YPHvdQVF1VmHjZ4nzRDBGuMXqOHzcLbBP8YDUnv0xEKvBVyPeCI5nEY1QKQ9a-3_SvW0jQ4e2DGwF-cDHizn7EEGTrP8OHZbORaCNyiUgHcMh55_gfTqnlJ5eUAyhuPy1g_j3ZCChM-mKoEs0Ma5AZfADsH2j5_vcB6K3bqEdHPa7RNfDHyzWrE5eYUEiYSIa-4fqwLch"
            >
              <source src="https://video-previews.elements.envatousercontent.com/4503eb00-7cff-4569-bf2b-b15641b5e175/watermarked_preview/watermarked_preview.mp4" type="video/mp4" />
            </video>
          ) : (
            <img src={(s as { image: string }).image} alt={s.badge} className="absolute h-full w-full object-cover" />
          )}
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00061c]/90 via-[#00061c]/70 to-[#00061c]/30" />

      {/* Dot indicators + arrows */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          aria-label="Slide précédent"
          onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: active === i ? '2rem' : '0.5rem',
                backgroundColor: active === i ? 'var(--color-secondary, #ff8a65)' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
        <button
          aria-label="Slide suivant"
          onClick={() => goTo((active + 1) % heroSlides.length)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 active:scale-90"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide text content — crossfades with slide */}
      <div
        className="absolute inset-0 z-10 flex items-center"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 350ms ease' }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
          <div className="max-w-2xl">
            <span
              className="mb-5 inline-block px-4 py-1 font-label-md text-label-md uppercase tracking-wider text-white"
              style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
            >
              {slide.badge}
            </span>
            <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-5xl">
              {slide.heading}
            </h1>
            <p className="mb-10 text-lg text-white/80">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full px-8 py-4 font-bold text-white transition-all hover:shadow-lg active:scale-95"
                style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
                href="/demander-un-devis"
              >
                Demarrer votre projet
              </a>
              <a
                className="rounded-full border border-white px-8 py-4 font-bold text-white transition-all hover:bg-white/10"
                href="#about"
              >
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeProductCarousel({ products }: { products: DisplayProduct[] }) {
  const { addItem } = useCartStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current

    if (!el) {
      return
    }

    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current

    if (!el) {
      return
    }

    el.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })
    setTimeout(updateScrollState, 350)
  }

  useEffect(() => {
    const el = scrollRef.current

    if (el) {
      el.addEventListener('scroll', updateScrollState)
      updateScrollState()
    }

    return () => el?.removeEventListener('scroll', updateScrollState)
  }, [products, updateScrollState])

  const handleBuy = (product: DisplayProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price_usd: product.price_usd,
      price_cdf: product.price_cdf ? parseInt(product.price_cdf.replace(/\D/g, '')) : undefined,
      photo: product.image,
    })
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-outline-variant bg-white p-10 text-center dark:border-[#2d3438] dark:bg-[#252b2e]">
        <Lightbulb size={40} className="mx-auto mb-4 text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }} />
        <h3 className="mb-2 font-bold text-primary dark:text-white">
          Aucun produit actif pour le moment.
        </h3>
        <p className="text-sm text-on-surface-variant dark:text-gray-400">
          Les produits ajoutes depuis le tableau de bord apparaitront ici.
        </p>
      </div>
    )
  }

  return (
    <div className="relative group/carousel">
      {/* Scroll controls */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-[#252b2e] dark:text-white"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-[#252b2e] dark:text-white"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none scroll-smooth px-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((p, idx) => (
          <div
            key={p.id || idx}
            className="flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#2d3438] dark:bg-[#1e2224]"
          >
            {/* Image Zone */}
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-surface-container dark:bg-[#252b2e]">
              {p.image ? (
                <img
                  alt={p.name}
                  src={p.image}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <Lightbulb size={48} className="text-primary dark:text-white" />
                </div>
              )}
              <div className="absolute top-3 right-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white shadow" style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}>
                {p.tier}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }}>
                  {p.category}
                </span>
                <h4 className="text-sm font-bold leading-snug text-primary dark:text-white line-clamp-2 mt-1">
                  {p.name}
                </h4>
                {p.description && (
                  <p className="mt-1 text-xs text-on-surface-variant dark:text-gray-400 line-clamp-2">
                    {p.description}
                  </p>
                )}
                {p.price_cdf && (
                  <div className="mt-2 text-xs font-semibold text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }}>
                    {p.price_cdf}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleBuy(p)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-full bg-green-600 px-2 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-green-700 active:scale-95"
                  >
                    <MessageCircle size={12} />
                    Acheter
                  </button>

                  {p.id ? (
                    <Link
                      href={`/produit/${p.id}`}
                      className="flex flex-1 items-center justify-center gap-1 rounded-full bg-secondary px-2 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-secondary/80 active:scale-95"
                      style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
                    >
                      <ExternalLink size={12} />
                      Détails
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleBuy(p)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-full border border-secondary px-2 py-1.5 text-[11px] font-bold text-secondary transition-all hover:bg-secondary hover:text-white active:scale-95 dark:text-secondary"
                      style={{ borderColor: 'var(--color-secondary, #ff8a65)', color: 'var(--color-secondary, #ff8a65)' }}
                    >
                      <ExternalLink size={12} />
                      Détails
                    </button>
                  )}
                </div>

                <Link
                  href="/demander-un-devis"
                  className="flex w-full items-center justify-center gap-1 rounded-full border border-outline-variant px-2 py-1.5 text-[11px] font-bold text-primary transition-all hover:border-secondary hover:text-secondary dark:border-outline dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
                >
                  <ShoppingCart size={12} />
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface DbProduct {
  id?: number;
  title: string;
  category?: string;
  description?: string;
  price_usd?: number;
  price_cdf?: number;
  photos?: string[] | string;
  active?: boolean;
}

interface DisplayProduct {
  id?: number;
  category: string;
  name: string;
  tier: string;
  price_cdf: string | null;
  price_usd?: number;
  image: string;
  description?: string;
}

interface WelcomeProps {
  products?: DbProduct[];
}

const getProductPhotos = (photos: DbProduct['photos']): string[] => {
  if (Array.isArray(photos)) {
    return photos
  }

  if (typeof photos === 'string') {
    try {
      const parsed = JSON.parse(photos)

      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      if (photos.trim().startsWith('http')) {
        return [photos]
      }
    }
  }

  return []
}

export default function Welcome({ products: dbProducts = [] }: WelcomeProps) {
  const { items, clearCart } = useQuoteStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Résidentiel',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construire le message WhatsApp
    const whatsappMessage = `
Nouveau message depuis le site web REPOWER-DRC:

Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Type de projet: ${formData.projectType}
Message: ${formData.message}

Ce client souhaite être contacté pour plus d'informations.
    `.trim()

    // Ouvrir WhatsApp avec le message
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.value}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')

    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Résidentiel',
      message: ''
    })
  }

  const displayProducts: DisplayProduct[] = dbProducts
    .filter((p) => p.active !== false)
    .slice(0, 10)
    .map(p => {
      const photos = getProductPhotos(p.photos)

      return {
        id: p.id,
        category: p.category || 'Produit',
        name: p.title,
        tier: p.price_usd ? `$${p.price_usd}` : 'Prix sur demande',
        price_cdf: p.price_cdf ? `${p.price_cdf} CDF` : null,
        price_usd: p.price_usd,
        image: photos[0] || '',
        description: p.description,
      };
    })

  return (
    <>
      <Head title="Accueil" />
      <main className="bg-surface font-body-md text-body-md text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed dark:bg-[#191c1e] dark:text-gray-200">
        {/* Panier flottant de devis */}
        {items.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2 animate-bounce">
            <a
              href="/demander-un-devis"
              className="flex flex-col items-start gap-1 rounded-full bg-secondary px-6 py-4 font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-secondary"
              style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }}>
                  {items.length}
                </span>
              </div>
              <span className="text-xs">Demander mon devis</span>
            </a>
            <button
              onClick={clearCart}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-2xl transition-all hover:scale-105 hover:bg-red-600"
              title="Tout vider"
            >
              <Trash2 size={24} />
            </button>
          </div>
        )}

        <section
          className="relative h-screen min-h-[700px] overflow-hidden pt-20"
          id="home"
          style={{ backgroundColor: '#191c1e' }}
        >
          <HeroCarousel />
        </section>

        <section className="bg-surface-container-lowest py-24 dark:bg-[#1e2224]" id="about">
          <div className="mx-auto grid max-w-max-width grid-cols-1 items-center gap-16 px-margin-mobile md:px-margin-desktop lg:grid-cols-2">
            <div className="relative">
              <img
                alt="Solar installers team"
                className="h-[500px] w-full rounded-xl border border-outline-variant object-cover shadow-lg dark:border-[#2d3438]"
                src='/unnamed.jpg'
              />
              <div className="absolute -bottom-6 -right-6 hidden bg-primary-container p-8 text-on-primary shadow-xl md:block" style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}>
                <div className="mb-1 text-4xl font-bold">5+</div>
                <div className="text-sm opacity-80">Années d&apos;expertise</div>
              </div>
            </div>

            <div>
              <h2 className="mb-8 font-headline-lg text-headline-lg text-primary dark:text-white">
                Nous sommes là pour votre confort énergétique.
              </h2>
              <p className="mb-6 font-body-md text-body-md leading-relaxed text-on-surface-variant dark:text-gray-400">
                Leader en solutions d&apos;énergie solaire en République Démocratique du Congo,
                REDPOWER‑DRC transforme l&apos;avenir énergétique de Lubumbashi et ses environs depuis plusieurs années.
                Notre expertise locale combinée à des équipements de dernière génération
                nous permet d&apos;offrir des installations fiables, durables et adaptées au climat congolais
              </p>
              <p className="mb-10 font-body-md text-body-md leading-relaxed text-on-surface-variant dark:text-gray-400">
                Notre mission est d&apos;offrir des systèmes solaires fiables qui répondent
                aux défis climatiques et industriels uniques de notre région.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-secondary" size={28} style={{ color: 'var(--color-secondary, #ff8a65)' }} />
                  <div>
                    <h4 className="font-bold text-primary dark:text-white">Qualité</h4>
                    <p className="text-sm text-on-surface-variant dark:text-gray-400">
                      Matériel certifié internationalement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Headphones className="text-secondary" size={28} style={{ color: 'var(--color-secondary, #ff8a65)' }} />
                  <div>
                    <h4 className="font-bold text-primary dark:text-white">Support Local</h4>
                    <p className="text-sm text-on-surface-variant dark:text-gray-400">
                      Équipe basée à Lubumbashi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-24 dark:bg-[#191c1e]" id="services">
          <div className="mx-auto max-w-max-width px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
                Solutions Énergétiques Complètes
              </h2>
              <p className="mx-auto max-w-2xl text-on-surface-variant dark:text-gray-400">
                Une expertise technique multidisciplinaire pour assurer votre transition
                énergétique en toute sérénité.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-gutter-md md:grid-cols-4">
              <div className="group flex flex-col justify-between rounded-xl border border-outline-variant bg-primary-container p-8 text-on-primary md:col-span-2 dark:border-[#2d3438] dark:bg-[#1e2224]">
                <SunMedium className="mb-8 text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }} size={40} />
                <div>
                  <h3 className="mb-4 font-headline-md text-headline-md dark:text-white">
                    Installation Solaire Industrielle
                  </h3>
                  <p className="mb-6 text-on-primary/70 dark:text-gray-400">
                    Conception et déploiement de parcs solaires haute performance
                    pour les entreprises du secteur minier et industriel.
                  </p>
                  <a className="inline-flex items-center gap-2 font-bold" style={{ color: 'var(--color-secondary, #ff8a65)' }} href="#contact">
                    Explorer
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-outline-variant bg-surface-container-high p-8 dark:border-[#2d3438] dark:bg-[#1e2224]">
                <BatteryCharging className="mb-6 text-primary" style={{ color: 'var(--color-secondary, #ff8a65)' }} size={40} />
                <h3 className="mb-3 font-bold text-primary dark:text-white">Stockage Intelligent</h3>
                <p className="text-sm text-on-surface-variant dark:text-gray-400">
                  Systèmes de batteries lithium pour une autonomie garantie 24/7.
                </p>
              </div>

              <div className="rounded-xl border border-outline-variant bg-surface-container-high p-8 dark:border-[#2d3438] dark:bg-[#1e2224]">
                <Settings2 className="mb-6 text-primary" style={{ color: 'var(--color-secondary, #ff8a65)' }} size={40} />
                <h3 className="mb-3 font-bold text-primary dark:text-white">
                  Onduleurs & Régulateurs
                </h3>
                <p className="text-sm text-on-surface-variant dark:text-gray-400">
                  Gestion électronique avancée pour une stabilité parfaite du courant.
                </p>
              </div>

              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-8 md:col-span-2 dark:border-[#2d3438] dark:bg-[#1e2224]">
                <div className="flex items-center gap-6">
                  <Wrench className="text-primary" style={{ color: 'var(--color-secondary, #ff8a65)' }} size={70} />
                  <div>
                    <h3 className="mb-2 font-headline-md text-headline-md text-primary dark:text-white">
                      Maintenance & Support
                    </h3>
                    <p className="text-on-surface-variant dark:text-gray-400">
                      Surveillance en temps réel et interventions rapides sur site à
                      Lubumbashi pour maximiser le rendement de vos installations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary-container p-8 text-on-secondary-container md:col-span-2" style={{ backgroundColor: 'rgba(255, 138, 101, 0.1)', color: 'var(--color-secondary, #ff8a65)' }}>
                <div>
                  <h3 className="mb-2 font-headline-md text-headline-md">
                    Besoin d&apos;un devis ?
                  </h3>
                  <p className="opacity-90">
                    Nos ingénieurs évaluent vos besoins gratuitement.
                  </p>
                </div>
                <a
                  className="rounded-full px-8 py-3 font-bold text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
                  href="/demander-un-devis"
                >
                  Demander un Devis
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 dark:bg-[#1e2224]" id="products">
          <div className="mx-auto max-w-max-width px-margin-mobile md:px-margin-desktop">
            {/* Section header */}
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-2 font-headline-lg text-headline-lg text-primary dark:text-white">
                  Équipements de Classe Mondiale
                </h2>
                <p className="text-on-surface-variant dark:text-gray-400">
                  Sélection rigoureuse pour les conditions climatiques de la RDC.
                </p>
              </div>
              <a
                className="flex items-center gap-2 font-bold transition-colors hover:underline"
                style={{ color: 'var(--color-secondary, #ff8a65)' }}
                href="/nos-produits"
              >
                Voir tout le catalogue
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Carousel */}
            <HomeProductCarousel products={displayProducts} />
          </div>
        </section>

        <section className="bg-primary py-20 text-on-primary dark:bg-[#191c1e]" id="values">
          <div className="mx-auto flex max-w-max-width flex-col items-center gap-16 px-margin-mobile md:flex-row md:px-margin-desktop">
            <div className="md:w-1/2">
              <h2 className="mb-6 font-headline-lg text-headline-lg text-white">
                Électrifier l&apos;avenir de la RDC.
              </h2>
              <p className="mb-8 font-body-lg text-body-lg leading-relaxed text-white/80">
                Basée au cœur de Lubumbashi, notre entreprise s&apos;appuie sur quatre
                piliers fondamentaux pour garantir le succès de vos projets énergétiques.
              </p>
              <ul className="space-y-4">
                {values.map((value) => (
                  <li className="flex items-center gap-4 text-white/90" key={value}>
                    <CheckCircle2 className="text-secondary" size={20} style={{ color: 'var(--color-secondary, #ff8a65)' }} />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 md:w-1/2 md:grid-cols-2">
              {[
                ['98%', 'Disponibilite systeme'],
                ['500+', 'Installations reussies'],
                ['24/7', 'Assistance technique'],
                ['25Y', 'Garantie performance'],
              ].map(([value, label]) => (
                <div
                  className="rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
                  key={label}
                >
                  <div className="mb-2 text-4xl font-extrabold" style={{ color: 'var(--color-secondary, #ff8a65)' }}>{value}</div>
                  <p className="text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-highest py-24 dark:bg-[#1e2224]" id="team">
          <div className="mx-auto max-w-max-width px-margin-mobile text-center md:px-margin-desktop">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
              L&apos;Excellence Technique
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-on-surface-variant dark:text-gray-400">
              Une équipe d&apos;ingénieurs et de techniciens passionnés par l&apos;innovation et
              Engagez pour un service client irréprochable.
            </p>
            <div className="grid grid-cols-1 gap-gutter-md md:grid-cols-3">
              {teamValues.map(({ icon: Icon, title, text }) => (
                <div
                  className="rounded-xl border border-outline-variant bg-white p-10 text-center dark:border-[#2d3438] dark:bg-[#252b2e]"
                  key={title}
                >
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-low dark:bg-[#2d3438]">
                    <Icon className={title === 'Innovation' ? 'text-secondary' : 'text-primary'} style={{ color: 'var(--color-secondary, #ff8a65)' }} size={40} />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-primary dark:text-white">{title}</h4>
                  <p className="text-sm text-on-surface-variant dark:text-gray-400">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest py-24 dark:bg-[#191c1e]" id="faq">
          <div className="mx-auto max-w-max-width px-margin-mobile md:px-margin-desktop">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
                Questions Fréquentes
              </h2>
              <p className="text-on-surface-variant dark:text-gray-400">
                Tout ce que vous devez savoir sur le solaire en RDC.
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <div
                  className="rounded-xl border border-outline-variant p-6 transition-colors hover:bg-surface-container-low dark:border-[#2d3438] dark:hover:bg-[#1e2224]"
                  key={faq.question}
                >
                  <h4 className="flex items-center justify-between font-bold text-primary dark:text-white">
                    {faq.question}
                  </h4>
                  <p className="mt-4 text-on-surface-variant dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-24 dark:bg-[#1e2224]" id="contact">
          <div className="mx-auto grid max-w-max-width grid-cols-1 gap-16 px-margin-mobile md:px-margin-desktop lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
                Discuter avec nos experts pour plus d&apos;informations.
              </h2>
              <p className="mb-10 text-on-surface-variant dark:text-gray-400">
                Prêt à passer à l&apos;énergie solaire ? Notre équipe est à votre disposition pour toute question ou demande de devis.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary dark:text-white">
                      Nom Complet
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-3 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-[#252b2e] dark:text-white dark:focus:border-orange-500"
                      placeholder="Votre nom"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary dark:text-white">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-3 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-[#252b2e] dark:text-white dark:focus:border-orange-500"
                      placeholder="votre@email.com"
                      type="email"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary dark:text-white">
                      Téléphone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-3 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-[#252b2e] dark:text-white dark:focus:border-orange-500"
                      placeholder="Votre numéro de téléphone"
                      type="tel"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary dark:text-white">
                      Type de Projet
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-3 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-[#252b2e] dark:text-white dark:focus:border-orange-500"
                      required
                    >
                      <option>Résidentiel</option>
                      <option>Industriel / Minier</option>
                      <option>Commercial</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-primary dark:text-white">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-3 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-[#252b2e] dark:text-white dark:focus:border-orange-500"
                    placeholder="Décrivez votre besoin..."
                    rows={4}
                    required
                  />
                </div>
                <button
                  className="w-full rounded-full py-4 font-bold text-on-primary transition-all hover:bg-primary-container"
                  style={{ backgroundColor: '#25D366', color: 'white' }}
                  type="submit"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle size={20} />
                    Envoyer la demande via WhatsApp
                  </span>
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-8">
              <div className="relative h-80 overflow-hidden rounded-xl border border-outline-variant dark:border-[#2d3438]">
                <iframe
                  title="REPOWER SARL Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125211.51684345152!2d27.404555891370213!3d-11.669818816789505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19723ec086577579%3A0xc39103c271891008!2sLubumbashi%2C%20Congo-Kinshasa!5e0!3m2!1sfr!2sfr!4v1715942400000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[20%] contrast-110 invert-[0.05] dark:invert-0"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-outline-variant bg-surface-container-high p-6 dark:border-[#2d3438] dark:bg-[#252b2e]">
                  <h5 className="mb-2 font-bold text-primary dark:text-white">Telephone</h5>
                  <p className="font-bold text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }}>{CONTACT_INFO.phone.display}</p>
                </div>
                <div className="rounded-xl border border-outline-variant bg-surface-container-high p-6 dark:border-[#2d3438] dark:bg-[#252b2e]">
                  <h5 className="mb-2 font-bold text-primary dark:text-white">Email Direct</h5>
                  <p className="font-bold text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }}>{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-secondary"
                  style={{ backgroundColor: '#25D366' }}
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.value}?text=${encodeURIComponent('Bonjour, je suis intéressé par vos services d\'installation solaire.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Contacter via WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-secondary"
                  style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
                  href={`mailto:${CONTACT_INFO.email}`}
                >
                  <Mail size={18} />
                </a>
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-secondary"
                  style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
                  href={`tel:${CONTACT_INFO.phone.value}`}
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

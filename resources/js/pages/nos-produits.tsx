import { Head, Link } from '@inertiajs/react'
import {
    ArrowRight,
    BatteryCharging,
    Cable,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Cpu,
    ExternalLink,
    MessageCircle,
    Package,
    Phone,
    Shield,
    ShoppingCart,
    SunMedium,
    Trash2,
    ZapOff,
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { CONTACT_INFO } from '../constants'
import { useCartStore } from '../store/useCartStore'
import { useQuoteStore } from '../store/useQuoteStore'

const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp.value
const DEFAULT_PRODUCT_PHOTO = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60'

// ─── Static product lists ──────────────────────────────────────────────────
const productSections = [
    {
        id: 'panneaux',
        title: 'Panneaux solaires',
        subtitle: 'High efficiency',
        description: 'Modules solaires à haut rendement pour installations résidentielles, commerciales et industrielles.',
        icon: SunMedium,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm5LMoC1FI3Z4kFuPFGHP-V0V7lGW07LANd6W9fexes0heOlhfRjG239mw1_hB-G48c0QJwo-4uza0Hh5KM4ylHFRl9Pk2SsSx56oZdBM7AFX2nV1hW9REpJCCWnQkJDPX1Z35QcUhzhMM36utvFx4lp98muHVVDjmOQ40enoqkB11pD1XCusUsKIRxeJgmUbkzxCKVjDlII9n_358IHLKR8o_xUhzu2nXdHSX0EpAXIFKcf6JCANhjVR1HhZzZEvDAiKDIcwgDCud',
        categoryKeys: ['Panneau solaire'],
    },
    {
        id: 'convertisseurs',
        title: 'Convertisseurs & onduleurs',
        subtitle: 'Performance contrôlée',
        description: 'Solutions hybrides et références Deye pour assurer conversion, régulation et stabilité de votre installation.',
        icon: Cpu,
        image: 'https://tse1.mm.bing.net/th/id/OIP.ya5yv994aLiQZzOl6-ZHJgHaFS?rs=1&pid=ImgDetMain&o=7&rm=3',
        categoryKeys: ['Onduleur hybride'],
    },
    {
        id: 'batteries',
        title: "Stockage d'énergie",
        subtitle: 'Lithium & gel',
        description: 'Batteries de stockage pour autonomie domestique, commerciale et solutions rack de forte capacité.',
        icon: BatteryCharging,
        image: 'https://image.made-in-china.com/2f0j00bnJkciHtZrqR/Greensun-Touch-Screen-Battery-Backup-20kw-540kw-LiFePO4-Home-Energy-Storage-Battery.jpg',
        categoryKeys: ['Stockage energie'],
    },
    {
        id: 'cables',
        title: 'Câblages & connectique',
        subtitle: 'Distribution propre',
        description: 'Câles solaires, VTMB, VOB et flexibles pour des installations nettes, fiables et bien dimensionnées.',
        icon: Cable,
        image: 'https://tse2.mm.bing.net/th/id/OIP.6B_VTz8sybh4oswRSlyECAHaD-?w=800&h=430&rs=1&pid=ImgDetMain&o=7&rm=3',
        categoryKeys: ['Cables'],
    },
    {
        id: 'protection',
        title: 'Protection & tableaux',
        subtitle: 'Sécurité système',
        description: 'Disjoncteurs, parafoudres, tableaux divisionnaires et contrôle de protection pour systèmes durables.',
        icon: Shield,
        image: 'https://tse2.mm.bing.net/th/id/OIP.S3YgqEXZQysgRkRVneTLlgHaDa?rs=1&pid=ImgDetMain&o=7&rm=3',
        categoryKeys: ['Protection', 'Protections', 'Protection & tableaux'],
    },
]

// ─── Types ────────────────────────────────────────────────────────────────
interface DbProduct {
    id?: number
    title: string
    category?: string
    description?: string
    price_usd?: number
    price_cdf?: number
    photos?: string[]
    active?: boolean
}

interface ProductsPageProps {
    products?: DbProduct[]
}

type ProductSection = (typeof productSections)[0]

const normalizeCategory = (category?: string | null) => (category || '').trim().toLowerCase()

const getDisplayCategory = (product: DbProduct) => product.category?.trim() || 'Produit'

const categoryToId = (category: string) => {
    const slug = category
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return slug || 'produit'
}

// ─── ProductCard ──────────────────────────────────────────────────────────
function ProductCard({
    product,
    sectionTitle,
    sectionIcon: SectionIcon,
}: {
    product: DbProduct
    sectionTitle: string
    sectionIcon: React.ElementType
}) {
    const { addItem } = useCartStore()
    const name = product.title
    const desc = product.description
    const priceUsd = product.price_usd
    const priceCdf = product.price_cdf

    const getPhotosArray = (photos: any): string[] => {
        if (Array.isArray(photos)) {
            return photos;
        }

        if (typeof photos === 'string') {
            try {
                const parsed = JSON.parse(photos);

                if (Array.isArray(parsed)) {
                    return parsed;
                }

                return [photos];
            } catch (e) {
                if (photos.trim().startsWith('http')) {
                    return [photos];
                }

                return [];
            }
        }

        return [];
    }

    const photosList = getPhotosArray(product.photos)
    const photo = photosList.length > 0 ? photosList[0] : DEFAULT_PRODUCT_PHOTO
    const productId = product.id

    const handleBuy = () => {
        addItem({
            id: productId,
            name,
            category: product.category || sectionTitle,
            price_usd: priceUsd,
            price_cdf: priceCdf,
            photo,
        })
    }

    return (
        <div className="flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-outline dark:bg-[#1e2224]">
            {/* Image zone */}
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-surface-container dark:bg-[#252b2e]">
                {photo ? (
                    <img
                        alt={name}
                        src={photo}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 opacity-30">
                        <SectionIcon size={48} className="text-primary dark:text-white" />
                    </div>
                )}
                {(priceUsd || priceCdf) && (
                    <div className="absolute top-3 right-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white shadow">
                        {priceUsd ? `$${priceUsd}` : `${priceCdf} CDF`}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex-1">
                    <h4 className="text-sm font-bold leading-snug text-primary dark:text-white line-clamp-2">
                        {name}
                    </h4>
                    {desc && (
                        <p className="mt-1 text-xs text-on-surface-variant dark:text-gray-400 line-clamp-2">
                            {desc}
                        </p>
                    )}
                    {(priceUsd || priceCdf) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {priceUsd && (
                                <span className="text-xs font-semibold text-secondary">
                                    {priceUsd} USD
                                </span>
                            )}
                            {priceCdf && (
                                <span className="text-xs font-semibold text-secondary">
                                    {priceCdf} CDF
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                    {/* Row 1 : Acheter + Voir Détails */}
                    <div className="flex gap-1.5">
                        <button
                            onClick={handleBuy}
                            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-green-600 px-2 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-green-700 active:scale-95"
                        >
                            <MessageCircle size={12} />
                            Acheter
                        </button>

                        {productId ? (
                            <Link
                                href={`/produit/${productId}`}
                                className="flex flex-1 items-center justify-center gap-1 rounded-full bg-secondary px-2 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-secondary/80 active:scale-95"
                            >
                                <ExternalLink size={12} />
                                Voir détails
                            </Link>
                        ) : (
                            <button
                                onClick={handleBuy}
                                className="flex flex-1 items-center justify-center gap-1 rounded-full border border-secondary px-2 py-1.5 text-[11px] font-bold text-secondary transition-all hover:bg-secondary hover:text-white active:scale-95 dark:text-secondary"
                            >
                                <ExternalLink size={12} />
                                Voir détails
                            </button>
                        )}
                    </div>

                    {/* Row 2 : Devis */}
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
    )
}

// ─── SectionCarousel ──────────────────────────────────────────────────────
function SectionCarousel({
    section,
    products,
}: {
    section: ProductSection
    products: DbProduct[]
}) {
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

    const SectionIcon = section.icon

    return (
        <section className="mb-16" id={section.id}>
            {/* Section Header */}
            <div className="mb-6 flex items-center gap-3 border-b border-outline-variant pb-4 dark:border-outline">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 dark:bg-secondary/20">
                    <SectionIcon className="text-secondary" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h2 className="font-headline-md text-headline-md uppercase tracking-tight text-primary dark:text-white">
                            {section.title}
                        </h2>
                        <span className="hidden text-xs font-semibold uppercase tracking-widest text-secondary sm:inline-block">
                            — {section.subtitle}
                        </span>
                    </div>
                    <p className="mt-0.5 text-xs text-on-surface-variant dark:text-gray-400 line-clamp-1">
                        {section.description}
                    </p>
                </div>
                {/* Small thumbnail aligned with title */}
                <div className="hidden sm:block shrink-0">
                    <img
                        src={section.image}
                        alt={section.title}
                        className="h-14 w-14 rounded-xl border border-outline-variant object-cover shadow-sm dark:border-outline"
                    />
                </div>
            </div>

            {/* Carousel wrapper */}
            <div className="relative">
                {/* Left arrow */}
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    aria-label="Précédent"
                    className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant bg-white shadow-md transition-all hover:border-secondary hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-30 dark:border-outline dark:bg-[#1e2224] dark:text-white"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Scrollable track */}
                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.length > 0 ? (
                        products.map((product, i) => (
                            <ProductCard
                                key={product.id || `${section.id}-${i}`}
                                product={product}
                                sectionTitle={section.title}
                                sectionIcon={section.icon}
                            />
                        ))
                    ) : (
                        <div className="flex min-h-44 w-full items-center justify-center rounded-2xl border border-dashed border-outline-variant bg-white p-8 text-center dark:border-outline dark:bg-[#1e2224]">
                            <div>
                                <SectionIcon className="mx-auto mb-3 text-secondary" size={34} />
                                <p className="font-semibold text-primary dark:text-white">
                                    Aucun produit actif dans cette section.
                                </p>
                                <p className="mt-1 text-sm text-on-surface-variant dark:text-gray-400">
                                    Les produits ajoutes depuis le tableau de bord apparaitront ici.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    aria-label="Suivant"
                    className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant bg-white shadow-md transition-all hover:border-secondary hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-30 dark:border-outline dark:bg-[#1e2224] dark:text-white"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Product count badge */}
            <p className="mt-2 text-xs text-on-surface-variant dark:text-gray-500">
                {products.length} référence{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
            </p>
        </section>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────
function ProductsPage({ products: dbProducts = [] }: ProductsPageProps) {
    const { items, clearCart } = useQuoteStore()

    const activeProducts = dbProducts.filter((product) => product.active !== false)
    const dbProductsByCategory: Record<string, { label: string; products: DbProduct[] }> = {}

    activeProducts.forEach((product) => {
        const label = getDisplayCategory(product)
        const key = normalizeCategory(label)

        if (!dbProductsByCategory[key]) {
            dbProductsByCategory[key] = { label, products: [] }
        }

        dbProductsByCategory[key].products.push(product)
    })

    const knownCategoryKeys = new Set(
        productSections.flatMap((section) => section.categoryKeys.map((category) => normalizeCategory(category))),
    )

    const dynamicSections: ProductSection[] = Object.values(dbProductsByCategory)
        .filter(({ label }) => !knownCategoryKeys.has(normalizeCategory(label)))
        .map(({ label }) => ({
            id: `categorie-${categoryToId(label)}`,
            title: label,
            subtitle: 'Catalogue',
            description: `Produits disponibles dans la categorie ${label}.`,
            icon: Package,
            image: DEFAULT_PRODUCT_PHOTO,
            categoryKeys: [label],
        }))

    const allSections = [...productSections, ...dynamicSections]

    const getSectionProducts = (section: ProductSection): DbProduct[] => {
        const sectionKeys = section.categoryKeys.map((category) => normalizeCategory(category))

        return sectionKeys.flatMap((key) => dbProductsByCategory[key]?.products || [])
    }

    return (
        <>
            <Head title="Nos Produits" />
            <main className="bg-background px-margin-mobile pb-20 pt-40 text-on-background dark:bg-[#191c1e] dark:text-gray-200 md:px-margin-desktop">
                {/* Floating cart */}
                {items.length > 0 && (
                    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2 animate-bounce">
                        <a
                            href="/demander-un-devis"
                            className="flex items-center gap-3 rounded-full bg-secondary px-6 py-4 font-bold text-white shadow-2xl transition-all hover:scale-105"
                        >
                            <ShoppingCart size={24} />
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-secondary">
                                {items.length}
                            </span>
                            Demander mon devis
                        </a>
                        <button
                            onClick={clearCart}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-2xl transition-all hover:scale-105 hover:bg-red-500"
                            title="Tout vider"
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                )}

                <div className="mx-auto max-w-max-width">
                    {/* Page header */}
                    <header className="mb-14">
                        <h1 className="mb-4 font-headline-xl text-headline-xl text-primary dark:text-white">
                            Catalogue de Solutions Énergétiques
                        </h1>
                        <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant dark:text-gray-400">
                            L&apos;excellence technique au service de votre autonomie. Découvrez notre
                            sélection d&apos;équipements solaires, batteries, convertisseurs, câbles et
                            protections pour vos projets résidentiels et industriels.
                        </p>
                        {/* Quick nav pills */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {allSections.map((s) => (
                                <Link
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="flex items-center gap-1.5 rounded-full border border-outline-variant px-3 py-1 text-xs font-semibold text-primary transition-all hover:border-secondary hover:bg-secondary hover:text-white dark:border-outline dark:text-white"
                                >
                                    <s.icon size={12} />
                                    {s.title}
                                </Link> 
                            ))}
                        </div>
                    </header>

                    {/* Sections as carousels */}
                    {allSections.map((section) => (
                        <SectionCarousel
                            key={section.id}
                            section={section}
                            products={getSectionProducts(section)}
                        />
                    ))}

                    {/* CTA Banner */}
                    <section className="mb-20 rounded-2xl bg-gradient-to-r from-primary via-primary to-secondary p-10 text-center text-white md:p-12">
                        <div className="mx-auto max-w-3xl">
                            <ZapOff className="mx-auto mb-4 opacity-60" size={40} />
                            <h2 className="mb-4 font-headline-xl text-headline-xl">
                                Besoin d&apos;un système complet ?
                            </h2>
                            <p className="mb-8 font-body-lg text-body-lg text-white/80">
                                Nos ingénieurs dimensionnent votre installation complète : panneaux,
                                convertisseurs, batteries, câbles et protections — adaptés à vos appareils
                                et votre consommation réelle.
                            </p>
                            <Link
                                className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-primary transition-all hover:bg-secondary hover:text-white"
                                href="/demander-un-devis"
                            >
                                Calculer mon installation
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </section>

                    {/* Contact section */}
                    <section
                        className="grid grid-cols-1 gap-8 rounded-2xl border border-outline-variant bg-surface-container-low p-8 dark:border-outline dark:bg-surface-container md:grid-cols-[1.2fr_0.8fr]"
                        id="contact-catalogue"
                    >
                        <div>
                            <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
                                Répertorions tout et chiffrons proprement
                            </h2>
                            <p className="mb-6 font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant">
                                Envoyez-nous la liste des références qui vous intéressent et nous
                                préparons un devis adapté à votre besoin, avec alternatives si nécessaire.
                            </p>
                            <ul className="space-y-3">
                                {['Prix par référence ou par ensemble', 'Conseils de compatibilité', 'Dimensionnement selon votre installation'].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-secondary" size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm dark:border-outline dark:bg-[#191c1e]/90">
                            <h3 className="mb-3 font-headline-md text-headline-md text-primary dark:text-white">
                                Devis rapide
                            </h3>
                            <p className="mb-5 text-on-surface-variant dark:text-on-surface-variant">
                                Contactez-nous pour recevoir une proposition détaillée.
                            </p>
                            <div className="space-y-3">
                                <Link className="flex items-center gap-3 text-secondary hover:underline" href={`tel:${CONTACT_INFO.phone.value}`}>
                                    <Phone size={18} />
                                    {CONTACT_INFO.phone.display}
                                </Link>
                                <a
                                    className="flex items-center gap-3 rounded-full bg-secondary px-4 py-2 font-bold text-white transition-all hover:bg-secondary/80"
                                    href="/demander-un-devis"
                                >
                                    <ShoppingCart size={18} />
                                    Formulaire de devis
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default ProductsPage

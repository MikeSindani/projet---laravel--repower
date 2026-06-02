import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { CONTACT_INFO } from '../constants'
import { useCartStore } from '../store/useCartStore'
import { ProductImageModal } from '../components/ProductImageModal'

const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp.value

interface DbProduct {
  id?: number;
  title: string;
  category?: string;
  description?: string;
  price_usd?: number;
  price_cdf?: number;
  photos?: string[];
  active?: boolean;
}

interface ProductDetailProps {
  product: DbProduct;
  relatedProducts?: DbProduct[];
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const { addItem } = useCartStore()
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  
  const handleWhatsAppBuy = () => {
    const message = encodeURIComponent(`Bonjour REPOWER SARL, je souhaite acheter le produit suivant : ${product.title}`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      category: product.category || 'Produit',
      price_usd: product.price_usd,
      price_cdf: product.price_cdf ? parseInt(product.price_cdf.toString().replace(/\D/g, '')) : undefined,
      photo: primaryImage,
    })
  }

  const getPhotosArray = (photos: any): string[] => {
    if (!photos) {
return [];
}

    if (Array.isArray(photos)) {
return photos;
}

    if (typeof photos === 'string') {
      try {
        const parsed = JSON.parse(photos);

        if (Array.isArray(parsed)) {
return parsed;
}

        if (photos.trim().startsWith('http')) {
return [photos];
}

        return [];
      } catch (e) {
        if (photos.trim && photos.trim().startsWith('http')) {
return [photos];
}

        return [];
      }
    }

    return [];
  }

  const photosList = getPhotosArray(product.photos)
  const primaryImage = photosList.length > 0 ? photosList[0] : undefined

  return (
    <>
      <Head title={product.title} />
      <main className="bg-background pt-40 text-on-background dark:bg-[#191c1e] dark:text-gray-200">
        {/* Header */}
        <div className="border-b border-outline-variant px-margin-mobile py-8 dark:border-outline md:px-margin-desktop">
          <Link
            href="/nos-produits"
            className="mb-6 inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary dark:text-secondary"
          >
            <ArrowLeft size={20} />
            Retour au catalogue
          </Link>
          <h1 className="font-headline-xl text-headline-xl text-primary dark:text-white">
            {product.title}
          </h1>
          <p className="mt-2 text-on-surface-variant dark:text-gray-400">
            {product.category}
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-max-width px-margin-mobile py-24 md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Images Section */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              {primaryImage ? (
                <div 
                  className="relative w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container cursor-pointer transition-all hover:border-secondary dark:border-outline dark:bg-[#252b2e]"
                  onClick={() => {
                    setModalImageIndex(0)
                    setIsModalOpen(true)
                  }}
                >
                  <img
                    alt={product.title}
                    src={primaryImage}
                    className="h-[400px] w-full object-contain p-8"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                    Cliquer pour agrandir
                  </div>
                </div>
              ) : (
                <div className="flex h-[400px] items-center justify-center rounded-xl border border-outline-variant bg-surface-container dark:border-outline dark:bg-[#252b2e]">
                  <p className="text-on-surface-variant dark:text-gray-400">Pas d'image disponible</p>
                </div>
              )}

              {/* Thumbnail Gallery */}
              {photosList && Array.isArray(photosList) && photosList.length > 1 && (
                <div className="flex gap-3">
                  {photosList.slice(0, 4).map((photo, index) => (
                    <button
                      key={index}
                      className="h-24 w-24 overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-secondary"
                      onClick={() => {
                        setModalImageIndex(index)
                        setIsModalOpen(true)
                      }}
                    >
                      <img
                        alt={`${product.title} - Image ${index + 1}`}
                        src={photo}
                        className="h-full w-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-8">
              {/* Description */}
              <div>
                <h2 className="mb-4 font-headline-lg text-headline-lg text-primary dark:text-white">
                  Description
                </h2>
                <p className="leading-relaxed text-on-surface-variant dark:text-gray-400">
                  {product.description || 'Aucune description disponible pour ce produit.'}
                </p>
              </div>

              {/* Pricing */}
              {(product.price_usd || product.price_cdf) && (
                <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6 dark:border-outline dark:bg-[#252b2e]">
                  <h3 className="mb-4 font-headline-md text-headline-md text-primary dark:text-white">
                    Tarification
                  </h3>
                  <div className="space-y-3">
                    {product.price_usd && (
                      <div className="flex items-center justify-between">
                        <span className="text-on-surface-variant dark:text-gray-400">En dollars (USD)</span>
                        <span className="font-headline-md text-headline-md font-bold text-secondary dark:text-secondary">
                          ${product.price_usd}
                        </span>
                      </div>
                    )}
                    {product.price_cdf && (
                      <div className="flex items-center justify-between">
                        <span className="text-on-surface-variant dark:text-gray-400">En francs congolais (CDF)</span>
                        <span className="font-headline-md text-headline-md font-bold text-secondary dark:text-secondary">
                          {product.price_cdf} CDF
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Category Badge */}
              {product.category && (
                <div>
                  <span className="inline-block rounded-full bg-secondary/10 px-4 py-2 font-label-md text-label-md text-secondary dark:bg-secondary/20 dark:text-secondary">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-4 font-bold text-white transition-all hover:bg-secondary-600"
                >
                  <ShoppingCart size={20} />
                  Ajouter aux achats
                </button>

                <button
                  onClick={handleWhatsAppBuy}
                  className="flex items-center justify-center gap-2 rounded-lg border border-secondary px-6 py-4 font-bold text-secondary transition-all hover:bg-secondary hover:text-white dark:border-secondary dark:text-secondary"
                >
                  <MessageCircle size={20} />
                  Acheter sur direct WhatsApp
                </button>

                <Link
                  href="/demander-un-devis"
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-6 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-white dark:bg-primary/20 dark:text-white"
                >
                  Demander un devis complet
                </Link>
              </div>

              {/* Info Box */}
              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 dark:border-outline dark:bg-[#252b2e]">
                <h3 className="mb-2 font-bold text-primary dark:text-white">Information</h3>
                <p className="text-sm text-on-surface-variant dark:text-gray-400">
                  Tous les produits REPOWER SARL sont certifiés et garantis pour une qualité optimale. Contactez-nous pour plus de détails techniques ou une assistance personnalisée.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts && relatedProducts.length > 0 ? (
            <div className="mt-20 border-t border-outline-variant pt-12 dark:border-outline">
              <h2 className="mb-6 font-headline-lg text-headline-lg text-primary dark:text-white">
                Produits similaires
              </h2>
              <div className="flex gap-4 items-center">
                {/* Carousel Navigation */}
                <button
                  onClick={() => {
                    const itemsPerPage = 3
                    const maxIndex = Math.max(0, Math.ceil(relatedProducts.length / itemsPerPage) - 1)
                    setCarouselIndex(carouselIndex === 0 ? maxIndex : carouselIndex - 1)
                  }}
                  className="flex-shrink-0 p-2 rounded-full border border-outline-variant bg-surface-container hover:bg-primary hover:text-white hover:border-primary transition-all dark:border-outline dark:bg-[#252b2e] dark:hover:bg-primary"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Products Grid */}
                <div className="flex-1 overflow-hidden">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {relatedProducts
                      .slice(carouselIndex * 3, (carouselIndex + 1) * 3)
                      .map((relProduct) => (
                        <div
                          key={relProduct.id}
                          className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-low p-4 transition-all hover:shadow-lg dark:border-outline dark:bg-[#252b2e]"
                        >
                          {/* Image */}
                          {(() => {
                            const photos = getPhotosArray(relProduct.photos)

                            return photos.length > 0 ? (
                              <div className="relative w-full h-32 overflow-hidden rounded-lg bg-surface-container mb-3 dark:bg-[#1e2224]">
                                <img
                                  src={photos[0]}
                                  alt={relProduct.title}
                                  className="w-full h-full object-contain p-2"
                                />
                              </div>
                            ) : (
                              <div className="relative w-full h-32 overflow-hidden rounded-lg bg-surface-container mb-3 dark:bg-[#1e2224] flex items-center justify-center">
                                <p className="text-xs text-on-surface-variant dark:text-gray-400">Pas d'image</p>
                              </div>
                            )
                          })()}

                          {/* Content */}
                          <Link href={`/produit/${relProduct.id}`} className="hover:text-secondary transition-colors">
                            <h3 className="font-bold text-sm text-primary dark:text-white line-clamp-2">
                              {relProduct.title}
                            </h3>
                          </Link>
                          <p className="text-xs text-on-surface-variant dark:text-gray-400 mt-1 line-clamp-2">
                            {relProduct.description || relProduct.category}
                          </p>

                          {/* Pricing */}
                          <div className="mt-3 flex flex-col gap-1">
                            {relProduct.price_usd && (
                              <span className="font-bold text-sm text-secondary dark:text-secondary">
                                ${relProduct.price_usd}
                              </span>
                            )}
                            {relProduct.price_cdf && (
                              <span className="text-xs text-on-surface-variant dark:text-gray-400">
                                {relProduct.price_cdf} CDF
                              </span>
                            )}
                          </div>

                          {/* Buttons */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Link
                              href={`/produit/${relProduct.id}`}
                              className="flex-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-secondary-600 text-center"
                            >
                              Voir plus
                            </Link>
                            <button
                              onClick={() => addItem({ 
                                id: relProduct.id,
                                name: relProduct.title, 
                                category: relProduct.category || 'Produit',
                                price_usd: relProduct.price_usd,
                                price_cdf: relProduct.price_cdf ? parseInt(relProduct.price_cdf.toString().replace(/\D/g, '')) : undefined,
                                photo: getPhotosArray(relProduct.photos)[0]
                              })}
                              className="flex-1 rounded-full bg-primary-container px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-secondary dark:bg-[#1e2224]"
                            >
                               Acheter
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Carousel Navigation */}
                <button
                  onClick={() => {
                    const itemsPerPage = 3
                    const maxIndex = Math.max(0, Math.ceil(relatedProducts.length / itemsPerPage) - 1)
                    setCarouselIndex(carouselIndex === maxIndex ? 0 : carouselIndex + 1)
                  }}
                  className="flex-shrink-0 p-2 rounded-full border border-outline-variant bg-surface-container hover:bg-primary hover:text-white hover:border-primary transition-all dark:border-outline dark:bg-[#252b2e] dark:hover:bg-primary"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-20 border-t border-outline-variant pt-12 dark:border-outline">
              <h2 className="mb-6 font-headline-lg text-headline-lg text-primary dark:text-white">
                Besoin d'autres produits ?
              </h2>
              <p className="mb-8 text-on-surface-variant dark:text-gray-400">
                Parcourez notre catalogue complet de solutions solaires adaptées à vos besoins.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/nos-produits"
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-bold text-white transition-all hover:bg-secondary-600"
                >
                  Voir tous les produits
                </Link>
                <Link
                  href="/nos-services"
                  className="inline-flex items-center gap-2 rounded-lg border border-secondary px-6 py-3 font-bold text-secondary transition-all hover:bg-secondary hover:text-white dark:border-secondary"
                >
                  Consulter nos services
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Product Image Modal */}
        <ProductImageModal
          images={photosList}
          initialIndex={modalImageIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productTitle={product.title}
        />
      </main>
    </>
  )
}

import { useCartStore } from '../store/useCartStore'
import { ShoppingCart, Trash2, Plus, Minus, Send, X } from 'lucide-react'
import { useState } from 'react'
import { CONTACT_INFO } from '../constants'

const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp.value

export default function FloatingPurchaseCart() {
  const { items, addItem, removeItem, clearCart, totalUsd, totalCdf } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) return null

  const handleCheckout = () => {
    const itemsList = items
      .map((item) => {
        const priceDetail = item.price_usd
          ? `$${item.price_usd}`
          : item.price_cdf
          ? `${item.price_cdf} CDF`
          : 'Prix sur demande'
        return `- ${item.quantity}x ${item.name} (${priceDetail} / unité)`
      })
      .join('\n')

    const totalCostStr =
      (totalUsd() > 0 ? `*Total USD :* $${totalUsd().toFixed(2)}\n` : '') +
      (totalCdf() > 0 ? `*Total CDF :* ${totalCdf().toLocaleString()} CDF\n` : '')

    const message = encodeURIComponent(
      `*NOUVELLE COMMANDE - REPOWER SARL*\n\n` +
        `Bonjour, je souhaite acheter les produits suivants :\n` +
        `${itemsList}\n\n` +
        `*COÛT TOTAL ESTIMÉ :*\n` +
        `${totalCostStr || 'Prix sur demande'}\n` +
        `Merci de me contacter pour finaliser l'achat.`
    )

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center gap-1 rounded-full bg-green-600 p-4 text-white shadow-2xl transition-all hover:scale-110 hover:bg-green-700 animate-pulse active:scale-95"
        >
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
            {totalUsd() > 0 ? `$${totalUsd().toFixed(0)}` : 'Panier'}
          </span>
        </button>
      )}

      {/* Cart Drawer/Modal (Glassmorphic design) */}
      {isOpen && (
        <div className="w-80 rounded-2xl border border-outline-variant bg-white/95 p-5 shadow-2xl backdrop-blur dark:border-[#2d3438] dark:bg-[#1e2224]/95 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-3 dark:border-[#2d3438]">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-white flex items-center gap-2">
              <ShoppingCart size={20} className="text-green-600" />
              Votre Commande
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-on-surface-variant hover:bg-surface-container dark:hover:bg-[#252b2e]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-container-lowest p-2.5 dark:border-[#2d3438] dark:bg-[#252b2e]"
              >
                <div className="flex-1 min-w-0 mr-2">
                  <p className="font-bold text-xs text-primary dark:text-gray-100 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-on-surface-variant dark:text-gray-400">
                    {item.price_usd ? `$${item.price_usd}` : item.price_cdf ? `${item.price_cdf} CDF` : 'Prix sur demande'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeItem(item.name)}
                    className="p-1 rounded bg-surface-container hover:bg-surface-container-high dark:bg-[#1e2224]"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addItem(item)}
                    className="p-1 rounded bg-surface-container hover:bg-surface-container-high dark:bg-[#1e2224]"
                  >
                    <Plus size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="mt-4 pt-3 border-t border-outline-variant dark:border-[#2d3438] space-y-2">
            {totalUsd() > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant dark:text-gray-400">Total USD</span>
                <span className="font-bold text-primary dark:text-white">${totalUsd().toFixed(2)}</span>
              </div>
            )}
            {totalCdf() > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant dark:text-gray-400">Total CDF</span>
                <span className="font-bold text-primary dark:text-white">{totalCdf().toLocaleString()} CDF</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            <button
              onClick={clearCart}
              title="Vider le panier"
              className="col-span-1 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors dark:bg-red-950/20 dark:text-red-400"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={handleCheckout}
              className="col-span-4 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 px-3 text-xs font-bold text-white hover:bg-green-700 transition-colors active:scale-95 shadow"
            >
              <Send size={14} />
              Terminer l'achat (WhatsApp)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

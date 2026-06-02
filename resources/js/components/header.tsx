import { Link, usePage } from '@inertiajs/react'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
//import image from '../../public/logo192.png'
import { CONTACT_INFO } from '../constants'
import { useQuoteStore } from '../store/useQuoteStore'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Services', href: '/nos-services' },
  { label: 'Produits', href: '/nos-produits' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { url } = usePage()
  const { auth } = usePage().props

  const cleanPath = url === '/' ? '/' : url.replace(/\/$/, '')
  const isHeroPage = ['/', '/about', '/nos-services'].includes(cleanPath)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const closeMobileMenu = () => setIsMenuOpen(false)

  const isActivePath = (href: string) => {
    const pathname = href.split('#')[0] || '/'

    return url === pathname
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 py-2 shadow-lg backdrop-blur-md dark:bg-[#191c1e]/90'
          : 'bg-transparent py-4'
      }`}
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      <div className="mx-auto grid w-full grid-cols-3 items-center px-4 md:px-16 lg:flex lg:max-w-7xl lg:justify-between lg:items-center">
        {/* Mobile Left action: Dark Mode Toggle */}
        <div className="flex justify-start lg:hidden">
          <ThemeToggle
            isDarkMode={isDarkMode}
            onClick={() => setIsDarkMode((current) => !current)}
          />
        </div>

        {/* Logo: Centered on mobile, left-aligned on desktop */}
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="transition-transform hover:scale-105"
          >
            <img
              alt="REPOWER SARL Logo"
              className="h-10 object-contain md:h-12"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOTmcKkOo6bvxihBHl2KrvrigWa9031s9nsYNLDw2g_Jk81-G_vU0kJDOVZs7km7j2BA3Cvv5EW2NDJNj2ivxyAyWbsRLLPaVhJJ72Tc43dQ87iE7ChppaddUc63Mhd7a7ciPStvh8WxcJMofqTt4uLPQZCHaR1WJQrI86IBa81KI8-cMn9v1PA-W-DyjdE4erECjTpEicyOKRAV7F0kpp_aKFZwgRa9TYvghYjNXm6nGFx4TL_OcOT_iqAJ8TrHv6-GWlxYwA1a5c"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ label, href }) => {
            const isActive = isActivePath(href)
            let linkColorClass = ''

            if (isActive) {
              linkColorClass = 'bg-secondary text-white font-bold'
            } else if (isDarkMode) {
              linkColorClass = 'text-white hover:bg-white/10 hover:text-white font-medium'
            } else {
              // Light Mode
              if (scrolled) {
                linkColorClass = 'text-gray-900 hover:bg-gray-100 hover:text-gray-900 font-medium'
              } else {
                // Not scrolled
                if (isHeroPage) {
                  linkColorClass = 'text-white hover:bg-white/10 hover:text-white font-medium'
                } else {
                  linkColorClass = 'text-gray-900 hover:bg-black/5 hover:text-gray-900 font-medium'
                }
              }
            }

            return (
              <Link
                className={`rounded-full px-4 py-2 text-sm transition-all ${linkColorClass}`}
                href={href}
                key={label}
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle
            isDarkMode={isDarkMode}
            onClick={() => setIsDarkMode((current) => !current)}
          />
          {auth?.user ? (
            <Link
              href="/dashboard"
              className="inline-block rounded-full px-6 py-2 font-bold text-white transition-all hover:opacity-90 active:scale-95 bg-secondary"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-block rounded-full px-6 py-2 font-bold transition-all hover:opacity-90 text-gray-800 dark:text-white"
              >
                Connexion
              </Link>
            </>
          )}
          <QuoteButton />
        </div>

        {/* Mobile Right action: Hamburger Menu Button */}
        <div className="flex justify-end lg:hidden">
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-800 transition-colors hover:bg-secondary hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-secondary dark:hover:text-white"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? <X size={20} color='currentColor' /> : <Menu color='currentColor' size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[72px] z-40 h-[calc(100vh-72px)] w-full bg-white transition-all duration-300 dark:bg-[#191c1e] lg:hidden ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <div className="flex flex-col gap-2 p-6">
          {navLinks.map(({ label, href }) => (
            <Link
              className={`flex items-center justify-between rounded-xl px-6 py-4 transition-all font-semibold ${
                isActivePath(href)
                  ? 'bg-secondary text-white'
                  : 'text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
              }`}
              href={href}
              key={label}
              onClick={closeMobileMenu}
            >
              <span className="text-base">
                {label}
              </span>
              <ArrowRight size={20} />
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <QuoteButton className="w-full justify-center py-5 text-lg" />
            {!auth?.user && (
              <Link
                href="/login"
                className="w-full text-center rounded-full px-8 py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95 bg-secondary"
              >
                Connexion
              </Link>
            )}
            {auth?.user && (
              <Link
                href="/dashboard"
                className="w-full text-center rounded-full px-8 py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95 bg-secondary"
              >
                Dashboard
              </Link>
            )}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Besoin d'aide ?
              </p>
              <a
                href={`tel:${CONTACT_INFO.phone.value}`}
                className="font-bold text-secondary dark:text-secondary"
              >
                {CONTACT_INFO.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ThemeToggle({
  isDarkMode,
  onClick,
}: {
  isDarkMode: boolean
  onClick: () => void
}) {
  return (
    <button
      aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className={isDarkMode ? 
        `flex h-10 w-10 items-center justify-center rounded-full bg-white text-on-surface transition-all hover:bg-secondary hover:text-white` : 
        `flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface transition-all hover:bg-secondary hover:text-white dark:bg-white dark:text-gray-200 dark:hover:text-white`}
      onClick={onClick}
      type="button"
    >
      {isDarkMode ? (
        <Sun size={20} className="transition-transform hover:rotate-45" />
      ) : (
        <Moon size={20} color='white' className="transition-transform hover:-rotate-12 " />
      )}
    </button>
  )
}

function QuoteButton({ className = '' }: { className?: string }) {
  const { items } = useQuoteStore()

  return (
    <Link
      className={`inline-flex items-center gap-2 rounded-full px-8 py-2.5 font-label-md text-label-md font-bold uppercase tracking-widest text-white transition-all hover:bg-secondary-container hover:shadow-lg active:scale-95 ${className}`}
      style={{ backgroundColor: 'var(--color-secondary, #ff8a65)' }}
      href="/demander-un-devis"
    >
      <span>Demander un devis</span>
      {items.length > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-secondary" style={{ color: 'var(--color-secondary, #ff8a65)' }}>
          {items.length}
        </span>
      )}
      <ArrowRight size={18} />
    </Link>
  )
}


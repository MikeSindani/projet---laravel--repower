import { Link } from '@inertiajs/react'
import {
    ArrowRight,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone
} from 'lucide-react'

import { CONTACT_INFO } from '../constants'

// Icône TikTok personnalisée
const Tiktok = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const productLinks = [
  { href: '/nos-produits#panneaux', label: 'Panneaux Solaires' },
  { href: '/nos-produits#convertisseurs', label: 'Onduleurs & Convertisseurs' },
  { href: '/nos-produits#batteries', label: 'Stockage d\'Énergie' },
  { href: '/nos-produits#protection', label: 'Protections & Câblage' },
]

const serviceLinks = [
  { href: '/nos-services', label: 'Installation Solaire' },
  { href: '/nos-services', label: 'Maintenance & Support' },
  { href: '/nos-services', label: 'Audit Énergétique' },
  { href: '/demander-un-devis', label: 'Demander un Devis' },
]

const companyLinks = [
  { href: '/about', label: 'À Propos de REPOWER SARL' },
  { href: '/nos-services', label: 'Nos Réalisations' },
  { href: '/#contact', label: 'Contactez-nous' },
]

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://tiktok.com', label: 'TikTok', icon: Tiktok },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-max-width px-margin-mobile py-16 md:px-margin-desktop md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <div className="font-headline-md text-headline-lg-mobile font-extrabold tracking-tight">
              REPOWER
            </div>
            <p className="font-body-md text-body-md leading-relaxed text-white/70">
              Expert en solutions solaires durables en République Démocratique du Congo. Nous accompagnons les industries, commerces et particuliers vers l'autonomie énergétique depuis Lubumbashi.
            </p>

            <div className="space-y-4 font-body-md text-body-md text-white/70">
              <a
                className="flex items-center gap-3 transition-colors hover:text-secondary"
                href={`tel:${CONTACT_INFO.phone.value}`}
              >
                <Phone size={18} className="text-secondary" />
                {CONTACT_INFO.phone.display}
              </a>
              <a
                className="flex items-center gap-3 transition-colors hover:text-secondary"
                href={`mailto:${CONTACT_INFO.email}`}
              >
                <Mail size={18} className="text-secondary" />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-secondary" size={18} />
                <span>Lubumbashi, République Démocratique du Congo</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-label-md text-label-md font-bold uppercase tracking-widest text-secondary">
              Nos Produits
            </h3>
            <div className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <Link
                  className="font-body-md text-body-md text-white/70 transition-colors hover:text-white"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-label-md text-label-md font-bold uppercase tracking-widest text-secondary">
              Services & Support
            </h3>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <Link
                  className="font-body-md text-body-md text-white/70 transition-colors hover:text-white"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <h3 className="mt-4 font-label-md text-label-md font-bold uppercase tracking-widest text-secondary">
              Entreprise
            </h3>
            <div className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <Link
                  className="font-body-md text-body-md text-white/70 transition-colors hover:text-white"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-label-md text-label-md font-bold uppercase tracking-widest text-secondary">
              Suivez-nous
            </h3>
            <p className="font-body-md text-body-md text-white/70">
              Rejoignez notre communauté pour découvrir nos projets et conseils en énergie solaire.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-secondary hover:bg-secondary hover:text-white"
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <a
              className="mt-4 inline-flex items-center gap-2 font-label-md text-label-md  font-bold uppercase tracking-widest text-white transition-colors hover:text-white rounded-lg px-3 py-4 bg-secondary"
              href="/demander-un-devis"
            >
              Parler de votre projet
              <ArrowRight size={30} />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 REPOWER SARL. Tous droits réservés. Énergie solaire durable pour la RDC.</p>
          <div className="flex flex-wrap gap-8">
            <a className="transition-colors hover:text-white" href="#">
              Politique de confidentialité
            </a>
            <a className="transition-colors hover:text-white" href="#">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


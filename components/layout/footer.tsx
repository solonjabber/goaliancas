'use client'

import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"
import { useSiteTexts } from "@/hooks/use-site-texts"

export function Footer() {
  const { texts } = useSiteTexts()

  // Verificar se os dados estão carregados
  if (!texts || !texts.footer) {
    return null
  }

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <img
              src="/imagens/logo-transparente-nome.png"
              alt="GO Alianças"
              className="h-[65px] w-auto max-h-full"
            />
            <p className="mt-4 text-sm text-gray-600">
              {texts.footer.companyDescription}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={texts.footer.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gold"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={texts.footer.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gold"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-900">
              {texts.footer.quickLinks.title}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/produtos"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.quickLinks.allProducts}
                </Link>
              </li>
              <li>
                <Link
                  href="/aliancas-de-casamento"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.quickLinks.weddingRings}
                </Link>
              </li>
              <li>
                <Link
                  href="/aneis-de-formatura"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.quickLinks.graduationRings}
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.quickLinks.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-900">
              {texts.footer.customerService.title}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.customerService.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/personalizacao"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.customerService.customization}
                </Link>
              </li>
              <li>
                <Link
                  href="/garantia"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.customerService.warranty}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-gold"
                >
                  {texts.footer.customerService.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-900">
              {texts.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm text-gray-600">
                  {texts.footer.address}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm text-gray-600">
                  {texts.footer.phone}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm text-gray-600">
                  {texts.footer.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} {texts.footer.copyright}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacidade"
                className="text-sm text-gray-600 hover:text-gold"
              >
                {texts.footer.privacyPolicy}
              </Link>
              <Link
                href="/termos"
                className="text-sm text-gray-600 hover:text-gold"
              >
                {texts.footer.termsOfUse}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

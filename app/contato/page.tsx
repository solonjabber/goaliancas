"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2
} from "lucide-react"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the form data to your backend
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", phone: "", email: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const whatsappLink = `https://wa.me/5541991444783?text=${encodeURIComponent(
    "Olá! Gostaria de mais informações sobre as alianças."
  )}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-beige via-white to-mint py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-5xl font-bold text-gray-900 md:text-6xl">
                Entre em Contato
              </h1>
              <p className="mt-6 text-xl text-gray-700">
                Estamos prontos para atender você e transformar seu sonho em realidade
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg hover:border-gold"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-500">
                  <MessageCircle className="h-8 w-8 text-green-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  WhatsApp
                </h3>
                <p className="mt-2 text-gray-600">(41) 99144-4783</p>
                <p className="mt-1 text-sm text-gold">Clique para falar agora</p>
              </a>

              {/* Telefone */}
              <a
                href="tel:+554130451188"
                className="group flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg hover:border-gold"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold">
                  <Phone className="h-8 w-8 text-gold transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  Telefone
                </h3>
                <p className="mt-2 text-gray-600">(41) 3045-1188</p>
                <p className="mt-1 text-sm text-gold">Ligue agora</p>
              </a>

              {/* Email */}
              <a
                href="mailto:goaliancas@gmail.com"
                className="group flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg hover:border-gold"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold">
                  <Mail className="h-8 w-8 text-gold transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  E-mail
                </h3>
                <p className="mt-2 text-sm text-gray-600">goaliancas@gmail.com</p>
                <p className="mt-1 text-sm text-gold">Envie uma mensagem</p>
              </a>

              {/* Horário */}
              <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Clock className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                  Horário
                </h3>
                <p className="mt-2 text-gray-600">Seg - Sáb</p>
                <p className="text-gray-600">9:30 - 18:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form and Info Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-gray-900">
                  Envie sua Mensagem
                </h2>
                <p className="mt-2 text-gray-600">
                  Preencha o formulário abaixo e retornaremos em breve
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                      placeholder="Como podemos ajudar você?"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Mensagem Enviada!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>

                  {isSubmitted && (
                    <div className="rounded-lg bg-green-50 p-4 text-center text-green-800">
                      Obrigado! Entraremos em contato em breve.
                    </div>
                  )}
                </form>
              </div>

              {/* Location and Info */}
              <div className="space-y-8">
                {/* Address */}
                <div>
                  <h2 className="font-heading text-3xl font-bold text-gray-900">
                    Nossa Localização
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Visite nossa loja em Curitiba
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                          <MapPin className="h-6 w-6 text-gold" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Endereço</h3>
                        <p className="mt-1 text-gray-600">
                          Alameda Doutor Muricy, 650<br />
                          Conj. 81, 8º andar<br />
                          Centro, Curitiba-PR
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                          <Clock className="h-6 w-6 text-gold" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                        <p className="mt-1 text-gray-600">
                          Segunda a Sábado: 9:30 às 18:00
                        </p>
                        <p className="mt-2 text-sm text-gold">
                          ⚠️ Atendimento mediante agendamento
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.6784344842347!2d-49.27098!3d-25.4294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce42d3e4fd4b5%3A0x8d8f5e6f5e6f5e6f!2sAlameda%20Doutor%20Muricy%2C%20650%20-%20Centro%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Important Info */}
                <div className="rounded-lg bg-mint p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900">
                    Informações Importantes
                  </h3>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <span>Entrega gratuita em Curitiba e região</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <span>Parcelamento em até 12x sem juros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <span>Retirada em loja mediante agendamento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <span>Personalização e gravação incluídas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="bg-gradient-to-r from-green-500 to-green-600 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-white">
              Prefere Falar pelo WhatsApp?
            </h2>
            <p className="mt-4 text-lg text-green-50">
              Atendimento rápido e personalizado. Clique no botão abaixo!
            </p>
            <div className="mt-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-green-600 shadow-lg transition-all hover:bg-green-50 hover:shadow-xl"
              >
                <MessageCircle className="h-6 w-6" />
                Falar no WhatsApp Agora
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

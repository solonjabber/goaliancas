import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Award, Heart, Shield, Users, Clock, MapPin, Star, Sparkles } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-beige via-white to-mint py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
                <Sparkles className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium text-gold">
                  Desde 1999
                </span>
              </div>

              <h1 className="font-heading text-5xl font-bold text-gray-900 md:text-6xl">
                A GO Alianças
              </h1>

              <p className="mt-6 text-xl text-gray-700">
                25 anos transformando momentos especiais em memórias eternas através de joias de alta qualidade
              </p>
            </div>
          </div>

          {/* Decorative hearts */}
          <div className="absolute left-10 top-10 opacity-10">
            <Heart className="h-24 w-24 text-gold" />
          </div>
          <div className="absolute right-10 bottom-10 opacity-10">
            <Heart className="h-32 w-32 text-gold" />
          </div>
        </div>

        {/* Stats Section */}
        <section className="border-y border-gray-200 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-gold">25+</div>
                <div className="mt-2 text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-gold">5000+</div>
                <div className="mt-2 text-sm text-gray-600">Clientes Atendidos</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-gold">10000+</div>
                <div className="mt-2 text-sm text-gray-600">Joias Criadas</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-gold">100%</div>
                <div className="mt-2 text-sm text-gray-600">Satisfação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                  Nossa História
                </h2>
                <div className="mx-auto mt-4 h-1 w-20 bg-gold"></div>
              </div>

              <div className="mt-12 space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  Fundada há 25 anos em Curitiba-PR, a <strong>GO Alianças</strong> nasceu com o objetivo
                  de se tornar referência no mercado de alianças e anéis de noivado. Desde o início, nosso
                  compromisso sempre foi oferecer produtos de altíssima qualidade, aliados a um atendimento
                  excepcional.
                </p>

                <p>
                  Ao longo de mais de duas décadas, construímos nossa reputação com base em valores
                  fundamentais: <strong>seriedade</strong> e <strong>transparência</strong>. Cada aliança
                  que criamos carrega não apenas ouro 18k da mais alta pureza, mas também o cuidado e a
                  dedicação de uma equipe qualificada e comprometida com a satisfação de nossos clientes.
                </p>

                <p>
                  Nossa missão é fazer com que a experiência de compra de alianças seja
                  <strong> segura</strong> e <strong>confiável</strong>. Entendemos que cada peça que
                  produzimos simboliza um momento único e especial na vida de nossos clientes, e é por
                  isso que tratamos cada projeto com o máximo de atenção e carinho.
                </p>

                <p>
                  Hoje, com milhares de clientes satisfeitos e mais de 10 mil joias criadas, continuamos
                  firmes em nosso propósito: transformar sonhos em realidade através de alianças e joias
                  que atravessam gerações.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Nossos Valores
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 bg-gold"></div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Award className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Qualidade
                </h3>
                <p className="mt-2 text-gray-600">
                  Utilizamos apenas ouro 18k certificado e materiais da mais alta qualidade em todas as nossas peças.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Shield className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Transparência
                </h3>
                <p className="mt-2 text-gray-600">
                  Atuamos com total honestidade e clareza em todas as etapas do processo, do orçamento à entrega.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Heart className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Comprometimento
                </h3>
                <p className="mt-2 text-gray-600">
                  Nossa equipe é dedicada a garantir que cada cliente tenha uma experiência excepcional.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <Users className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-gray-900">
                  Atendimento
                </h3>
                <p className="mt-2 text-gray-600">
                  Oferecemos consultoria personalizada para ajudar você a escolher a joia perfeita.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Diferenciais */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Por Que Escolher a GO Alianças?
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 bg-gold"></div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <Star className="h-6 w-6 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900">
                    Variedade de Modelos
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Oferecemos uma ampla seleção de modelos em diferentes estilos,
                    acabamentos e tipos de ouro para atender todos os gostos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <Award className="h-6 w-6 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900">
                    Investimento Acessível
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Produtos de alta qualidade com preços justos e condições de
                    pagamento facilitadas em até 12x sem juros.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900">
                    Entrega Facilitada
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Entrega segura em Curitiba e região, com opção de retirada
                    em nossa loja mediante agendamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="bg-gradient-to-r from-gold-light to-beige py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                O Que Nossos Clientes Dizem
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 bg-gold"></div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex gap-1 text-gold">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="mt-4 text-gray-700">
                  "Atendimento excepcional! A equipe foi muito atenciosa e nos ajudou
                  a escolher as alianças perfeitas. A qualidade do acabamento é impecável."
                </p>
                <div className="mt-4 font-semibold text-gray-900">Maria & João</div>
                <div className="text-sm text-gray-600">Curitiba, PR</div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex gap-1 text-gold">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="mt-4 text-gray-700">
                  "Entrega rápida e produto exatamente como mostrado. A personalização
                  ficou linda! Recomendo de olhos fechados."
                </p>
                <div className="mt-4 font-semibold text-gray-900">Ana Paula</div>
                <div className="text-sm text-gray-600">São José dos Pinhais, PR</div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex gap-1 text-gold">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="mt-4 text-gray-700">
                  "Serviço personalizado de primeira! Tiraram todas as minhas dúvidas
                  e me ajudaram a criar uma aliança única. Muito satisfeito!"
                </p>
                <div className="mt-4 font-semibold text-gray-900">Ricardo Silva</div>
                <div className="text-sm text-gray-600">Colombo, PR</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-r from-beige to-mint p-12 text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Pronto para Criar Sua Joia dos Sonhos?
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Entre em contato conosco e descubra como podemos ajudar a eternizar seu momento especial
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/contato"
                  className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
                >
                  Falar Conosco
                </a>
                <a
                  href="/produtos"
                  className="inline-flex items-center justify-center rounded-md border-2 border-gold px-8 py-3 font-medium text-gold transition-colors hover:bg-gold hover:text-white"
                >
                  Ver Produtos
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

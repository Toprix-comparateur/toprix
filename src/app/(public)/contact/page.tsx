import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { Mail, MessageSquare, Send } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez l'équipe Toprix pour toute question.",
}

export default function ContactPage() {
  return (
    <div>
      <PageHero
        surtitre="Support"
        titre="Contactez-nous"
        sousTitre="Une question ? Une suggestion ? On vous répond rapidement."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Infos contact */}
          <div className="space-y-4">
            {[
              { icon: Mail, titre: 'Email', valeur: 'contact@toprix.net' },
              { icon: MessageSquare, titre: 'Réponse', valeur: 'Sous 24h' },
            ].map(({ icon: Icon, titre, valeur }) => (
              <div key={titre} className="flex items-start gap-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
                <div className="w-9 h-9 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#F97316]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-0.5">{titre}</p>
                  <p className="font-semibold text-[#0F172A] text-sm">{valeur}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <form className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Sujet</label>
              <input
                type="text"
                name="sujet"
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                placeholder="Objet de votre message"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Message</label>
              <textarea
                name="message"
                rows={5}
                className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors resize-none"
                placeholder="Décrivez votre demande..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <Send size={14} />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

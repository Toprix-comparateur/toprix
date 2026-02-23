import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PageHero from '@/components/ui/PageHero'
import { MessageSquare, Send, CheckCircle } from 'lucide-react'
import { transporter, CONTACT_EMAIL } from '@/lib/mail'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez l'équipe Toprix pour toute question.",
}

async function envoyerContact(formData: FormData) {
  'use server'
  const nom = formData.get('nom')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const sujet = formData.get('sujet')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  if (nom && email && sujet && message) {
    try {
      await transporter.sendMail({
        from: CONTACT_EMAIL,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: sujet,
        text: `Message de ${nom} <${email}> :\n\n${message}`,
      })
    } catch {}
  }
  redirect('/contact?sent=1')
}

interface Props {
  searchParams: Promise<{ sent?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { sent } = await searchParams

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
              { icon: MessageSquare, titre: 'Réponse', valeur: 'Sous 12h' },
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
          <div className="md:col-span-2">
            {sent === '1' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <p className="font-heading text-[#0F172A] text-xl font-semibold mb-1">Message envoyé !</p>
                <p className="text-[#64748B] text-sm">Nous vous répondrons sous 24h.</p>
                <a href="/contact" className="mt-6 text-sm text-[#F97316] font-semibold hover:underline">Envoyer un autre message</a>
              </div>
            ) : (
              <form action={envoyerContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Nom</label>
                    <input type="text" name="nom" required
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                      placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Email</label>
                    <input type="email" name="email" required
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                      placeholder="votre@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Sujet</label>
                  <input type="text" name="sujet" required
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors"
                    placeholder="Objet de votre message" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Message</label>
                  <textarea name="message" rows={5} required
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors resize-none"
                    placeholder="Décrivez votre demande..." />
                </div>
                <button type="submit"
                  className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                  <Send size={14} />
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

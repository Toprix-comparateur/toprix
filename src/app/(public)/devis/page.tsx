import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PageHero from '@/components/ui/PageHero'
import { FileText, Send, CheckCircle, Phone, Mail, Building2, User, Package } from 'lucide-react'
import { transporter, CONTACT_EMAIL } from '@/lib/mail'

export const metadata: Metadata = {
  title: 'Demande de devis | Toprix',
  description: "Demandez un devis personnalisé pour vos achats en gros. Remplissez le formulaire et recevez une réponse sous 24h.",
}

async function envoyerDevis(formData: FormData) {
  'use server'
  const nom       = formData.get('nom')?.toString().trim() ?? ''
  const prenom    = formData.get('prenom')?.toString().trim() ?? ''
  const entreprise= formData.get('entreprise')?.toString().trim() ?? ''
  const tel       = formData.get('tel')?.toString().trim() ?? ''
  const email     = formData.get('email')?.toString().trim() ?? ''
  const produits  = formData.get('produits')?.toString().trim() ?? ''

  if (nom && prenom && email && produits) {
    try {
      await transporter.sendMail({
        from: CONTACT_EMAIL,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Demande de devis — ${prenom} ${nom}${entreprise ? ` (${entreprise})` : ''}`,
        text: [
          `NOUVELLE DEMANDE DE DEVIS`,
          `━━━━━━━━━━━━━━━━━━━━━━━━`,
          `Nom complet : ${prenom} ${nom}`,
          entreprise ? `Entreprise  : ${entreprise}` : '',
          `Téléphone   : ${tel || 'Non renseigné'}`,
          `Email       : ${email}`,
          ``,
          `PRODUITS DEMANDÉS :`,
          `━━━━━━━━━━━━━━━━━━━━━━━━`,
          produits,
        ].filter(Boolean).join('\n'),
      })
    } catch {}
  }
  redirect('/devis?sent=1')
}

interface Props {
  searchParams: Promise<{ sent?: string }>
}

const INPUT = 'w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/20 transition-colors'
const LABEL = 'block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5'

export default async function DevisPage({ searchParams }: Props) {
  const { sent } = await searchParams

  return (
    <div>
      <PageHero
        surtitre="Professionnels & Revendeurs"
        titre="Demander un devis"
        sousTitre="Remplissez le formulaire ci-dessous et recevez votre devis personnalisé sous 24h."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Colonne info */}
          <div className="space-y-4">
            {[
              { icon: FileText,  titre: 'Devis gratuit',   valeur: 'Sans engagement' },
              { icon: Mail,      titre: 'Réponse',         valeur: 'Sous 24h' },
              { icon: Phone,     titre: 'Ou par téléphone',valeur: '+216 XX XXX XXX' },
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

            <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-4 mt-4">
              <p className="text-xs font-semibold text-[#C2410C] uppercase tracking-wide mb-1">Bon à savoir</p>
              <p className="text-sm text-[#7C3AED]/80 text-[#92400E]">
                Précisez la quantité souhaitée pour chaque produit afin d&apos;obtenir un devis plus précis.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="md:col-span-2">
            {sent === '1' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <p className="font-heading text-[#0F172A] text-xl font-semibold mb-1">Devis envoyé !</p>
                <p className="text-[#64748B] text-sm mb-6">Nous vous répondrons sous 24h à l&apos;adresse indiquée.</p>
                <a href="/devis"
                  className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  Nouvelle demande
                </a>
              </div>
            ) : (
              <form action={envoyerDevis} className="space-y-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">

                {/* Nom & Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>
                      <User size={11} className="inline mr-1 opacity-60" />
                      Nom <span className="text-[#F97316]">*</span>
                    </label>
                    <input type="text" name="nom" required className={INPUT} placeholder="Gharbi" />
                  </div>
                  <div>
                    <label className={LABEL}>
                      <User size={11} className="inline mr-1 opacity-60" />
                      Prénom <span className="text-[#F97316]">*</span>
                    </label>
                    <input type="text" name="prenom" required className={INPUT} placeholder="Ghassen" />
                  </div>
                </div>

                {/* Entreprise */}
                <div>
                  <label className={LABEL}>
                    <Building2 size={11} className="inline mr-1 opacity-60" />
                    Nom de l&apos;entreprise
                  </label>
                  <input type="text" name="entreprise" className={INPUT} placeholder="Votre société (optionnel)" />
                </div>

                {/* Téléphone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>
                      <Phone size={11} className="inline mr-1 opacity-60" />
                      Numéro de téléphone
                    </label>
                    <input type="tel" name="tel" className={INPUT} placeholder="+216 XX XXX XXX" />
                  </div>
                  <div>
                    <label className={LABEL}>
                      <Mail size={11} className="inline mr-1 opacity-60" />
                      Email <span className="text-[#F97316]">*</span>
                    </label>
                    <input type="email" name="email" required className={INPUT} placeholder="vous@email.com" />
                  </div>
                </div>

                {/* Liste des produits */}
                <div>
                  <label className={LABEL}>
                    <Package size={11} className="inline mr-1 opacity-60" />
                    Liste des produits <span className="text-[#F97316]">*</span>
                  </label>
                  <textarea
                    name="produits"
                    rows={6}
                    required
                    className={`${INPUT} resize-none`}
                    placeholder={`Exemple :\n- Climatiseur Gree 12000 BTU Inverter × 5\n- Ventilateur sur pied Midea × 10\n- Réfrigérateur Samsung 350L × 2`}
                  />
                  <p className="text-[#94A3B8] text-xs mt-1">Indiquez le nom du produit et la quantité souhaitée.</p>
                </div>

                {/* Bouton */}
                <div className="pt-1">
                  <button type="submit"
                    className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-7 py-3 rounded-xl transition-colors text-sm shadow-sm shadow-[#F97316]/30">
                    <Send size={14} />
                    Envoyer la demande de devis
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

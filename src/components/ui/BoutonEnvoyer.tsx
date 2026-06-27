'use client'

import { useFormStatus } from 'react-dom'
import { Send, Loader2 } from 'lucide-react'

interface Props {
  label?: string
  labelEnvoi?: string
}

export default function BoutonEnvoyer({ label = 'Envoyer', labelEnvoi = 'Envoi en cours…' }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] disabled:bg-[#FDBA74] disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-xl transition-colors text-sm shadow-sm shadow-[#F97316]/30"
    >
      {pending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
      {pending ? labelEnvoi : label}
    </button>
  )
}

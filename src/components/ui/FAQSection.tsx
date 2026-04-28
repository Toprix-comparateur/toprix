import type { FAQ } from '@/lib/faq-data'

interface Props {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: Props) {
  return (
    <section className="mt-10 mb-6">
      <h2 className="font-heading text-[#0F172A] text-lg font-semibold mb-4">Questions fréquentes</h2>
      <div className="space-y-3">
        {faqs.map(({ q, r }) => (
          <div key={q} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-5 py-4">
            <p className="font-semibold text-[#0F172A] text-sm mb-1">{q}</p>
            <p className="text-[#475569] text-sm leading-relaxed">{r}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

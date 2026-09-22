'use client'

import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT } from '@/lib/ads'

interface Props {
  /** data-ad-slot du bloc créé dans la console AdSense. Vide = rien n'est rendu. */
  slot: string
  /** Mention de transparence exigée par les règles AdSense. */
  label?: string
  className?: string
}

export default function AdSlot({ slot, label = 'Publicité', className = '' }: Props) {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    const el = insRef.current
    if (!el) return

    const push = (): boolean => {
      if (pushed.current) return true

      // Un <ins> déjà servi porte data-adsbygoogle-status. Re-pusher dessus lève
      // « All ins elements ... already have ads in them » — cas du double effet
      // en StrictMode et des remontages lors des navigations client.
      if (el.getAttribute('data-adsbygoogle-status')) {
        pushed.current = true
        return true
      }

      // Pousser sur un élément de largeur nulle produit le TagError
      // « No slot size for availableWidth=0 ». On attend une largeur mesurable.
      if (el.offsetWidth === 0) return false

      try {
        const w = window as unknown as { adsbygoogle?: unknown[] }
        w.adsbygoogle = w.adsbygoogle || []
        w.adsbygoogle.push({})
      } catch {
        // AdSense bloqué (adblock) ou script non chargé : inutile de réessayer.
      }
      pushed.current = true
      return true
    }

    if (push()) return

    // Largeur encore nulle au montage : on attend que le conteneur soit mesuré.
    const observer = new ResizeObserver(() => {
      if (push()) observer.disconnect()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!slot) return null

  return (
    <div className={`my-6 ${className}`}>
      <p className="text-[10px] uppercase tracking-widest text-[#94A3B8] mb-1.5">{label}</p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

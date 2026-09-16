'use client'

import { useEffect, useRef, useState } from 'react'
import { CORE_ASSETS, getCached, isCacheWarm, warmAssetCache } from '@/lib/asset-cache'

const MIN_VISIBLE_WARM = 700
const MIN_VISIBLE_COLD = 1100
const MAX_VISIBLE = 6000

export function AppLoader() {
  const [progress, setProgress] = useState(8)
  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)
  const logoRef = useRef<string | undefined>(undefined)

  if (typeof window !== 'undefined' && logoRef.current === undefined) {
    logoRef.current = getCached('/coco-ai.jpg')
  }

  useEffect(() => {
    const start = Date.now()
    const warm = isCacheWarm()
    let cancelled = false

    const tick = setInterval(() => {
      setProgress((p) => (p < 88 ? p + Math.max(1, (92 - p) / 12) : p))
    }, 110)

    const finish = () => {
      if (cancelled) return
      const elapsed = Date.now() - start
      const min = warm ? MIN_VISIBLE_WARM : MIN_VISIBLE_COLD
      const wait = Math.max(0, min - elapsed)
      setTimeout(() => {
        if (cancelled) return
        setProgress(100)
        setHiding(true)
        setTimeout(() => setGone(true), 620)
      }, wait)
    }

    const safety = setTimeout(finish, MAX_VISIBLE)

    void warmAssetCache((ratio) => {
      if (cancelled) return
      setProgress((p) => Math.max(p, Math.round(12 + ratio * 80)))
    })
      .then(finish)
      .catch(finish)

    return () => {
      cancelled = true
      clearInterval(tick)
      clearTimeout(safety)
    }
  }, [])

  useEffect(() => {
    if (gone) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [gone])

  if (gone) return null

  const logo = logoRef.current || '/coco-ai.jpg'

  return (
    <div
      className={`coco-splash${hiding ? ' is-hiding' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Coco AI"
      data-testid="app-loader"
    >
      <div className="coco-splash-glow coco-splash-glow-a" />
      <div className="coco-splash-glow coco-splash-glow-b" />
      <div className="coco-splash-grid" />

      <div className="coco-splash-inner">
        <div className="coco-splash-orb">
          <span className="coco-splash-ring" />
          <span className="coco-splash-ring coco-splash-ring-2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="Coco AI" width={96} height={96} className="coco-splash-logo" />
        </div>

        <div className="coco-splash-copy">
          <p className="coco-splash-title">
            Coco <span>AI</span>
          </p>
          <p className="coco-splash-sub">Booting the autonomous engine</p>
        </div>

        <div className="coco-splash-bar">
          <span style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
        <p className="coco-splash-pct">{Math.min(100, Math.round(progress))}%</p>
      </div>

      {/* keep the artwork in the browser cache from the very first paint */}
      <div className="coco-splash-preload" aria-hidden="true">
        {CORE_ASSETS.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={getCached(src) || src} alt="" width={1} height={1} />
        ))}
      </div>
    </div>
  )
}

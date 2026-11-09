import { useState } from 'react'
import { birthday } from '../config/birthday'
import './GiftUnwrap.css'

type GiftUnwrapProps = {
  unlocked: boolean
}

export function GiftUnwrap({ unlocked }: GiftUnwrapProps) {
  const [opened, setOpened] = useState(false)

  return (
    <section
      className={`gift${unlocked ? ' is-ready' : ''}${opened ? ' is-open' : ''}`}
      id="gift"
      aria-label="Birthday gift"
    >
      <div className="gift-inner">
        <p className="section-kicker">{birthday.giftTitle}</p>
        <h2>{opened ? 'Unwrapped' : 'A gift with no wrapping paper'}</h2>
        <p className="section-sub">
          {unlocked
            ? opened
              ? 'Keep this one.'
              : 'Tap the box. No returns.'
            : 'Blow the candle first — then this unlocks.'}
        </p>

        <button
          type="button"
          className="gift-box"
          onClick={() => unlocked && setOpened(true)}
          disabled={!unlocked || opened}
          aria-label={opened ? 'Gift opened' : 'Open gift'}
        >
          <span className="gift-lid" aria-hidden="true" />
          <span className="gift-body" aria-hidden="true" />
          <span className="gift-bow" aria-hidden="true" />
          {!opened && <span className="gift-glow" aria-hidden="true" />}
        </button>

        <div className={`gift-message${opened ? ' is-visible' : ''}`} role="status">
          <p>{birthday.giftReveal}</p>
          <p className="gift-playlist">{birthday.playlistNote}</p>
        </div>
      </div>
    </section>
  )
}

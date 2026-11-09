import { useEffect, useState } from 'react'
import { birthday, type PhotoItem } from '../config/birthday'
import './PhotoGallery.css'

function PhotoTile({
  photo,
  index,
  onOpen,
}: {
  photo: PhotoItem
  index: number
  onOpen: () => void
}) {
  const hasSrc = Boolean(photo.src?.trim())

  return (
    <button
      type="button"
      className={`photo-tile span-${(index % 5) + 1}`}
      onClick={onOpen}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {hasSrc ? (
        <img src={photo.src} alt={photo.caption} loading="lazy" />
      ) : (
        <div className="photo-placeholder">
          <span>{photo.tag ?? 'Photo'}</span>
          <strong>Add image</strong>
          <small>public/photos/</small>
        </div>
      )}
      <div className="photo-caption">
        {photo.tag && <em>{photo.tag}</em>}
        <p>{photo.caption}</p>
      </div>
    </button>
  )
}

export function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setLive(true), 100)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') {
        setOpenIndex((i) => (i === null ? 0 : (i + 1) % birthday.photos.length))
      }
      if (e.key === 'ArrowLeft') {
        setOpenIndex((i) =>
          i === null ? 0 : (i - 1 + birthday.photos.length) % birthday.photos.length,
        )
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  const active = openIndex !== null ? birthday.photos[openIndex] : null

  return (
    <section className="photos" id="photos" aria-label="Photo gallery">
      <div className="photos-heading">
        <p className="section-kicker">Photo wall</p>
        <h2>All the frames</h2>
        <p className="section-sub">
          Drop photos in <code>public/photos/</code>, then add them in{' '}
          <code>birthday.ts → photos</code>. Tap any frame to open.
        </p>
      </div>

      <div className={`photo-grid${live ? ' is-live' : ''}`}>
        {birthday.photos.map((photo, i) => (
          <PhotoTile key={photo.id} photo={photo} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setOpenIndex(null)}
        >
          <div className="photo-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {active.src?.trim() ? (
              <img src={active.src} alt={active.caption} />
            ) : (
              <div className="photo-placeholder large">
                <strong>No photo yet</strong>
                <small>Set src: &quot;/photos/yourfile.jpg&quot;</small>
              </div>
            )}
            <p>{active.caption}</p>
            <div className="photo-lightbox-nav">
              <button
                type="button"
                onClick={() =>
                  setOpenIndex((openIndex - 1 + birthday.photos.length) % birthday.photos.length)
                }
              >
                Prev
              </button>
              <button type="button" onClick={() => setOpenIndex(null)}>
                Close
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex((openIndex + 1) % birthday.photos.length)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

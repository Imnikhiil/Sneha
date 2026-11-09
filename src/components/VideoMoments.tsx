import { useRef, useState } from 'react'
import { birthday } from '../config/birthday'
import './VideoMoments.css'

export function VideoMoments() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const play = (id: string) => {
    Object.entries(videoRefs.current).forEach(([key, el]) => {
      if (key !== id && el) {
        el.pause()
      }
    })
    const el = videoRefs.current[id]
    if (!el) return
    void el.play()
    setPlayingId(id)
  }

  return (
    <section className="videos" id="videos" aria-label="Video moments">
      <div className="videos-heading">
        <p className="section-kicker">Moving pictures</p>
        <h2>Video moments</h2>
        <p className="section-sub">
          Put clips in <code>public/videos/</code> (mp4/webm), then set{' '}
          <code>src: &quot;/videos/clip.mp4&quot;</code> in config.
        </p>
      </div>

      <div className="video-rail">
        {birthday.videos.map((clip) => {
          const hasSrc = Boolean(clip.src?.trim())
          return (
            <article key={clip.id} className="video-card">
              <div className="video-frame">
                {hasSrc ? (
                  <>
                    <video
                      ref={(el) => {
                        videoRefs.current[clip.id] = el
                      }}
                      src={clip.src}
                      poster={clip.poster || undefined}
                      playsInline
                      controls={playingId === clip.id}
                      onEnded={() => setPlayingId(null)}
                      preload="metadata"
                    />
                    {playingId !== clip.id && (
                      <button
                        type="button"
                        className="video-play"
                        onClick={() => play(clip.id)}
                        aria-label={`Play ${clip.title}`}
                      >
                        Play
                      </button>
                    )}
                  </>
                ) : (
                  <div className="video-empty">
                    <strong>{clip.title}</strong>
                    <span>Add /videos/yourclip.mp4</span>
                  </div>
                )}
              </div>
              <div className="video-meta">
                <h3>{clip.title}</h3>
                <p>{clip.caption}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

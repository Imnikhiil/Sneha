import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AmbientToggle } from './components/AmbientToggle'
import { BalloonField } from './components/BalloonField'
import { BlowCandle } from './components/BlowCandle'
import { ChampagneBurst } from './components/ChampagneBurst'
import { ChapterInterlude } from './components/ChapterInterlude'
import { FloatingPetals } from './components/FloatingPetals'
import { FestiveExtras } from './components/FestiveExtras'
import { FunnyLane } from './components/FunnyLane'
import { GiftUnwrap } from './components/GiftUnwrap'
import { JourneyNav } from './components/JourneyNav'
import { LetterFinale } from './components/LetterFinale'
import { MemoryScroll } from './components/MemoryScroll'
import { NightCountdown } from './components/NightCountdown'
import { PartyRain } from './components/PartyRain'
import { PhotoGallery } from './components/PhotoGallery'
import { QuoteWall } from './components/QuoteWall'
import { ReasonsOrbit } from './components/ReasonsOrbit'
import { SealedLetter } from './components/SealedLetter'
import { SecretVault } from './components/SecretVault'
import { ShootingStars } from './components/ShootingStars'
import { SisterQuiz } from './components/SisterQuiz'
import { SuspenseGate } from './components/SuspenseGate'
import { SparkleCursor } from './components/SparkleCursor'
import { StarlitHero } from './components/StarlitHero'
import { StoryTimeline } from './components/StoryTimeline'
import { VideoMoments } from './components/VideoMoments'
import { WishConstellation } from './components/WishConstellation'
import { birthday } from './config/birthday'
import './styles/app.css'

type Phase = 'sealed' | 'hero' | 'journey'

function App() {
  const [phase, setPhase] = useState<Phase>('sealed')
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [candleBlown, setCandleBlown] = useState(false)
  const [finaleActive, setFinaleActive] = useState(false)
  const [burst, setBurst] = useState(false)
  const [party, setParty] = useState(false)
  const [sealKey, setSealKey] = useState(0)
  const [opened, setOpened] = useState(0)

  const triggerParty = useCallback(() => {
    setParty(true)
    window.setTimeout(() => setParty(false), 2800)
  }, [])

  const onOpened = useCallback(() => {
    setPhase('hero')
    triggerParty()
  }, [triggerParty])

  const onBegin = useCallback(() => {
    setJourneyStarted(true)
    setPhase('journey')
    triggerParty()
    window.requestAnimationFrame(() => {
      document.getElementById('gate-0')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [triggerParty])

  const onBlown = useCallback(() => {
    setCandleBlown(true)
    setBurst(true)
    setFinaleActive(true)
    triggerParty()
    window.setTimeout(() => {
      document.getElementById('gift')?.scrollIntoView({ behavior: 'smooth' })
    }, 500)
    window.setTimeout(() => setBurst(false), 2200)
  }, [triggerParty])

  const onReplay = useCallback(() => {
    setPhase('sealed')
    setJourneyStarted(false)
    setCandleBlown(false)
    setFinaleActive(false)
    setBurst(false)
    setParty(false)
    setSealKey((k) => k + 1)
    setOpened(0)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (phase === 'sealed') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [phase])

  const journeyOpen = journeyStarted || phase === 'journey'
  const nightOn = phase !== 'sealed'
  const total = birthday.suspense.length
  const stages: ReactNode[] = [
    <NightCountdown />,
    <><ChapterInterlude text={birthday.interludes[0]} /><StoryTimeline /></>,
    <><ChapterInterlude text={birthday.interludes[1]} /><PhotoGallery /></>,
    <VideoMoments />,
    <><ChapterInterlude text={birthday.interludes[2]} /><QuoteWall /></>,
    <FunnyLane />,
    <MemoryScroll />,
    <ReasonsOrbit />,
    <><ChapterInterlude text={birthday.interludes[3]} /><SisterQuiz /></>,
    <><ChapterInterlude text={birthday.interludes[4]} /><SecretVault /></>,
    <WishConstellation />,
  ]

  return (
    <div className="app">
      {phase === 'sealed' && <SealedLetter key={sealKey} onOpened={onOpened} />}

      <BalloonField active={nightOn} />
      <FloatingPetals active={nightOn} />
      <FestiveExtras active={nightOn} />
      <ShootingStars active={nightOn} />
      <SparkleCursor active={nightOn} />
      <PartyRain fire={party} />
      <ChampagneBurst fire={burst} />
      <AmbientToggle visible={nightOn} />
      <JourneyNav visible={journeyOpen} refresh={opened} />

      <main className={`app-main${phase === 'sealed' ? ' is-locked' : ''}`}>
        <StarlitHero visible={nightOn} onBegin={onBegin} />

        <div className={`journey${journeyOpen ? ' is-open' : ''}`}>
          {journeyOpen && (
            <>
              {stages.map((node, i) =>
                i <= opened ? (
                  <SuspenseGate
                    key={birthday.suspense[i].id}
                    step={birthday.suspense[i]}
                    index={i}
                    total={total}
                    onUnlock={() => setOpened((o) => Math.max(o, i + 1))}
                  >
                    {node}
                  </SuspenseGate>
                ) : null,
              )}
              {opened >= total && (
                <>
              <BlowCandle onBlown={onBlown} />
              <GiftUnwrap unlocked={candleBlown} />
              <LetterFinale active={finaleActive && candleBlown} onReplay={onReplay} />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
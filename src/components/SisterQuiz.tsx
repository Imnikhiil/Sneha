import { useMemo, useState } from 'react'
import { birthday } from '../config/birthday'
import './SisterQuiz.css'

export function SisterQuiz() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [reaction, setReaction] = useState('')

  const q = birthday.quiz[index]
  const total = birthday.quiz.length

  const rank = useMemo(() => {
    if (score === total) return 'Official best friend'
    if (score >= total - 1) return 'Friend-level telepathy'
    if (score >= 2) return 'You know us pretty well'
    return 'Okay… rematch later'
  }, [score, total])

  const onPick = (optionIndex: number) => {
    if (!q || picked !== null) return
    setPicked(optionIndex)
    const right = optionIndex === q.correctIndex
    if (right) setScore((s) => s + 1)
    setReaction(right ? q.reactionRight : q.reactionWrong)
  }

  const next = () => {
    if (index >= total - 1) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
    setReaction('')
  }

  const restart = () => {
    setIndex(0)
    setScore(0)
    setPicked(null)
    setDone(false)
    setReaction('')
  }

  return (
    <section className="quiz" id="quiz" aria-label="Friendship quiz">
      <div className="quiz-inner">
        <p className="section-kicker">Pop quiz</p>
        <h2>How well do you know us?</h2>
        <p className="section-sub">Four questions. No grades — just bragging rights.</p>

        {!done && q ? (
          <div className="quiz-card">
            <div className="quiz-progress">
              <span>
                {index + 1} / {total}
              </span>
              <div className="quiz-bar">
                <i style={{ width: `${((index + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
              </div>
            </div>

            <h3>{q.prompt}</h3>

            <div className="quiz-options">
              {q.options.map((opt, i) => {
                let state = ''
                if (picked !== null) {
                  if (i === q.correctIndex) state = ' is-right'
                  else if (i === picked) state = ' is-wrong'
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`quiz-option${state}`}
                    onClick={() => onPick(i)}
                    disabled={picked !== null}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {reaction && (
              <div className="quiz-reaction">
                <p>{reaction}</p>
                <button type="button" className="quiz-next" onClick={next}>
                  {index >= total - 1 ? 'See results' : 'Next question'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-result">
            <p className="quiz-score">
              {score}/{total}
            </p>
            <h3>{rank}</h3>
            <p>Either way — you’re still the main character of this night.</p>
            <button type="button" className="quiz-next" onClick={restart}>
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
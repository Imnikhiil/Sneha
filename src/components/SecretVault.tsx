import { useState, type FormEvent } from 'react'
import { birthday } from '../config/birthday'
import './SecretVault.css'

export function SecretVault() {
  const [value, setValue] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const ok = value.trim().toLowerCase() === birthday.secretCode.toLowerCase()
    if (ok) {
      setUnlocked(true)
      setError(false)
      return
    }
    setError(true)
    setShaking(true)
    window.setTimeout(() => setShaking(false), 450)
  }

  return (
    <section className="vault" id="vault" aria-label="Secret vault">
      <div className="vault-inner">
        <p className="section-kicker">Restricted access</p>
        <h2>The vault</h2>
        <p className="section-sub">
          Enter your nickname to unlock a message I almost didn’t write down.
          <span className="vault-hint"> Hint: the nickname people use for you.</span>
        </p>

        {!unlocked ? (
          <form className={`vault-form${shaking ? ' is-shake' : ''}`} onSubmit={submit}>
            <label className="sr-only" htmlFor="vault-code">
              Nickname code
            </label>
            <input
              id="vault-code"
              type="text"
              autoComplete="off"
              placeholder="Nickname…"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setError(false)
              }}
            />
            <button type="submit">Unlock</button>
            {error && <p className="vault-error">Not that one. Try the nickname.</p>}
          </form>
        ) : (
          <div className="vault-open" role="status">
            <div className="vault-seal-broke" aria-hidden="true" />
            <p>{birthday.secretMessage}</p>
          </div>
        )}
      </div>
    </section>
  )
}
import { useEffect, useState } from 'react'
import { Hero } from './Hero'
import { QuizGate } from './QuizGate'
import { LoadingScreen } from './LoadingScreen'
import './App.css'

function App() {
  const [startupLoading, setStartupLoading] = useState(true)
  const [quizComplete, setQuizComplete] = useState(false)
  const [homeLoading, setHomeLoading] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setStartupLoading(false), 7000)
    return () => window.clearTimeout(timer)
  }, [])

  function finishQuiz() {
    setHomeLoading(true)
    window.setTimeout(() => {
      setQuizComplete(true)
      setHomeLoading(false)
    }, 12000)
  }

  return (
    <>
      {startupLoading ? <LoadingScreen mode="startup" /> : homeLoading ? <LoadingScreen mode="transition" /> : !quizComplete ? <QuizGate onComplete={finishQuiz} /> : <BirthdayHome />}
    </>
  )
}

function BirthdayHome() {
  return (
    <main className="birthday-page">
      <Hero />
      <section className="message-section" id="letter">
        <p className="eyebrow">A little note for you</p>
        <h2>You make ordinary days feel like celebrations.</h2>
        <p className="body-copy">Thank you for the laughter, the little adventures, and every soft moment in between. I hope today brings back even a fraction of the joy you bring into my life.</p>
        <p className="signature">With all my love, always</p>
      </section>
      <section className="memories-section" id="memories">
        <div className="section-heading"><p className="eyebrow">Reasons to celebrate</p><h2>Three things I adore about you</h2></div>
        <div className="memory-grid">
          <article className="memory-card"><span>01</span><h3>Your bright heart</h3><p>You make every room warmer just by being in it.</p></article>
          <article className="memory-card"><span>02</span><h3>Your brave spirit</h3><p>You keep choosing growth, wonder, and the next beautiful thing.</p></article>
          <article className="memory-card"><span>03</span><h3>Your beautiful laugh</h3><p>It is still one of my favorite sounds in the world.</p></article>
        </div>
      </section>
      <section className="wish-section" id="wish">
        <p className="eyebrow">Today’s wish</p><h2>May this year be gentle, golden, and completely yours.</h2>
        <div className="wish-mark" aria-hidden="true">✦</div><p>Happy birthday, my love.</p>
      </section>
    </main>
  )
}

export default App

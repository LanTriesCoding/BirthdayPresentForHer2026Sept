import { useEffect, useState } from 'react'
import { Hero } from './Hero'
import { QuizGate } from './QuizGate'
import { LoadingScreen } from './LoadingScreen'
import { MusicPlayer } from './MusicPlayer'
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
      <MusicPlayer />
      {startupLoading ? <LoadingScreen mode="startup" /> : homeLoading ? <LoadingScreen mode="transition" /> : !quizComplete ? <QuizGate onComplete={finishQuiz} /> : <BirthdayHome />}
    </>
  )
}

function BirthdayHome() {
  const visit = Number(sessionStorage.getItem('birthday-visit-count') ?? 1)
  const birthdayWishes = [
    'May you always feel as loved as you make everyone around you feel ><',
    'May this new chapter be full of more opportunities and new wins for a baddie like you!!!',
    'May this year be gentle, golden, and completely yours to own!',
    'May every little dream and wish you make find its swiftest way to you this year~',
    'May this year bring you more laughter, rest, and wonder! :D',
    'There are so many beautiful places waiting for you. And you deserve a year that feels gentle <3',
  ]
  const birthdayWish = birthdayWishes[(visit - 1) % birthdayWishes.length]

  return (
    <main className="birthday-page">
      <Hero />
      <section className="message-section" id="letter">
        <p className="eyebrow">Im glad to be here today, love</p>
        <h2>Thank you for making everyday feel alive and real</h2>
        <p className="body-copy">Ever since the first day I met you as a stranger to this date and time, thank you so much for brightening up my life with laughter and painting it with colors.</p>
        <p className='body-copy'>The more I learn about you and spend more time with you, the more I realize how much more I still dont know about you. Sometimes, thinking about it makes me nervous, but at the same time I want to keep guessing about little details that you do and dont.</p>
        <p className='body-copy'>For example, when you pick your nose or ear, do you check if anyone else is nearby first before you do it? Do you keep a pack of tissues in your bag at all times? Do you prefer this over that and that over this... and a whole LOTS of curious questions...</p>
        <p className='body-copy'>Im sorry if the above paragraph made you jump a little. But really, Im curious about you. And I hope I can grow and learn more about life with you as we grow older and older. Im sticking with you till we see the end, honey baby teddybear~</p>
        <p className='body-copy'>By the way, talking about our current and preferred lifestyles sounds like such a fun topic to explore! As a matter of fact, we should discuss more on it because it helps us reflect what we do and how we go about our day! Im down for it</p>
        <p className='body-copy'>Anyway~~~ Im just excited to be here and to be with you, baby. All the little, silly funny moments that Ive lost count of - inside games and outside games, in our conversations and our phone calls - and every soft and tender moment in between, I hope that this gift today brings back even a fraction of the joy you bring into my life!</p>
        <p className="signature">With my everything, always</p>
      </section>
      <section className="memories-section" id="memories">
        <div className="section-heading"><p className="eyebrow">Thank you for choosing to be together</p><h2>Please talk about yourself more, my lovely person...</h2></div>
        <div className="memory-grid">
          <article className="memory-card"><span>01</span><h3>Your emphatic heart</h3><p>I still remember the talk we had about how you took care of your grandma, or was it your aunt? I think back to it from time to time, and admire your dedication to care-taking, your will to keep pushing despite all the negative things your environment throws at you. It genuinely shines light on how big of a person you are, and I just cant stop admiring that about you. You truly are a gem, one of a kind, and I dont ever want you to forget all the good things youve done so far in your life, baby. Whenever you feel lost in touch with yourself, remember that, because you are you and because of who you choose to be as a person, you will be welcomed anywhere you go. Trust my word on this. And when the environment is unkind and doesnt respond to your kindness, always remind yourself that they arent gonna be here forever - you wont be there forever. Eveyrthing will get better from this birthday onward. I can just tell. So, celebrate proudly and fully on this special day! You are a survivor!</p></article>
          <article className="memory-card"><span>02</span><h3>Your mature spirit</h3><p>I tend to forget that you're the older one in the relationship. But being older doesnt mean you have to shoulder every responsibility on earth. Only the amount that a normal person can handle is healthy! So, when you feel weighted down by the crushing thoughts that are imposed on you by the unhelpful environment, when you feel that being an adult is too much for you, remember that youll always be my BABY first and foremost. And when we are both tired? Hell yeah we will baby each other, lmao giggles and kicks feet. Anyway... I want to say that I respect you from the bottom of my heart - as another person, as a lover, and as someone younger. We are together in this life. And I will never ever grow tired of you! Mwah.</p></article>
          <article className="memory-card"><span>03</span><h3>Your gorgesdiufsoiufsoi smile and laugh... GIGGLES</h3><p>It is easily one of my top 10 favorite sounds in the world, of course the first is gotta be my King Fool's Gold. But we aint here to talk about pixels. Not on a day where you only are the spotlight and my main protragonist on this stage. crine. Anyway, I'm pretty certain that I would've said this during our real-time conversation on this special day, but just in case I forget I'm going to say it here that, I love you... And I love being the reason for your smiles, giggles and laughs. Hope you laugh and giggle a lot on this special day and everyday from here on out!</p></article>
        </div>
      </section>
      <section className="wish-section" id="wish">
        <p className="eyebrow">Today’s wish for my lovely girl~</p><h2>{birthdayWish}</h2>
        <div className="wish-mark" aria-hidden="true">✦</div><p>Best Wishes and Luck, my dear!</p>
      </section>
    </main>
  )
}

export default App

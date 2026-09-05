import { useState } from 'react'

type Question = { prompt: string; options: string[]; answer: number }

const questionSets: Question[][] = [
  [
    { prompt: 'Pick a perfect birthday breakfast.', options: ['Pancakes', 'Fruit and tea', 'Anything with chocolate'], answer: 2 },
    { prompt: 'What makes a day instantly better?', options: ['A long hug', 'A surprise', 'A sunny walk'], answer: 0 },
    { prompt: 'Choose a tiny adventure.', options: ['New café', 'Train ride', 'Bookshop wandering'], answer: 2 },
    { prompt: 'Which superpower would you borrow?', options: ['Flying', 'Time travel', 'Reading minds'], answer: 1 },
    { prompt: 'What should this year hold more of?', options: ['Laughter', 'Rest', 'All of it'], answer: 2 },
  ],
  [
    { prompt: 'Pick a cozy evening.', options: ['Movie night', 'Stargazing', 'Cooking together'], answer: 0 },
    { prompt: 'Your ideal tiny gift is...', options: ['A handwritten note', 'Flowers', 'A favorite snack'], answer: 0 },
    { prompt: 'Choose a weekend mood.', options: ['Slow and soft', 'Out and about', 'A little of both'], answer: 2 },
    { prompt: 'Which word feels most like you?', options: ['Bright', 'Brave', 'Magical'], answer: 2 },
    { prompt: 'Where should we get lost?', options: ['By the sea', 'In a city', 'Among the trees'], answer: 0 },
  ],
  [
    { prompt: 'Choose a birthday color.', options: ['Coral', 'Sage', 'Golden yellow'], answer: 0 },
    { prompt: 'Best kind of surprise?', options: ['A secret plan', 'A thoughtful message', 'A room full of balloons'], answer: 1 },
    { prompt: 'Pick a midnight snack.', options: ['Ice cream', 'Popcorn', 'Cake'], answer: 2 },
    { prompt: 'What deserves a toast?', options: ['New beginnings', 'Small wins', 'Our favorite memories'], answer: 2 },
    { prompt: 'Today, you are allowed to...', options: ['Make a wish', 'Take the day off', 'Do everything joyfully'], answer: 2 },
  ],
  [
    { prompt: 'A perfect playlist starts with...', options: ['A love song', 'A dance song', 'A nostalgic song'], answer: 0 },
    { prompt: 'Pick a place for a date.', options: ['Museum', 'Picnic', 'Late-night drive'], answer: 1 },
    { prompt: 'Which treat wins?', options: ['Strawberries', 'Cupcakes', 'Warm cookies'], answer: 2 },
    { prompt: 'Choose your birthday energy.', options: ['Peaceful', 'Playful', 'Unstoppable'], answer: 1 },
    { prompt: 'What is your best feature?', options: ['Your kindness', 'Your laugh', 'The whole package'], answer: 2 },
  ],
  [
    { prompt: 'Pick a morning view.', options: ['Ocean', 'Mountains', 'A sleepy city'], answer: 0 },
    { prompt: 'Which wish would you make?', options: ['More adventures', 'More calm', 'More time together'], answer: 2 },
    { prompt: 'Choose a happy sound.', options: ['Rain', 'Laughter', 'Music'], answer: 1 },
    { prompt: 'Your birthday crown is made of...', options: ['Wildflowers', 'Stars', 'Sunshine'], answer: 2 },
    { prompt: 'Ready to open your surprise?', options: ['Absolutely', 'Obviously', 'Let’s go!'], answer: 2 },
  ],
]

export function QuizGate({ onComplete }: { onComplete: () => void }) {
  const [visit] = useState(() => {
    const nextVisit = Number(localStorage.getItem('birthday-visit-count') ?? 0) + 1
    localStorage.setItem('birthday-visit-count', String(nextVisit))
    return nextVisit
  })
  const questions = questionSets[(visit - 1) % questionSets.length]
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  function choose(option: number) {
    setSelected(option)
    window.setTimeout(() => {
      if (current === questions.length - 1) onComplete()
      else { setCurrent((value) => value + 1); setSelected(null) }
    }, 280)
  }

  const question = questions[current]
  return (
    <main className="quiz-page">
      <div className="quiz-topline"><span>For you, always</span><span>{String(current + 1).padStart(2, '0')} / 05</span></div>
      <div className="quiz-content">
        <p className="hero-kicker">Welcome back, birthday girl</p>
        <h1>Before you open your surprise...</h1>
        <p className="quiz-prompt">{question.prompt}</p>
        <div className="quiz-options">{question.options.map((option, index) => <button className={selected === index ? 'selected' : ''} type="button" key={option} onClick={() => choose(index)}>{option}<span aria-hidden="true">↗</span></button>)}</div>
        <p className="quiz-footnote">Visit {Math.min(visit, 5)} · A different little set every time</p>
      </div>
    </main>
  )
}
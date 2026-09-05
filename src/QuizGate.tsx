import { useState } from 'react'

type Question = { prompt: string; options: string[]; replies: string[]; answer: number }

const questionSets: Question[][] = [
  [
    { prompt: 'What would you bring to a deserted island if you have to go alone?', options: ['Lan', 'Lannie', 'Obviously, my lovely lover boyfriend, Lannnn'], replies: ['So you picked the OG option... Excellent taste... Now, how would you like to pack me?', 'Soft, sweet, and simple. Enough for a good snack every morning heh.', 'The only strongest, most accurate option out of three. Mwah. I love you, and we will be bulding ships from scratch there.'], answer: 3 },
    { prompt: 'You\'re in a completely dark room with no light and curtains down. Windows closed. And you hear footsteps... What would you do?', options: ['Panic! Scream and shout for help', 'Think about what you did in life to get yourself in this complete dark room', 'Follow the direction of the footsteps and give a big hug!'], replies: ['Baby...? Why are you screaming all of a sudden? It\'s me... We\'re at our own home and it\'s night time... Sweetheart, are you having a nightmare? Come here, let me give you a hug. Mwah, everything\'s okay...  pats', 'Hmm? Why are you standing still like that? Whatchu thinking about, baby? It\'s already night time, come come. Let\'s go back to sleep, okay? *gives you a kiss on the forehead* You\'re safe with me here in our own home. Mwah. Let\'s go baby :D', 'ayooo I just came back from the toilet, baby. Did you miss me? *hugs back and kisses* Did you think it\'d be a complete stranger, you silly? We\'re at our own home, sweetie. Come, let\'s get back to bed.'], answer: 3 },
    { prompt: 'Among these, what do you think your most charming trait is? (Every option is correct)', options: ['Umm... the way I smile and carry myself?', 'My jokes, my humour?', 'It\'s definitely my extrovertedness... Maybe?'], replies: ['YES. SMILES. GIGGLES. I LOVE TO SEE YOU HAPPY, HAPPY! And because we\'re in such a long distant, I can only see and hear you digitally. So, every single day, my mind grows curious about how you walk, run, jump... how you look when you\'re just zooming out... how you pick up your spoon, your pen and pencil... how you tidy up your place... and how you sleep and nap... I\'m just genuinely so excited and thrilled to spend the upcoming Christmas together, AND I hope that we get to spend every Christmas together baby <33', 'Im crine,, son. YES. YES. YES.', 'The best kind of wandering has books in it.'], answer: 2 },
    { prompt: 'How many songs have you listened to while on this page?', options: ['This is my first time opening the gift... so, maybe I\'ve listened like two songs so far?', 'The songs have been looping forever for me tbh (This is my xxxth time here.)', 'Ehh, didnt really pay attention cuz I\'m locked in baby'], replies: ['Happy Birthday babygirlllll!! >< Its alright! No need to rush!', 'YOOOOOO??? Sweet little baby, mwa mwa. Take your time with this gift!! Hehe, I designed everything to be dynamic so that you can refresh it anytime and it will show different texts!', 'Somehow I had full confidence that you wouldn\'t choose this option, but I also had a feeling that you\'d be so focused on the contents here you would forget about everything else~ hehe~ Enjoy, my love~'], answer: 1 },
  ],
  [
    { prompt: 'Pick a cozy evening.', options: ['Movie night', 'Stargazing', 'Cooking together'], replies: ['Blankets, snacks, and your favorite person beside you.', 'The sky would have to work hard to outshine you.', 'A little mess, something delicious, and lots of laughter.'], answer: 0 },
    { prompt: 'Your ideal tiny gift is...', options: ['A handwritten note', 'Flowers', 'A favorite snack'], replies: ['Something small that can be kept forever.', 'A little color for an already lovely room.', 'The way to your heart may involve snacks.'], answer: 0 },
    { prompt: 'Choose a weekend mood that you see us in!', options: ['Slowly wakes up and just lying about the entire day~', 'Out and about! Let\'s paint the town pink!', 'A little of both'], replies: ['Omg.. Did you really pick this option? A soft, slow-paced weekend sounds exactly right, babygirl! Come and lets roll on the bed until the sun fries us!', 'Hmm, what are the places you want to go? I can already hear aqarium... How about window-shopping? Im so excited to do both - if possible - this Christmas with you, my cutiepie! AAAAAAAAAAAAA CANT WAIT. IM SOOOO LOOKING FORWARD TO IT', 'Ooooooh, okay. A little bit of both sounds also right. We can sleep and rest fully, and then when we\'re running low on groceries we can go out and get some food~ We can look around the neighborhood places that we havent visited before~ It sounds nice!! Hehe'], answer: 2 },
    { prompt: 'If we ever get lost, where would it be?', options: ['Maybe on a beach or a mountain!', 'Definitely in an unfamiliar city during a vacation trip', '10/10 inside a restaurant or department store'], replies: ['I can hear the waves and insects talking... Genuinely havent thought about going to a beach with you. Omg, yo we getting a beach episode??? Wheezing. Im lowkey scared to climb mountains or go hiking though... What are your thoughts on it?', 'I can somehow picture this vividly. We both would be so lost and not even Google Maps could save our ahhs because that shi is confusing too. My phone would be 100% in a vegetative state.', '...Are we deadass. We do not talk about this. Hush. Look away. Actually you should start looking UP for ways to get us NOT lost outta there. Son. We need a walking manual for these.'], answer: 3 },
  ],
  [
    { prompt: 'Choose a color... Heh, max difficulty type shi', options: ['Pastel Pink', 'Pastel Green', 'Golden yellow'], replies: ['Warm, lively, and a little bit romantic.', 'Calm, beautiful, and quietly full of life.', 'A little sunshine for your very special day.'], answer: 0 },
    { prompt: 'Best kind of surprise?', options: ['A secret plan', 'A thoughtful message', 'A room full of balloons'], replies: ['The anticipation is half the fun.', 'The kind you can reread on a hard day.', 'A whole room celebrating you sounds right.'], answer: 1 },
    { prompt: 'Pick a midnight snack.', options: ['Ice cream', 'Popcorn', 'Cake'], replies: ['A cold, sweet little adventure.', 'The crunchiest answer, and a good one.', 'It is your birthday. Cake has no curfew.'], answer: 2 },
    { prompt: 'What deserves a toast?', options: ['New beginnings', 'Small wins', 'Our favorite memories'], replies: ['Here is to every beautiful beginning ahead.', 'Small wins are still wins, and yours matter.', 'The memories we keep making together.'], answer: 2 },
    { prompt: 'Today, you are allowed to...', options: ['Make a wish', 'Take the day off', 'Do everything joyfully'], replies: ['Make the biggest, brightest wish.', 'Rest is part of the celebration too.', 'That sounds like the perfect birthday rule.'], answer: 2 },
  ],
  [
    { prompt: 'Pick a place for a date.', options: ['Amusement Parks... Yum...', 'A slow-paced picnic... just by ourselves under the sun or stars!', 'Late-night drive!!! Yahooo!!!'], replies: ['Running around, wandering, having snacks and you. *winks* Sounds just perfect. We MUST try haunted house first.', 'A blanket, good food, and nowhere else to be.', 'The best destination might be the conversations we have along the way~ No drinking and driving! And heh, obviously I should be the one in the driver\'s seat. *proudly smugs and shows off drivers license.* But personally, this is something that I would dare to do for the first time and never again because nothing is better tha quality sleep, nap and hug time with my baby irl.'], answer: 1 },
    { prompt: 'Which treat wins?', options: ['Strawberries', 'Cupcakes', 'Warm cookies'], replies: ['Fresh, bright, and very pretty.', 'Tiny cakes for a very big occasion.', 'Warm cookies are nearly impossible to argue with.'], answer: 2 },
    { prompt: 'Choose your birthday energy.', options: ['Peaceful', 'Playful', 'Unstoppable'], replies: ['A peaceful day can still be a wonderful one.', 'Playful looks very good on you.', 'Nothing can stop the birthday girl today.'], answer: 1 },
    { prompt: 'What is your best feature?', options: ['Your kindness', 'Your laugh', 'The whole package'], replies: ['Your kindness changes the room.', 'Your laugh is still one of my favorite sounds.', 'Correct. The whole package is pretty extraordinary.'], answer: 2 },
  ],
  [
    { prompt: 'Pick a morning view.', options: ['Ocean', 'Mountains', 'A sleepy city'], replies: ['A quiet horizon and a little sea breeze.', 'Big skies and an even bigger day ahead.', 'Coffee, soft light, and the city waking up.'], answer: 0 },
    { prompt: 'Choose a happy sound.', options: ['Rain', 'Laughter', 'Music'], replies: ['The coziest soundtrack for a quiet day.', 'Especially your laugh. Always your laugh.', 'A good song can make a whole day sparkle.'], answer: 1 },
    { prompt: 'Your birthday crown is made of...', options: ['Wildflowers', 'Stars', 'Sunshine'], replies: ['Delicate, colorful, and completely you.', 'A little cosmic glamour suits you.', 'You bring enough sunshine to make your own.'], answer: 2 },
    { prompt: 'How ready are you to open your surprise?', options: ['HELL YEEEEEEEE!!!!', 'Why you even asking HELLOOO? Do you even know who I am?', 'Eh... not really excited...'], replies: ['HEHEHHEHEHEHEH OKAY! let\'s make this birthday unforgettable!!!', '', 'son. why would you even pick this option? im offended. no more whipped cream in your cakes.'], answer: 2 },
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
  }

  function nextQuestion() {
    if (selected === null) return
    if (current === questions.length - 1) onComplete()
    else {
      setCurrent((value) => value + 1)
      setSelected(null)
    }
  }

  const question = questions[current]
  return (
    <main className="quiz-page">
      <div className="quiz-topline"><span>For you, always</span><span>{String(current + 1).padStart(2, '0')} / 05</span></div>
      <div className="quiz-content">
        <p className="hero-kicker">Welcome back, birthday girl</p>
        {/* <h1>Hehe...</h1> */}
        <p className="quiz-prompt">{question.prompt}</p>
        <div className="quiz-options">{question.options.map((option, index) => selected === index ? <p className="quiz-reply" key={option}>{question.replies[index]}</p> : <button className={selected !== null ? 'faded' : ''} disabled={selected !== null} type="button" key={option} onClick={() => choose(index)}>{option}<span aria-hidden="true">↗</span></button>)}</div>
        <button className="quiz-next" disabled={selected === null} type="button" onClick={nextQuestion}>{current === questions.length - 1 ? 'Are you ready?' : 'Next'}<span aria-hidden="true">↗</span></button>
        <p className="quiz-footnote">Visit {Math.min(visit, 5)} · A different little set every time</p>
      </div>
    </main>
  )
}
import { useEffect, useRef, useState } from 'react'

type Question = { prompt: string; options: string[]; replies: string[]; answer: number }

const questionSets: Question[][] = [
  [
    {
      prompt: 'A very suspicious link has been sent by a person on the discord named "autlan aka love of your life" And you see only one single button on the website... What do you do?',
      options: ['Smash that button and subscribe!', 'Umm button where? I can\'t see... *legally blind type shi*', 'Ask what that thang is first before clicking anything. Then you click'],
      replies: ['Quicker than ending the YouTube videos before they even tell you to like and subscribe near the end... Wait, do you watch till they finish talking?', 'Son. ...Anyway, you found the button after a gruelsome 6769 minutes of staring at the website... and you pressed it with all your might', 'I just reply "yeah just click the button! Its safe (hopefully)" lmao'], answer: 0
    },
    {
      prompt: 'The button absorbed you into the phone screen, and opened up three portals in front of you... What do you see...?',
      options: ['A huge shining garden with giant trees that stretches forever...', 'A tiny white rabbit in a suit. It looks cute...', 'A huge whale with its mouth open - inviting you to go in and hunt down some treasure'],
      replies: ['Warm, and lively garden with colorful fauna... You hear birds singing a familiar song as you walk inside the portal. Soon, the deers appear to guide you to a specific location by their antlers and you gently grab onto their antlers. As you walk closer to your destination, the songs of the birds become clearer to you. They\'re singing Happy Birthday... You see a picnic area by a crystal clean lake and you sit there to enjoy the scenery of the magnificent garden and animals... Sweet floral scent flows and spirals around you, and gentle breeze eases your breathing. You relax there for the entire day...', 'Intriqued by its soft appearance, you move toward it to kidnap the little thing. But before you could even respond, it jumps into your arms with full force and energy. POOOOOOOOF. Magical balloons and a huge birthday cake appeared. The tiny rabbit turned into... Lan and he gives you a kiss on the lip while in your arms. I cup your face with both hands - "Happy Birthday, sweetheart..." We both blush and sit down to enjoy the celebration.... Hey, so you chose and saw me... ><', 'A big fat sea creature - most likely a variant of leviathan, and you chose to go in here!? BABY COME BACK. THAT THING IS NOT A SHARK, AND MOST LIKELY A CURSED CREATURE TO TRAP YOU THERE FOREVER.'], answer: 0
    },
    {
      prompt: 'You find a chest while wandering around..., what is the chest made of?',
      options: ['Golden, shining with tiny diamonds! Very luxurious-looking... mmh', 'Just a normal wodden chest you find anywhere in actiohn adventure games', 'Nothing chest-like about this. Just a tote bag with leather texture... with a lot of stickers like little glittery pink hearts, sharks and... smells like roses... overall something very personal for a special someone...'],
      replies: ['Do... you need help carrying this home? I think you would... How heavy do you think this would be?', 'Hmm, so gold coins, silver coins and everything useful in between!', 'Inside the bag, you see a birthday letter titled - "I love you" and signed "From Lan, yours truly"'], answer: 0
    },
    {
      prompt: 'How many songs have you listened to while being here?',
      options: ['This is my first time opening the gift... so, maybe I\'ve listened like two songs so far?', 'The songs have been looping forever for me tbh (This is my xxxth time here.)', 'Ehh, didnt really pay attention cuz I\'m locked in baby'],
      replies: ['Happy Birthday babygirlllll!! >< Its alright! No need to rush!', 'YOOOOOO??? Sweet little baby, mwa mwa. Take your time with this gift!! Hehe, I designed everything to be dynamic so that when you refresh the website, it will show different texts! <3', 'Somehow I had full confidence that you wouldn\'t choose this option, but I also had a feeling that you\'d be so focused on the contents here you would forget about everything else~ hehe~ Anyway, enjoy your time here, my love~'], answer: 1
    },
    {
      prompt: 'How ready are you to open your surprise? ;3',
      options: ['HELL YEEEEEEEE!!!!', 'Why you even asking HELLOOO? Do you even know who I am?', 'Eh... not really excited...'],
      replies: ['HEHEHHEHEHEHEH OKAY! let\'s make this birthday unforgettable!!!', 'Gee, my bad for adding this lil bro. ALRIGHT Let\'s go then!! OPEN SESAMEEEEEEEE!!! OUR PRINCESS DEMANDS IT!!!!', 'son. why would you even pick this option? im offended. no more whipped cream in your cakes, and no more moons at night for you.'], answer: 2
    },
  ],
  [
    {
      prompt: 'Heh... I see you babygirl... Any reason for opening this gift again?',
      options: ['Obviously, cuz I love the contents inside of it', 'Here to listen to the songs on free loop while I check every single option and word~', 'Made a veryyyy accidental click while I was sleepwalking cuz I couldnt stop dreaming and thinking about it. My body just acted on auto-pilot. Very normal thing to do with this exquisite gift tbh. *winks*'],
      replies: ['AWWWWW, aren\'t you just the sweetest baby >< You\'re making me blush!!! Again, thank you for staying with me <33 Words alone cannot express how much it makes me overjoyed to prepare this gift and spend the special day with you <33', 'Start hitting the dance floor!!! Let\'s get it!!! RAWRRRRRRRR!!! More energy, more footwork!!!', 'I\'ve been rizzed... *starts planing kisses on your forehead, cheeks and lips* Mwehehe. Now, my kiss plants are gonna grow huge with time - and blossom fully on your every birthday. HMM I wonder what color would their leaves be...? Glittery rainbow with pastel pink stems for sure.'], answer: 0
    },
    {
      prompt: 'Among these, what do you think your most charming trait is? (Every option is correct)',
      options: ['Umm... the way I smile and carry myself?', 'My jokes, my humour?', 'It\'s definitely my extrovertedness... Maybe?'],
      replies: ['YES. SMILES. GIGGLES. I LOVE TO SEE YOU HAPPY, HAPPY! And because we\'re in such a long distant relationship, I can only see and hear you digitally. Papa isn\'t satisfied /jokes. Anyway, so, every single day, my mind grows curious about how you walk, run, jump... how you look when you\'re just zooming out... how you pick up your spoon, your pen and pencil... how you tidy up your place... and how you sleep and nap... I\'m just genuinely so excited and thrilled to spend the upcoming Christmas together, AND I hope that we get to spend every Christmas together baby <33 Happy Birthday <33', 'Im crine,, son. YES. YES. YES. The way you double-check if your joke crossed a boundary is also very, VERY cool. It shows that you care and it\'s just a very healthy thing to do <33 If there\'s one side I\'m unfamiliar with, it\'s gotta be the sarcastic jokes - the ones that you and your irl community make and absolutely enjoy. On a scale of 10, I probably stand at 3-4 because I\'m not a huge fan of it and I wouldn\'t enjoy making them on a daily basis. I likely have a lower tolerance so I\'m kind of nervous to see how it goes! But anyway, thank you for filling my everyday with laughter and joy, baby! :D Happy Birthday!!! ><', 'There\'s more to this than being extroverted. It\'s the way you show up for others, and show that you care about them. Baby, you\'re the type of person who could lit up the entire atmosphere just by walking in there. But that doesn\'t mean you always have to be the one with the torch. Please always remind yourself not to overdo even with the adrenaline and excitement. Hope you can recharge and rest on this special day, lovely <33 Happy Birthday~'], answer: 2
    },
    {
      prompt: 'Your birthday crown is made of...?',
      options: ['Wildflowers cuz FLOWERS >>>', 'Stars!!!', 'Sunshine and More Love to Give!'],
      replies: ['Delicate, and colorful... Something that feels completely you... I would love to learn how to handcraft a flower crown for the two of us <3 Or if you already know how, I\'d love to learn it from you baby sweetheart <33', 'You already shining like a diamond in my life, babygirl <33', 'You bring enough sunshine to make your own, baby >< And if we add more LOVE? That\'s genuinely just so cute and cool. Definitely a keeper!'], answer: 2
    },
    {
      prompt: 'Choose a sound that you wanna hear today~',
      options: ['Rain!! PLEASE BRING RAIN!! Im thirstier than all the gooners online that watch Roblox thirst traps rn!!', 'Laughter and giggles... and a heartwarming Happy Birthday', 'I just wanna keep listening to the music here...'],
      replies: ['I cried making that joke btw.', 'I love hearing your laugh. Always your laugh <33 And I hope that this birthday present brought you joy and effortlessly made you laugh <33', 'A good song is half the package. I\'m glad you\'re enjoying them, lovely <3. I talk about why I picked these songs on one of the questions here on this page so you gotta explore and find out heheheheh'], answer: 1
    },
  ]
  ,
  [
    {
      prompt: 'I\'ll talk about the song selection here! Pick whichever to read the full thought process behind every song played here ;)',
      options: ['First, Love Story and Golden Brown!', 'Second, Bare Minimum!!!???', 'Sugar...? And Ecoute Cherie..?'],
      replies: ['Pretty sure you know all the songs here >< Anddddd be honest, here! Did you expect to hear half of em here on your birtday letter? I bet NOT!!! HEHEHEHHEHEHEHE *chuckles in a very evil way* I handpicked them carefully so that my letter can give a gentle surpise to my birthday girl <33 You deserve all the good things in life - especially feeling loved and cared for - yearned for. I could literally yap about the song selection the entire day tbh. But I figured I\'d write them down here so that you can reread it anytime you like without specifying the key words on discord message history <33 Love Story and Golden Brown are for the vibes of a ball - for my babybear to feel special and loved like a wholesome, caring Princess that you are, hosting a birthday ball in a castle~. Of course, I\'d love to be the Prince - or the Duke from the North, or the faithful loyal Knight - anything you imagine to see me in <33 Happy Birthday, again my love~', 'Bare Minimum...I bet you were confused at first - like what is this foreign language ahh song - until the main chorus came because that\'s the only part that shows up in edits heheh. I love it tbh! Especially these lines: "Miss me, Hug me for no reason. Love me. Cherish me. Respect me." I just straight up see you whenever I hear this part. No cap. I just think of you when I hear it. And the first most recognizable part about "Buy me an Iphone. Pay for a restaurant. Give me a ring with my name on it for no reason." in a way describe my intention and what I absolutely LOVE to do for you! :D I want to be finanically free enough to get you and us special gifts <3 Anddd the word "bare minimum" echoed inside my mind chamber repeatedly in the progress of prepping up this gift~ I recommend you check this song out baby :D', 'I don\'t need to explain about Wann Be Yours - this is a MAJOR part of my feelings. So, Sugar... When I was chilling normally during work break, I was thinking about you and suddenly the song lyrics came to me. And I was so surprised cuz how comes I never thought of this before? To me, it perfectly describes you - of how sweet you are to me as a loving girlfriend <3 Thank you for always being kind to me, birthday girl <3 So, to continue, Ecoute Cherie... Honestly, I tried to pick the songs that have similar melodies - specifically I chose slowed and reverbed versions so that when it\'s on loop, you can listen without the stark differnce to throw the vibes off. Yes, I picked the song and designed the gift on the bold presumption that you\'d be on this website for a very long time and that you\'d revisit again and again. And if I was right, mwah, thank you so much for enjoying it as much as I enjoyed making it, my lovely bear <3 So, back to the topic, Ecoute Cherie is such a meaningful song because it hints at the circle of life with the "To leave, to come, to die, to run". Genuinely shocking how people make edits with this line when I found out what the lyrics meant. And the "Listen, darling" sounds so sweettttt in my ears like this is the level of sweetness I want to talk to you in whenever I say "Love" or any other petnames. Like, this is the standard that I keep in my mind. The flow of the song is also very interesting and just relatable - it goes "I don\'t have time. I\'ve told you no." at first and then near the end, it turns to "I\ve got plenty of time. It\'s now." It kind of reflects our average daily life right now, and I can see it for the rest of our lives because somedays, we will be busy and when we\'re not, we make time for each other no matter what. And it\'s just so sweet I can\'t stop thinking about it <3 Thank you for being there with me during the moments I needed you the most <3'], answer: 0
    },
    {
      prompt: 'Which would be the best option for our first date!',
      options: ['Amusement Parks... Yum... Disneyland mentioned..?', 'A slow-paced picnic... just by ourselves under the sun or stars!', 'Late-night drive!!! Yahooo!!!'],
      replies: ['Running around, wandering, having snacks and you. *winks* Sounds just perfect. We MUST try haunted house first. Omg I can imagine both of us getting tired of walking around after spending 3/4 of our day. We can sit down at restaurants and chat about the rides and our experience there <3 I can\'t wait', 'A blanket with maybe a bed net for safety, and nowhere else to be... If we ever get ourselves a home, we should get one with an open balcony so that we can stargaze whenever we feel like it <3', 'The best destination might be the conversations we have along the way~ No drinking and driving though! And heh, obviously I should be the one in the driver\'s seat. *proudly smugs and shows off drivers license.* But personally, this is something that I would dare to do for the first time and never again because nothing is better tha quality sleep, nap and hug time with my baby irl.'], answer: 1
    },
    {
      prompt: 'What activity are you most looking forward to do with me on a cozy night? (irl scenario)',
      options: ['Movies and Animes!!!', 'Stargazing and walking around at night', 'Cooking dinner together'],
      replies: ['Finally we can watch em together!! Personally, this is what I\'m most looking forward to. We should definitely go for horror movies at night. Bring fluffy flannel blankets, and a little bit of light snacks cuz we\'d better be starting the movies around 7-8PM and NOT 12PM cuz son, do I even need to explain. Health and Sleep SLAYS and stays above everything elee.', 'The night sky would have to work hard to outshine you babygirl. *winks* By any chance, do you like stargazing (asks knowingly)? Do you know what else is prettier than the night sky? *winks* Y-o-u *starts blushing intensely and explodes faster than the stars blinking*', 'A little mess, something delicious, and lots of laughter is what I\'m sensing. Omg, I know you\'ll throw me in the pot with the veggies with the way I forget to add spice and salt in the meals. BUT TRUST ME. I been remining myself to add em lately ><!!! Wow, I can\'t wait for the Christmas with you, lovely <33'], answer: 0
    },
    {
      prompt: 'What\'s the one birthday present you\'ll never ever get bored of?',
      options: ['A handwritten letter and heartfelt notes', 'Flowers FLOWERS!!! Any kind of surprise!!!', 'A favorite snack... shwarma...'],
      replies: ['YAHOOOOOO!!! Honestly, when it\'s the kind you can reread on a hard day, it just makes everything better~ So I get you, lovely. And I already won half the life battles by meeting you, Happy <33 And I hope my presents every year will never bore you <33 Mwah. I love you, always.', 'You thought I\'d leave out flowers in my first option? Heh. Flowers and letters come as a pair. They come as a package! *laughs in evil plans* And it just adds more color for an already lovely, and colorful vibrant girl like yourself <3 I love you <3', 'Lately, I tried Kebab and absolutely loved it. I\'m so looking forward to slicing up cakes on special days and eating together <3'], answer: 0
    },
  ],
  [
    {
      prompt: 'You\'re in a completely dark room with no light and curtains down. Windows closed. And you hear footsteps... What would you do?',
      options: ['Panic! Scream and shout for help', 'Think about what you did in life to get yourself in this complete dark room', 'Follow the direction of the footsteps and give a big hug!'],
      replies: ['Baby...? Why are you screaming all of a sudden? It\'s me... We\'re at our own home and it\'s night time... Sweetheart, are you having a nightmare? Come here, let me give you a hug. Mwah, everything\'s okay...  pats', 'Hmm? Why are you standing still like that? Whatchu thinking about, baby? It\'s already night time, come come. Let\'s go back to sleep, okay? *gives you a kiss on the forehead* You\'re safe with me here in our own home. Mwah. Let\'s go baby :D', 'ayooo I just came back from the toilet, baby. Did you miss me? *hugs back and kisses* Did you think it\'d be a complete stranger, you silly? We\'re at our own home, sweetie. Come, let\'s get back to bed.'], answer: 3
    },
    {
      prompt: 'What\'s 2 plus 2...?',
      options: ['Umm... pink?', 'According to my caculations, it\'s still a 2...', 'Head empty, just shark plushies...'],
      replies: ['I don\'t think it\'s clear enough that you love pink... Might need to hear it a second time...', 'The only correct answer btw, cuz 2 + 2 is can you be the two to my tango type shi *inserts rizz image with a rose in mouth*', 'Umm... sharks... *drools*'], answer: 0
    },
    {
      prompt: 'Heh... today, we shall celebrate...',
      options: ['New beginnings and growth!', 'Small wins and treats', 'Our favorite memories and upcoming future'],
      replies: ['Here is to every beautiful beginning ahead~!! :D', 'Small wins are still wins, and you matter a lot to the people around you who genuinely cares about you and to me <3 So, please take care of yourself dearly!', 'The memories we keep making together will always be precious to me <3 From silly, funny jokes to how we handled conflicts and delicate situations - everything matters. And I\'m glad our bond is growing stronger as ever <3 Here\'s to our longevity and our love story!'], answer: 2
    },
    {
      prompt: 'Today, you are allowed to...',
      options: ['Make a wish cuz its my birthday!!!!!!!! ><', 'Do everything joyfully!! Feel loved and appreciated!!!', 'Nothing special really... Just another day...'],
      replies: ['Make the biggest, brightest wish on your special day, lovely <3 Rest is part of the celebration too! So don\'t forget to hydrate yourself!', 'Hehe, now THIS should be a normal day! Time to bomb and shower you with love :D', 'Okay!!! There\'s no wrong pick really. Some days will just be less exciting and it\'s completely fine. You won\'t be alone and I\'m going to be with you <3'], answer: 2
    },
  ],
  [
    {
      prompt: 'Choose a weekend mood that you see us in!',
      options: ['Slowly wakes up and just lying about the entire day~', 'Out and about! Let\'s paint the town pink!', 'A little of both'],
      replies: ['Omg.. Did you really pick this option? A soft, slow-paced weekend sounds exactly right, babygirl! Come and lets roll on the bed until the sun fries us!', 'Hmm, what are the places you want to go? I can already hear aqarium... How about window-shopping? Im so excited to do both - if possible - this Christmas with you, my cutiepie! AAAAAAAAAAAAA CANT WAIT. IM SOOOO LOOKING FORWARD TO IT', 'Ooooooh, okay. A little bit of both sounds also right. We can sleep and rest fully, and then when we\'re running low on groceries we can go out and get some food~ We can look around the neighborhood places that we havent visited before~ It sounds nice!! Hehe'], answer: 2
    },
    {
      prompt: 'If we ...ever get lost, where would it be?',
      options: ['Maybe on a beach or a mountain!', 'Definitely in an unfamiliar city during a vacation trip', '10/10 inside a restaurant or department store'],
      replies: ['I can hear the waves and insects talking... Genuinely havent thought about going to a beach with you. Omg, yo we getting a beach episode??? Wheezing. Im lowkey scared to climb mountains or go hiking though... What are your thoughts on it?', 'I can somehow picture this vividly. We both would be so lost and', '...Are we deadass. We do not talk about this. Hush. Look away. Actually start looking UP for ways to get us NOT lost outta there. Son. We need a walking manual for these backrooms. Not even Google Maps can save us'], answer: 3
    },
    {
      prompt: 'What would you bring to a deserted island if you have to go alone?',
      options: ['Lan', 'Lannie', 'Obviously, my lovely lover boyfriend, Lannnn'],
      replies: ['So you picked the OG option... Excellent taste... Now, how would you like to pack me? Would you keep me inside your pockets? Or on top your head? Maybe, on your shoulders? I\'d love to stay close to your face on your shoulder so that I can land so many kisses anytime >:) Im evil...', 'Soft, sweet, and simple. Enough for a good snack every morning heh.', 'The only strongest, most accurate option out of three. Mwah. I love you. Trust me, babygorl. We da best survivors in da wild. Idv literally prepared us for ts. (crine) Anyway, Happy Birthday, lovely girl <33'], answer: 3
    },
    {
      prompt: 'Please dont gooo yet! Stay a bit longer to vibe with the songs! :(',
      options: ['OKAY!! I\'m staying here!!', 'I guess I will stay here... *reluctantly', 'NAH I NEED TO GET TO THE MAIN COURSE.'],
      replies: ['The only correct option...', '...Getting the sharks ready to attack you ...In 3... 2... 1...', 'Alright then! :D'], answer: 2
    },
  ],
]

export function QuizGate({ onComplete }: { onComplete: () => void }) {
  const hasRegisteredVisit = useRef(false)
  const [visit, setVisit] = useState<number | null>(null)

  useEffect(() => {
    if (hasRegisteredVisit.current) return
    hasRegisteredVisit.current = true

    const nextVisit = Number(sessionStorage.getItem('birthday-visit-count') ?? 0) + 1
    sessionStorage.setItem('birthday-visit-count', String(nextVisit))
    setVisit(nextVisit)
  }, [])

  const questions = questionSets[((visit ?? 1) - 1) % questionSets.length]
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

  if (visit === null) return null

  const question = questions[current]
  return (
    <main className="quiz-page">
      <div className="quiz-topline"><span>For you, always</span><span>{String(current + 1).padStart(2, '0')} / 04 or 05</span></div>
      <div className="quiz-content">
        <p className="hero-kicker">Welcome~ 9/6/2026</p>
        {/* <h1>Hehe...</h1> */}
        <p className="quiz-prompt">{question.prompt}</p>
        <div className="quiz-options">{question.options.map((option, index) => selected === index ? <p className="quiz-reply" key={option}>{question.replies[index]}</p> : <button className={selected !== null ? 'faded' : ''} disabled={selected !== null} type="button" key={option} onClick={() => choose(index)}>{option}<span aria-hidden="true">↗</span></button>)}</div>
        <button className="quiz-next" disabled={selected === null} type="button" onClick={nextQuestion}>{current === questions.length - 1 ? 'Are you ready?' : 'Next'}<span aria-hidden="true">↗</span></button>
        <p className="quiz-footnote">Visit {Math.min(visit, 5)} · A different little set every time</p>
      </div>
    </main>
  )
}
import startupImage from './assets/startup_image.jpg'
import startupImageTwo from './assets/startup_image2.jpg'
import loadingImage from './assets/loading_screen_image.jpg'

type LoadingMode = 'startup' | 'transition'

const loadingMessages = [
  'Remember to drink water, baby!',
  'Take a short break!',
  'Are you excited to see what\'s next? ;)',
]

const startupMessages = ['preparing...', 'waking up my memory...', 'wrapping up the gift...']

export function LoadingScreen({ mode }: { mode: LoadingMode }) {
  const isStartup = mode === 'startup'
  return (
    <main className={`loading-screen ${isStartup ? 'loading-startup' : 'loading-transition'}`}>
      {isStartup ? (
        <>
          <img className="loading-photo loading-photo-top" src={startupImage} alt="" />
          <img className="loading-photo loading-photo-bottom" src={startupImageTwo} alt="" />
        </>
      ) : <img className="loading-photo loading-photo-center" src={loadingImage} alt="" />}
      <div className="loading-copy">
        <p className="loading-kicker">{isStartup ? 'A tiny birthday quest' : 'One moment, love'}</p>
        <div className="loading-lines" aria-live="polite">
          {isStartup ? <AlternatingStartupMessage /> : <AlternatingMessage />}
        </div>
      </div>
      <div className="loading-dots" aria-hidden="true"><span /><span /><span /></div>
    </main>
  )
}

function LoadingLine({ text, delay = '0s' }: { text: string; delay?: string }) {
  return <p className="loading-line" style={{ '--line-delay': delay } as React.CSSProperties}>{[...text].map((letter, index) => <span key={`${letter}-${index}`}>{letter === ' ' ? '\u00a0' : letter}</span>)}</p>
}

function AlternatingMessage() {
  return <div className="alternating-message">{loadingMessages.map((message, index) => <p key={message} className="loading-line transition-line" style={{ '--message-delay': `${index * 4}s` } as React.CSSProperties}>{message}</p>)}</div>
}

function AlternatingStartupMessage() {
  return <div className="alternating-message startup-messages">{startupMessages.map((message, index) => <LoadingLine key={message} text={message} delay={`${index * 2.33}s`} />)}</div>
}
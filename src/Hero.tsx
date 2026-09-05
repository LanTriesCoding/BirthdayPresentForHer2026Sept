import birthdayLetterButton from './assets/birthday_letter_button.jpg'
import memoriesButton from './assets/memories_button.jpg'
import moreNotesButton from './assets/more_notes_button.jpg'

export function Hero() {
    return (
        <section className="hero">
            <p className="hero-kicker">A special morning, made for you</p>
            <h1 className="heroTitle">Happy Birthday, My Love</h1>
            <p className="hero-sub">You can pick one of these or just scroll down!</p>
            <nav className="hero-image-actions" aria-label="Birthday page sections">
                <a className="hero-image-button" href="#letter" aria-label="Open birthday letter" title="Open birthday letter">
                    <img src={birthdayLetterButton} alt="Birthday letter" />
                </a>
                <a className="hero-image-button" href="#memories" aria-label="Open memories" title="Open memories">
                    <img src={memoriesButton} alt="Memories" />
                </a>
                <a className="hero-image-button" href="#wish" aria-label="Open more notes" title="Open more notes">
                    <img src={moreNotesButton} alt="More notes" />
                </a>
            </nav>
            <a className="scroll-cue" href="#letter" aria-label="Scroll to the birthday note">Scroll to open <span aria-hidden="true">↓</span></a>
        </section>
    );
}
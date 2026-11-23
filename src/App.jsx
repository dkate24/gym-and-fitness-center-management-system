import { useState } from 'react'
import './App.css'
import AuthPage from './components/AuthPage'
import TrainersSection from './components/TrainersSection'
import FaqSection from './components/FaqSection'
import ManagementApp from './components/ManagementApp'

const imagePath = (name) => `/img/${name}`

function LandingPage({ onRegister, onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="landing-page">
      <nav className={`menu ${menuOpen ? 'active' : ''}`}>
        <div className="container flex menu-inner">
          <button className="mobile-btn" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="main-navigation">
            <span />
            <span />
            <span />
          </button>
          <a className="logo" href="#top" onClick={closeMenu}>GYM</a>
          <ul className="nav" id="main-navigation">
            <li className="nav-item"><a href="#top" onClick={closeMenu}>Home</a></li>
            <li className="nav-item"><a href="#why-us" onClick={closeMenu}>Features</a></li>
            <li className="nav-item"><a href="#explore" onClick={closeMenu}>Explore</a></li>
            <li className="nav-item"><a href="#trainers" onClick={closeMenu}>Trainers</a></li>
            <li className="nav-item"><a href="#faq" onClick={closeMenu}>FAQ</a></li>
            <li className="nav-item"><a href="#discount" onClick={closeMenu}>Register</a></li>
          </ul>
          <button className="btn nav-register" type="button" onClick={onLogin}>Login</button>
        </div>
      </nav>

      <header className="header" id="top">
        <div className="container flex">
          <div className="text">
            <h1 className="mb">Manage Your Gym <br /><span>In One Place</span></h1>
            <p className="mb">Keep member details, trainer assignments, daily attendance and fee status together. Log in to open your gym management dashboard.</p>
            <button className="btn mt" type="button" onClick={onRegister}>Get Started Now</button>
          </div>
          <div className="visual"><img src={imagePath('banner-img.png')} alt="Athlete lifting a dumbbell" /></div>
        </div>
      </header>

      <section className="section" id="why-us">
        <div className="container flex">
          <div className="text">
            <h2 className="primary mb">Why Choose Us?</h2>
            <h3 className="secondary mb"><span /> Member records.</h3>
            <p className="tertiary mb">Add members, assign their trainers and keep track of paid and pending fees.</p>
            <h3 className="secondary mb mt"><span /> Daily attendance.</h3>
            <p className="tertiary mb">Mark members present for today and see the count on your dashboard.</p>
          </div>
          <div className="visual"><img src={imagePath('why-us.png')} alt="Woman exercising" /></div>
        </div>
      </section>

      <section className="section" id="explore">
        <div className="container flex">
          <div className="visual"><img src={imagePath('explore.jpg')} alt="Gym member running on a treadmill" /></div>
          <div className="text">
            <h2 className="primary mb">Explore Our Fitness <br />Studio</h2>
            <p className="tertiary mb">Explore the sample trainer profiles below. After logging in, you can add trainers and assign them to gym members from the management screens.</p>
            <button className="btn mt" type="button" onClick={onRegister}>Get Started Now</button>
          </div>
        </div>
      </section>

      <TrainersSection />

      <section className="section" id="testimonial">
        <div className="container flex">
          <div className="text">
            <h2 className="primary">A Simple Daily <br />Workflow</h2>
            <div className="client">
              <img src={imagePath('client1.jpg')} alt="Client" />
              <h2 className="secondary">Ready for the day</h2>
              <p className="tertiary">Open your dashboard, review pending fees and mark members present as they arrive. Update trainer assignments from the same member list.</p>
            </div>
          </div>
          <div className="visual"><img src={imagePath('testimonial.png')} alt="Strong athlete holding dumbbells" /></div>
        </div>
      </section>

      <section className="section" id="discount">
        <div className="container flex">
          <div className="visual"><img src={imagePath('discount.png')} alt="Woman working out" /></div>
          <div className="text">
            <h2 className="primary mb">Start Managing Your Gym</h2>
            <p className="tertiary mb">Create a demo account to try member management, trainer records and daily attendance.</p>
            <button className="btn mt" type="button" onClick={onRegister}>Create account</button>
          </div>
        </div>
      </section>

      <FaqSection />

      <div className="footer">
        <FooterLinks title="Quick Links" items={['Offers & Discounts', 'Get Coupon', 'Contact Us', 'About']} />
        <FooterLinks title="Fashion in Area" items={['Gym Accessories', 'helath tips', 'choose your timings', 'Rules for Gym']} />
        <FooterLinks title="Support" items={['Frequently Asked Questions', 'Report a Payment Issue', 'Terms & Conditions', 'Privacy Policy']} />
      </div>
      <footer><div className="container flex"><p className="tertiary">&copy; 2023 GYM. All Rights Reserved</p></div></footer>
    </div>
  )
}

function FooterLinks({ title, items }) {
  return <div className="links"><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
}

function App() {
  const [screen, setScreen] = useState('home')
  const [user, setUser] = useState(null)

  if (user) return <ManagementApp user={user} onLogout={() => { setUser(null); setScreen('login') }} />
  if (screen !== 'home') return <AuthPage initialSignup={screen === 'signup'} onBack={() => setScreen('home')} onSignedIn={setUser} />
  return <LandingPage onRegister={() => setScreen('signup')} onLogin={() => setScreen('login')} />
}

export default App

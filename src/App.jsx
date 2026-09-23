import { useState } from 'react'
import './App.css'

const imagePath = (name) => `/img/${name}`

function LandingPage({ onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="landing-page">
      <nav className={`menu ${menuOpen ? 'active' : ''}`}>
        <div className="container flex menu-inner">
          <button className="mobile-btn" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
          <a className="logo" href="#top" onClick={closeMenu}>GYM</a>
          <ul className="nav">
            <li className="nav-item"><a href="#top" onClick={closeMenu}>Home</a></li>
            <li className="nav-item"><a href="#why-us" onClick={closeMenu}>Features</a></li>
            <li className="nav-item"><a href="#explore" onClick={closeMenu}>Explore</a></li>
            <li className="nav-item"><a href="#discount" onClick={closeMenu}>Register</a></li>
          </ul>
          <button className="btn nav-register" type="button" onClick={onRegister}>Register</button>
        </div>
      </nav>

      <header className="header" id="top">
        <div className="container flex">
          <div className="text">
            <h1 className="mb">Complete Daily <br /><span>Workout</span> At Home</h1>
            <p className="mb">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla saepe quisquam error, dolor dicta tempora excepturi assumenda repellendus quo atque.</p>
            <button className="btn mt" type="button" onClick={onRegister}>Get Started Now</button>
          </div>
          <div className="visual"><img src={imagePath('banner-img.png')} alt="Athlete lifting a dumbbell" /></div>
        </div>
      </header>

      <section className="section" id="why-us">
        <div className="container flex">
          <div className="text">
            <h2 className="primary mb">Why Choose Us?</h2>
            <h3 className="secondary mb"><span /> Consultation with Expert.</h3>
            <p className="tertiary mb">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quae facere eos esse odit hic beatae!</p>
            <h3 className="secondary mb mt"><span /> Consultation with Expert.</h3>
            <p className="tertiary mb">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum aperiam porro, rerum mollitia ad atque veritatis.</p>
          </div>
          <div className="visual"><img src={imagePath('why-us.png')} alt="Woman exercising" /></div>
        </div>
      </section>

      <section className="section" id="explore">
        <div className="container flex">
          <div className="visual"><img src={imagePath('explore.jpg')} alt="Gym member running on a treadmill" /></div>
          <div className="text">
            <h2 className="primary mb">Explore Our Fitness <br />Studio</h2>
            <p className="tertiary mb">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium corrupti obcaecati natus ad laborum repellendus consequuntur. Id quam non quisquam molestias quasi blanditiis, animi inventore itaque tempore mollitia dolor earum!</p>
            <button className="btn mt" type="button" onClick={onRegister}>Get Started Now</button>
          </div>
        </div>
      </section>

      <section className="section trainers" id="trainers">
        <h2 className="primary mb">Our Professional Trainers</h2>
        <div className="container flex">
          {['trainer1.jpg', 'trainer2.jpg', 'trainer3.jpg'].map((image, index) => (
            <article className="trainer" key={image}>
              <img src={imagePath(image)} alt={`Professional trainer ${index + 1}`} />
              <h3 className="secondary mb">Alan Smith</h3>
              <p className="tertiary mb">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a className="btn-2" href="#discount" aria-label="View trainer">-&gt;</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="testimonial">
        <div className="container flex">
          <div className="text">
            <h2 className="primary">That's What Our Super <br />Client Says</h2>
            <div className="client">
              <img src={imagePath('client1.jpg')} alt="Client" />
              <h2 className="secondary">Exelent Training</h2>
              <p className="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, dolorem vitae nulla totam dolores assumenda debitis architecto qui blanditiis inventore voluptatum deleniti similique, consequatur ratione cum? Omnis, ratione itaque nam praesentium vel consequatur.</p>
            </div>
          </div>
          <div className="visual"><img src={imagePath('testimonial.png')} alt="Strong athlete holding dumbbells" /></div>
        </div>
      </section>

      <section className="section" id="discount">
        <div className="container flex">
          <div className="visual"><img src={imagePath('discount.png')} alt="Woman working out" /></div>
          <div className="text">
            <h2 className="primary mb">Fitness Classes This Summer, Pay Now And Get 25% Discount</h2>
            <p className="tertiary mb">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis adipisci provident incidunt rerum quos ea aliquam in. In aliquam a non odio recusandae! Dolorem modi facere ducimus ullam?</p>
            <button className="btn mt" type="button" onClick={onRegister}>Book Now</button>
          </div>
        </div>
      </section>

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

function AuthPage({ onBack }) {
  const [signup, setSignup] = useState(false)

  return (
    <main className="auth-page">
      <button className="back-link" type="button" onClick={onBack}>&lt; Back to home</button>
      <header><h1 className="heading">GYM</h1></header>
      <div className="auth-container">
        <div className={`auth-slider ${signup ? 'moveslider' : ''}`} />
        <div className="auth-tabs">
          <button type="button" onClick={() => setSignup(false)}>Login</button>
          <button type="button" onClick={() => setSignup(true)}>Signup</button>
        </div>
        <div className={`form-section ${signup ? 'form-section-move' : ''}`}>
          <form className="login-box" onSubmit={(event) => event.preventDefault()}>
            <input type="email" className="ele" placeholder="youremail@email.com" aria-label="Email" />
            <input type="password" className="ele" placeholder="password" aria-label="Password" />
            <button className="clkbtn" type="submit">Login</button>
          </form>
          <form className="signup-box" onSubmit={(event) => event.preventDefault()}>
            <input type="text" className="ele" placeholder="Enter your name" aria-label="Name" />
            <input type="email" className="ele" placeholder="youremail@email.com" aria-label="Email" />
            <input type="password" className="ele" placeholder="password" aria-label="Password" />
            <input type="password" className="ele" placeholder="Confirm password" aria-label="Confirm password" />
            <button className="clkbtn" type="submit">Signup</button>
          </form>
        </div>
      </div>
    </main>
  )
}

function App() {
  const [showAuth, setShowAuth] = useState(false)

  return showAuth ? <AuthPage onBack={() => setShowAuth(false)} /> : <LandingPage onRegister={() => setShowAuth(true)} />
}

export default App

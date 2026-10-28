const questions = [
  { question: 'How do I open the registration form?', answer: 'Use Register in the navigation or Get Started Now on the home page. Choose Signup to try the registration form.' },
  { question: 'Does signup create a real account?', answer: 'This prototype checks required fields, email format, password length and matching passwords in your browser. Account creation and login are not connected yet, and form details are not saved.' },
  { question: 'Can I track attendance and fees here?', answer: 'Attendance, fee tracking and member records are planned features. The current version demonstrates the landing page, trainer filtering and account form validation.' },
]

export default function FaqSection() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <style>{`
.faq-section .container { max-width: 850px; }
.faq-section details { border-bottom: 1px solid #61716d; text-align: left; }
.faq-section summary { padding: 20px 4px; cursor: pointer; font-weight: 700; }
.faq-section summary:hover { color: #7bd9cc; }
.faq-section details p { max-width: 70ch; padding: 0 4px 24px; line-height: 1.7; }
`}</style>
      <div className="container">
        <h2 className="primary mb" id="faq-heading">Frequently Asked Questions</h2>
        {questions.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

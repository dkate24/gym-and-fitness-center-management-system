const questions = [
  { question: 'How do I open the registration form?', answer: 'Use Register in the navigation or Get Started Now on the home page. Choose Signup to try the registration form.' },
  { question: 'How does signup work?', answer: 'Signup saves a demo account. You can then log in with the same email and password to open the management screens. Use sample details for this project.' },
  { question: 'Can I track attendance and fees here?', answer: 'Yes. After logging in, open Members to add members, assign trainers, mark attendance for today and set fee status to Paid or Pending. Changes are saved for the next visit.' },
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

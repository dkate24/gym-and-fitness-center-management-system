import { useState } from 'react'

const trainers = [
  { image: 'trainer1.jpg', specialty: 'Strength' },
  { image: 'trainer2.jpg', specialty: 'Cardio' },
  { image: 'trainer3.jpg', specialty: 'Flexibility' },
]

export default function TrainersSection() {
  const [specialty, setSpecialty] = useState('All')

  const visibleTrainers = trainers.filter(
    (trainer) =>
      specialty === 'All' || trainer.specialty === specialty
  )

  return (
    <section className="section trainers" id="trainers">
      <style>{`
        .trainer-note, .trainer-count {
          margin: 0 20px 20px;
        }

        .trainer-filter {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 20px;
        }

        .trainer-filter select {
          min-height: 44px;
          padding: 8px 16px;
          border: 1px solid #29a396;
          border-radius: 8px;
          background: #141615;
          color: #fff;
          font: inherit;
        }

        .trainer-results {
          align-items: flex-start;
          gap: 24px;
        }

        .trainer-results .trainer {
          width: 100%;
          max-width: 340px;
        }

        .trainer-enquiry {
          display: inline-block;
          padding: 10px;
          color: #7bd9cc;
          text-underline-offset: 4px;
        }

        @media (max-width: 768px) {
          .trainer-results {
            align-items: center;
          }
        }
      `}</style>

      <h2 className="primary mb">Our Professional Trainers</h2>

      <p className="trainer-note">
        Sample trainer profiles for this prototype.
      </p>

      <label className="trainer-filter">
        Filter by specialty

        <select
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        >
          {['All', 'Strength', 'Cardio', 'Flexibility'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <p className="trainer-count" role="status">
        Showing {visibleTrainers.length} of {trainers.length} trainers
      </p>

      <div className="container flex trainer-results">
        {visibleTrainers.map((trainer) => (
          <article className="trainer" key={trainer.image}>
            <img
              src={`/img/${trainer.image}`}
              alt={`Sample ${trainer.specialty.toLowerCase()} trainer`}
            />

            <h3 className="secondary mb">
              {trainer.specialty} Training
            </h3>

            <p className="tertiary mb">
              Focus: {trainer.specialty.toLowerCase()}
            </p>

            <a className="trainer-enquiry" href="#discount">
              Explore registration
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

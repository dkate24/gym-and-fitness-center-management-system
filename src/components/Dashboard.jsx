export default function Dashboard({ records, onNavigate }) {
  const { members, trainers, today } = records
  const pending = members.filter((member) => member.feeStatus === 'Pending').length
  const present = members.filter((member) => member.attendanceDates.includes(today)).length

  return (
    <>
      <h1>Gym overview</h1>
      <p className="page-description">Manage your members, trainers and daily attendance.</p>
      <dl className="summary-counts">
        <div><dt>Total members</dt><dd>{members.length}</dd></div>
        <div><dt>Total trainers</dt><dd>{trainers.length}</dd></div>
        <div><dt>Pending fees</dt><dd>{pending}</dd></div>
      </dl>
      <section className="management-panel">
        <h2>Attendance today</h2>
        <p>{present} of {members.length} members marked present on {today}.</p>
        <button className="management-primary" type="button" onClick={() => onNavigate('Members')}>Manage members</button>
      </section>
      <p className="management-footnote">Sample gym records. Fee status is a simple Paid / Pending record.</p>
    </>
  )
}

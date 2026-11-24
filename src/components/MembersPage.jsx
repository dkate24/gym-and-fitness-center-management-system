export default function MembersPage({ members, trainers, today, saving, onChange }) {
  async function addMember(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    if (await onChange('/members', { method: 'POST', body: values }, 'Member added.')) form.reset()
  }

  function updateMember(id, body) {
    return onChange(`/members/${id}`, { method: 'PATCH', body }, 'Member updated.')
  }

  return (
    <>
      <h1>Members</h1>
      <p className="page-description">Register members, assign trainers and update fees and attendance.</p>
      <section className="management-panel" aria-labelledby="add-member-heading">
        <h2 id="add-member-heading">Add a member</h2>
        <form onSubmit={addMember}>
          <fieldset disabled={saving} className="management-form">
            <label>Name<input name="name" required maxLength={80} placeholder="Member name" /></label>
            <label>Phone<input name="phone" type="tel" required maxLength={20} placeholder="Contact number" /></label>
            <label>Trainer<select aria-label="Trainer" name="trainerId" defaultValue=""><option value="">Unassigned</option>{trainers.map((trainer) => <option value={trainer.id} key={trainer.id}>{trainer.name}</option>)}</select></label>
            <label>Fee status<select aria-label="Fee status" name="feeStatus" defaultValue="Pending"><option>Pending</option><option>Paid</option></select></label>
            <button className="management-primary" type="submit">Add member</button>
          </fieldset>
        </form>
      </section>
      <section className="management-panel" aria-labelledby="members-list-heading">
        <div className="list-heading"><h2 id="members-list-heading">Member records ({members.length})</h2><span>Attendance: {today}</span></div>
        {members.length === 0 ? <p>No members yet. Add your first member above.</p> : (
          <div className="table-scroll" role="region" aria-label="Member records" tabIndex={0}>
            <table>
              <thead><tr><th scope="col">Name</th><th scope="col">Phone</th><th scope="col">Trainer</th><th scope="col">Fees</th><th scope="col">Present today</th><th scope="col">Action</th></tr></thead>
              <tbody>{members.map((member) => (
                <tr key={member.id}>
                  <th scope="row">{member.name}</th><td>{member.phone}</td>
                  <td><select disabled={saving} aria-label={`Trainer for ${member.name}`} value={member.trainerId || ''} onChange={(event) => updateMember(member.id, { trainerId: event.target.value })}><option value="">Unassigned</option>{trainers.map((trainer) => <option key={trainer.id} value={trainer.id}>{trainer.name}</option>)}</select></td>
                  <td><select disabled={saving} aria-label={`Fee status for ${member.name}`} value={member.feeStatus} onChange={(event) => updateMember(member.id, { feeStatus: event.target.value })}><option>Pending</option><option>Paid</option></select></td>
                  <td><input disabled={saving} type="checkbox" aria-label={`Present today: ${member.name}`} checked={member.attendanceDates.includes(today)} onChange={(event) => updateMember(member.id, { present: event.target.checked })} /></td>
                  <td><button type="button" className="management-remove" disabled={saving} aria-label={`Remove ${member.name}`} onClick={() => { if (window.confirm(`Remove ${member.name} and their records?`)) onChange(`/members/${member.id}`, { method: 'DELETE' }, 'Member removed.') }}>Remove</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

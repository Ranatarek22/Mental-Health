export const DoctorCard = ({ doctor }) => {
  return (
    <a href={`/WeeklySchedule/${doctor.id}`} className="doctor-card">
      <img
        src={doctor.photoUrl ? doctor.photoUrl : "/Anony.png"}
        alt={doctor.firstName}
      />
      <div>
        <h4>
          {doctor.firstName} {doctor.lastName}
        </h4>
        <p>{doctor.specialization}</p>
        <p>{doctor.gender}</p>
      </div>
    </a>
  );
};

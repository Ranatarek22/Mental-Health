import { useNavigate } from "react-router-dom";

export const DoctorCard = ({ doctor }) => {
  const history = useNavigate();
  return (
    <div
      className="doctor-card"
      onClick={() => history.push(`/WeeklySchedule/${doctor.id}`)}
    >
      <img src={doctor.photoUrl} alt={doctor.firstName} />
      <div>
        <h4>
          {doctor.firstName} {doctor.lastName}
        </h4>
        <p>{doctor.specialization}</p>
      </div>
    </div>
  );
};

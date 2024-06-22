
import { create } from "zustand";

const useDoctorStore = create((set) => ({
  doctors: [],
  setDocs: (newDoctors) => set({ doctors: newDoctors }),

  addDoc: (newDoctor) =>
    set((state) => ({
      doctors: [...state.doctors, newDoctor],
    })),

  removeDoc: (doctorId) =>
    set((state) => ({
      doctors: state.doctors.filter((doctor) => doctor.id !== doctorId),
    })),

  clearDocs: () => set({ doctors: [] }),

  getDoctorById: (doctorId) => {
    const doctor = useDoctorStore
      .getState()
      .doctors.find((d) => d.id === doctorId);
    return doctor || null;
  },
}));

export default useDoctorStore;

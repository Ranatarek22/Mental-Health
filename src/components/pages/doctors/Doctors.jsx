import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { DoctorCard } from "./DoctorCard";
import { apiInstance } from "../../../axios";
import { useInView } from "react-intersection-observer";
import { useNavigate, useLocation } from "react-router-dom";
import { Slider } from "@mui/material";
import debounce from "lodash.debounce";
import NavUser from "../../navigation/NavUser/NavUser";
import { FaFilter } from "react-icons/fa";
import useDoctorStore from "../../../hooks/use-doctor-store";

const egyptianCities = [
  { value: "", label: "All" },
  { value: "cairo", label: "Cairo" },
  { value: "alexandria", label: "Alexandria" },
  { value: "giza", label: "Giza" },
  { value: "shubra_el_kheima", label: "Shubra El Kheima" },
  { value: "port_said", label: "Port Said" },
  { value: "suez", label: "Suez" },
  { value: "mansoura", label: "Mansoura" },
  { value: "mahalla_el_kubra", label: "Mahalla El Kubra" },
  { value: "tanta", label: "Tanta" },
  { value: "asyut", label: "Asyut" },
  { value: "ismailia", label: "Ismailia" },
  { value: "faiyum", label: "Faiyum" },
  { value: "zagazig", label: "Zagazig" },
  { value: "damietta", label: "Damietta" },
  { value: "asyut", label: "Asyut" },
  { value: "minya", label: "Minya" },
  { value: "damanhur", label: "Damanhur" },
  { value: "beni_suef", label: "Beni Suef" },
  { value: "qena", label: "Qena" },
  { value: "sohag", label: "Sohag" },
  { value: "hurghada", label: "Hurghada" },
  { value: "6th_of_october_city", label: "6th of October City" },
  { value: "shibin_el_kom", label: "Shibin El Kom" },
  { value: "banha", label: "Banha" },
  { value: "kafr_el_sheikh", label: "Kafr El Sheikh" },
  { value: "mallawi", label: "Mallawi" },
  { value: "bilqas", label: "Bilqas" },
  { value: "arish", label: "Arish" },
  { value: "matai", label: "Matai" },
  { value: "idfu", label: "Idfu" },
  { value: "mit_ghamr", label: "Mit Ghamr" },
  { value: "el_mahalla_el_kubra", label: "El Mahalla El Kubra" },
];

const specializations = [
  { value: "", label: "All" },
  { value: "HealthPsychology", label: "Health Psychology" },
  { value: "ClinicalPsychology", label: "Clinical Psychology" },
  { value: "Neuropsychology", label: "Neuropsychology" },
  { value: "ForensicPsychology", label: "Forensic Psychology" },
  { value: "EducationalPsychology", label: "Educational Psychology" },
  { value: "ChildPsychology", label: "Child Psychology" },
  { value: "CounselingPsychology", label: "Counseling Psychology" },
];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 10;
  const AddDoc = useDoctorStore((state) => state.setDocs);

  const navigate = useNavigate();
  const location = useLocation();

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const getFiltersFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      name: searchParams.get("name") || "",
      specialization: searchParams.get("specialization") || "",
      gender: searchParams.get("gender") || "",
      city: searchParams.get("city") || "",
      minFees: parseInt(searchParams.get("minFees")) || 0,
      maxFees: parseInt(searchParams.get("maxFees")) || 1000,
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const fetchDoctors = useCallback(
    debounce(async (page, filters) => {
      setIsLoading(true);
      try {
        const response = await apiInstance.get(
          `/doctors?PageNumber=${page}&PageSize=${pageSize}&Name=${filters.name}&Specialization=${filters.specialization}&Gender=${filters.gender}&City=${filters.city}&MinFees=${filters.minFees}&MaxFees=${filters.maxFees}`
        );
        let newData = response.data;
        console.log(newData);

        // Filter out doctors without fees and location
        newData = newData.filter(
          (doctor) => doctor.sessionFees !== 0 && doctor.location !== null
        );

        AddDoc(newData);
        if (page === 1) {
          setDoctors(newData);
        } else {
          setDoctors((prev) => [...prev, ...newData]);
        }
        setHasMore(newData.length === pageSize);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
      setIsLoading(false);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchDoctors(page, filters);
  }, [page, filters]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, isLoading, inView]);

  useEffect(() => {
    const searchParams = new URLSearchParams(filters);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [filters, navigate, location.pathname]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeesChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minFees: newValue[0],
      maxFees: newValue[1],
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      city: "",
      gender: "",
      specialization: "",
      minFees: 0,
      maxFees: 1000,
    });
  };

  return (
    <>
      <NavUser />
      <div className="doctors-list-container">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filter
        </button>
        <div className={`filters ${showFilters ? "show" : ""}`}>
          <h3>Filter</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          />
          <Select
            name="specialization"
            options={specializations}
            placeholder="Specialization"
            value={specializations.find(
              (option) => option.value === filters.specialization
            )}
            onChange={(option) =>
              handleFilterChange("specialization", option ? option.value : "")
            }
          />
          <div className="gender-filter">
            <label>
              <input
                type="radio"
                name="gender"
                value=""
                checked={filters.gender === ""}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={filters.gender === "male"}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={filters.gender === "female"}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              />
              Female
            </label>
          </div>
          <Select
            name="city"
            options={egyptianCities}
            placeholder="City"
            value={egyptianCities.find(
              (option) => option.value === filters.city
            )}
            onChange={(option) =>
              handleFilterChange("city", option ? option.value : "")
            }
          />
          <div className="fees-filter">
            <Slider
              value={[filters.minFees, filters.maxFees]}
              onChange={handleFeesChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <div className="fees-inputs">
              <input
                type="number"
                name="minFees"
                placeholder="Min Fees"
                value={filters.minFees}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              />
              <input
                type="number"
                name="maxFees"
                placeholder="Max Fees"
                value={filters.maxFees}
                onChange={(e) =>
                  handleFilterChange(e.target.name, e.target.value)
                }
              />
            </div>
          </div>
          <div className="">
            <button className="reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        <div className="">
          {doctors.map((doctor) => (
            <div key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="DoctorCardSkeleton-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
              <DoctorCardSkeleton key={idx} />
            ))}
          </div>
        )}
        <div ref={ref} />
      </div>
    </>
  );
};

export default DoctorsList;

const DoctorCardSkeleton = () => {
  return (
    <div className="DoctorCardSkeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-short"></div>
        <div className="skeleton-line skeleton-line-long"></div>
        <div className="skeleton-line skeleton-end-line"></div>
      </div>
    </div>
  );
};

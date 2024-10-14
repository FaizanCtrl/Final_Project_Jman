import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState("");
  const [team, setTeam] = useState("");
  const [error, setError] = useState("");
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await api.get("/departments");
        setDepartmentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartment();
  }, []);

  // Fetch Teams based on department ID
  useEffect(() => {
    const fetchTeamsByDepartment = async () => {
      if (department) {
        try {
          const response = await api.get(`/teams/${department}`);
          setTeamsList(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setTeamsList([]); // Clear teams if no department is selected
      }
    };
    fetchTeamsByDepartment();
  }, [department]); // Fetch teams whenever the selected department ID changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("auth/register", {
        name,
        email,
        password,
        departmentId: department,
        teamId: team, // Include teamId in the request
      });

      if (response.status === 201) {
        props.showToast({ success: "User Created Successfully" });
        navigate("/");
      }
    } catch (error) {
      props.showToast({ error: error.response.data.error });
      console.log("Error:", error.response.data.error);
    }

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDepartment("");
    setTeam(""); // Reset team selection
  };

  return (
    <div className="row h-100">
      <div className="col-md-12 h-100">
        <div
          className="row h-100 justify-content-center"
          style={{
            background: "linear-gradient(to bottom, #C39393,#0F0F5F, #0F0F5F)",
          }}
        >
          <div
            className="col-10 m-auto row justify-content-center col-md-3 p-5 rounded"
            style={{
              border: "1px solid #ededed",
              width: "550px",
              height: "690px",
            }}
          >
            <div className="d-flex justify-content-center mt-0">
              <p className="fs-1 fw-bold rounded text-light">Register</p>
            </div>
            <form
              className="mt-4 d-flex flex-column justify-items-center"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setError("");
                    setName(e.target.value);
                  }}
                  className="form-control p-2"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  className="form-control p-2"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value);
                  }}
                  className="form-control p-2"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setError("");
                    setConfirmPassword(e.target.value);
                  }}
                  className="form-control p-2"
                />
              </div>
              <div className="mb-3">
                <select
                  id="department"
                  value={department}
                  onChange={(e) => {
                    setError("");
                    setDepartment(e.target.value);
                  }}
                  className="form-control p-2"
                >
                  <option value="">Select Department</option>
                  {departmentList.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <select
                  id="team"
                  value={team}
                  onChange={(e) => {
                    setError("");
                    setTeam(e.target.value);
                  }}
                  className="form-control p-2"
                >
                  <option value="">Select Team</option>
                  {teamsList.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Registration link */}
              <div className="mt-3 text-light text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/" className="text-decoration-none">
                    Login Here
                  </Link>
                </p>
              </div>
              {error && <div className="error text-danger mb-2">{error}</div>}
              <div className="row mt-5 justify-content-center">
                <button type="submit" className="w-50 fs-5 p-2 btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

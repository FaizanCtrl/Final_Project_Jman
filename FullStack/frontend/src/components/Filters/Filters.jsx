// import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";

// const Filters = ({ onFilterChange, departments, teams }) => {
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedTeam, setSelectedTeam] = useState("");

//   // Effect to reset selected team when department changes
//   useEffect(() => {
//     // Reset selected team when the department changes
//     setSelectedTeam("");
//     // Notify the parent component that the filters have changed
//     onFilterChange({ department: selectedDepartment, team: "" });
//   }, [selectedDepartment, onFilterChange]);

//   const handleFilterChange = () => {
//     // Notify parent component about the current filter selections
//     onFilterChange({ department: selectedDepartment, team: selectedTeam });
//   };

//   // Filter teams based on selected department
//   const filteredTeams = selectedDepartment
//     ? teams.filter((team) => team.departmentId === Number(selectedDepartment)) // Use Number to match type
//     : teams;

//   return (
//     <div className="mb-4">
//       <h4>Filters</h4>
//       <Form>
//         <Form.Group controlId="department">
//           <Form.Label>Department</Form.Label>
//           <Form.Control
//             as="select"
//             value={selectedDepartment}
//             onChange={(e) => {
//               setSelectedDepartment(e.target.value);
//               handleFilterChange(); // Update filters on change
//             }}
//           >
//             <option value="">All Departments</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.name}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="team">
//           <Form.Label>Team</Form.Label>
//           <Form.Control
//             as="select"
//             value={selectedTeam}
//             onChange={(e) => {
//               setSelectedTeam(e.target.value);
//               handleFilterChange(); // Update filters on change
//             }}
//           >
//             <select
//                   id="team"
//                   value={team}
//                   onChange={(e) => {
//                     setError("");
//                     setTeam(e.target.value);
//                   }}
//                   className="form-control p-2"
//                 ></select>
//             {/* <option value="">All Teams</option>
//             {filteredTeams.map(team => (
//               <option key={team.id} value={team.id}>{team.name}</option>
//             ))} */}
//             <option value="">All Teams</option>
//             {teams.map((t) => (
//               <option key={t.id} value={t.id}>
//                 {t.name}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// };

// export default Filters;

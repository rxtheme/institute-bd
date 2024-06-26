"use client";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Result = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  useEffect(() => {
    fetch("https://school-server-git-main-yousufislammes-projects.vercel.app/users")
      .then(res => res.json())
      .then(data => { 
        setStudents(data);
        setLoading(false);
        console.log("show students data::: ", data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    if (!student.studentName) {
      return false;
    }

    const studentNameLower = student.studentName.toLowerCase();
    const studentEmailLower = student.email?.toLowerCase() || '';
    const searchQueryLower = searchQuery.toLowerCase();

    return studentNameLower.includes(searchQueryLower) || studentEmailLower.includes(searchQueryLower);
  });

  const handleDelete = (_id) => {
    fetch(`https://school-server-git-main-yousufislammes-projects.vercel.app/users/${_id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(dataDelete => {
        setStudents((prev) => prev.filter((student) => student._id !== _id));
        console.log("Deleted data:", dataDelete);
        if (dataDelete.acknowledged) {
          alert("delete successful");
        }
      })
      .catch(error => {
        console.error("Error deleting data:", error);
      });
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsEditing(true);
  };

 const handleEditSubmit = (event) => {
  event.preventDefault();
  const updatedStudent = {
    studentName: event.target.studentName.value,
    email: event.target.email.value,
    class: event.target.class.value,
    age: event.target.age.value,
    fatherName: event.target.fatherName.value,
    matherName: event.target.matherName.value,
    religion: event.target.religion.value,
    sex: event.target.sex.value,
    nationality: event.target.nationality.value,
    contactNumber: event.target.contactNumber.value,
    address: event.target.address.value
  };

  fetch(`https://school-server-git-main-yousufislammes-projects.vercel.app/users/${currentStudent._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedStudent),
  })
    .then(res => res.json())
    .then(data => {
      setStudents((prev) =>
        prev.map((student) =>
          student._id === currentStudent._id ? { ...student, ...updatedStudent } : student
        )
      );
      setIsEditing(false);
      setCurrentStudent(null);
      console.log("Updated data:", data);
    })
    .catch(error => {
      console.error("Error updating data:", error);
    });
};


  return (
    <div>
      <h2>Students information show...</h2>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className="border px-5 py-2 m-3 w-[500px] rounded-lg outline-none"
        />
      </div>
      <div>
        {
          loading ? (
            <div className="flex justify-center items-center ">
              <Loading />
            </div>
          ) : (
            filteredStudents.map((item) => (
              <div key={item._id} className="group border-2 flex justify-between items-center px-5 rounded-lg m-3">
                <div>
                  <h2 className="py-2">{item.studentName}</h2>
                  <p>{item.email}</p>
                  <p>{item.age}</p>
                  <p>{item.class}</p>
                  <p>{item.fatherName}</p>
                  <p>{item.matherName}</p>
                  <p>{item.religion}</p>
                  <p>{item.sex}</p>
                  <p>{item.nationality}</p>
                  <p>{item.contactNumber}</p>
                  <p>{item.address}</p>
                  <span className="text-xs text-orange-400">{item.dateTime}</span>
                </div>
                <div className="hidden group-hover:block transition ease-in-out">
                  <div className="flex items-center gap-1">
                    <span className="bg-green-200 p-2 rounded-full cursor-pointer">
                      <CiEdit onClick={() => handleEdit(item)} className="text-green-700" />
                    </span>
                    <span className="p-2 rounded-full bg-red-200 cursor-pointer">
                      <MdDeleteOutline onClick={() => handleDelete(item._id)} className="text-red-700" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )
        } 
      </div>

      {isEditing && currentStudent && (
        <div className="fixed overflow-scroll inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg">
            <h2>Edit Student info</h2>
            <form  onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-2 gap-2">
                
               
                <label className="block text-sm font-medium text-gray-700">
                  Name
                  <input
                    type="text"
                    name="studentName"
                    defaultValue={currentStudent.studentName}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                
                <label className="block text-sm font-medium text-gray-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    defaultValue={currentStudent.email}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                
                <label className="block text-sm font-medium text-gray-700">
                  Age
                  <input
                    type="age"
                    name="age"
                    defaultValue={currentStudent.age}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Class
                  <input
                    type="class"
                    name="class"
                    defaultValue={currentStudent.class}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Father's Name
                  <input
                    type="fatherName"
                    name="fatherName"
                    defaultValue={currentStudent.fatherName}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Mather's Name
                  <input
                    type="matherName"
                    name="matherName"
                    defaultValue={currentStudent.matherName}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Religion
                  <input
                    type="religion"
                    name="religion"
                    defaultValue={currentStudent.religion}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Sex
                  <input
                    type="sex"
                    name="sex"
                    defaultValue={currentStudent.sex}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Nationality
                  <input
                    type="nationality"
                    name="nationality"
                    defaultValue={currentStudent.nationality}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Number
                  <input
                    type="contactNumber"
                    name="contactNumber"
                    defaultValue={currentStudent.contactNumber}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                  <input
                    type="address"
                    name="address"
                    defaultValue={currentStudent.address}
                    className="mt-1 block w-full border px-3 py-2 rounded-lg shadow-sm"
                    required
                  />
                </label> 
                </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;

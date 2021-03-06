import * as React from "react";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const nameRef = useRef(null);

  const [users, setusers] = useState([]);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    age: null,
    newName: "",
    newAge: null,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getUsers")
      .then((res) => res.json())
      .then(({ data }) => setusers(data))
      .catch((err) => setError(err));
  }, [users]);

  const handleAddUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = {
      name: formData.name,
      age: formData.age,
    };
    fetch("http://localhost:3000/api/users/postUsers", {
      body: JSON.stringify(user),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => setError(err));
    nameRef.current.focus();
  };

  const handleUpdateUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { name, age, newName, newAge } = formData;
    const updatedUser = {
      name,
      age,
      newName,
      newAge,
    };
    fetch("http://localhost:3000/api/users/updateUser", {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    const { name, age } = formData;
    fetch("http://localhost:3000/api/users/deleteUser", {
      method: "DELETE",
      body: JSON.stringify({
        name,
        age,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      throw new Error(err);
    });
  };

  const handleInputChange = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">Name </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="age">Age </label>
          <input
            onChange={handleInputChange}
            type="number"
            id="age"
            name="age"
          />
        </div>
        <div>
          <label htmlFor="newName">New Name </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="newName"
            name="newName"
          />
        </div>
        <div>
          <label htmlFor="newAge">New Age </label>
          <input
            onChange={handleInputChange}
            type="number"
            id="newAge"
            name="newAge"
          />
        </div>
        <button onClick={handleAddUser}>Add user</button>
        <button onClick={handleUpdateUser}>Update User</button>
        <button onClick={handleDeleteUser}>Delete User</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={"_" + Math.random() * 100000 + "".substr(2, 9)}>
              {user.name}-{user.age}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;

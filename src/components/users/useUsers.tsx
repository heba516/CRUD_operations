import axios from "axios";
import { useEffect, useState } from "react";
import { userData } from "./services/userData";

export default function useUsers() {
  const [users, setUsers] = useState([]);

  const addUsers = async (values: userData) => {
    const res = await axios.post("http://localhost:3000/users", values);
    return res;
  };

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    const newUsers = users.filter((user: { id: string }) => user.id !== id);
    setUsers([...newUsers]);
  };
  const editUser = async (id: string, values: userData) => {
    const { data } = await axios.patch(
      `http://localhost:3000/users/${id}`,
      values
    );
    setUsers(data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        console.log(data);

        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  return { users, addUsers, deleteUser, editUser };
}

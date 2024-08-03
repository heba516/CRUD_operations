import OneUser from "./oneUser";
import useUsers from "./useUsers";
import { userData } from "./services/userData";

export default function AllUsers() {
  const { users, setUsers, deleteUser } = useUsers();
  const handleDelete = async (id: string) => {
    const success = await deleteUser(id);
    if (success) {
      setUsers(users.filter((user: { id: string }) => user.id !== id));
    }
  };

  return (
    <div className="container">
      <h1>All users</h1>
      {users.map((user: userData) => (
        <OneUser key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}

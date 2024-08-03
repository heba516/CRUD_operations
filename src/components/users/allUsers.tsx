import OneUser from "./oneUser";
import useUsers from "./useUsers";
import { userData } from "./services/userData";

export default function AllUsers() {
  const { users } = useUsers();

  return (
    <div className="container">
      <h1>All users</h1>
      {users.map((user: userData) => (
        <OneUser key={user.id} user={user} />
      ))}
    </div>
  );
}

import { useAppSelector } from "../store";
import type { User } from "../types";

/**
 * Leaderboard component that displays a leaderboard of users based on their answered and created polls.
 * @returns JSX.Element
 */
const Leaderboard = () => {
  const users = useAppSelector((state) => state.users);
  const authedUser = useAppSelector((state) => state.authedUser);

  return (
    <div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users)
            .sort(
              (a, b) =>
                Object.keys(b.answers).length +
                b.questions.length -
                (Object.keys(a.answers).length + a.questions.length),
            )
            .map((user: User) => (
              <tr key={user.id}>
                <td>
                  <img
                    className="avatar-medium"
                    src={user.avatarURL || ""}
                    alt={`${user.name}'s avatar`}
                  />
                  <div className="user-info">
                    <p
                      className={`${user.id === authedUser ? "active-user " : ""}`}
                    >
                      {user.name}
                    </p>
                    <p className="poll-detail">{user.id}</p>
                  </div>
                </td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

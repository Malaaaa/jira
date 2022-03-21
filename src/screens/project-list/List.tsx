import React from "react";
import { User } from "./Searchpanel";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  list: Project[];
  users: User[];
}
const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>people</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "none"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;

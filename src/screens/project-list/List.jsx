import React from "react";

const List = ({ list, users }) => {
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

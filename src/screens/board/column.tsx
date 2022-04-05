import React from "react";
import { Board } from "types/board";
import { useTasksInProject } from "screens/board/util";

export const BoardColumn = ({ board }: { board: Board }) => {
  const { data: allTasks } = useTasksInProject();
  const tasks = allTasks?.filter((task) => task.kanbanId === board.id);
  return (
    <div>
      <h3>{board.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};

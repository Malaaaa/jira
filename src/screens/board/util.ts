import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useBoard } from "utils/board";
import { useTasks } from "utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useBoardInProject = () =>
  useBoard({ projectId: useProjectIdInUrl() });

export const useTasksInProject = () =>
  useTasks({ projectId: useProjectIdInUrl() });

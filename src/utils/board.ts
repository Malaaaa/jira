import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Board } from "types/board";

export const useBoard = (param?: Partial<Board>) => {
  const client = useHttp();

  return useQuery<Board[]>(["Board", param], () =>
    client("kanbans", { data: param })
  );
};

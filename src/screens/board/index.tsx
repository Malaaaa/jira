import { useDocumentTitle } from "utils";
import { useBoardInProject, useProjectInUrl } from "./util";
import { BoardColumn } from "./column";
import styled from "@emotion/styled";

const BoardScreen = () => {
  useDocumentTitle("Board List");

  const { data: currentProject } = useProjectInUrl();
  const { data: boards } = useBoardInProject();
  return (
    <div>
      <h1>{currentProject?.name}Board</h1>
      <ColumnsContainer>
        {boards?.map((board) => (
          <BoardColumn board={board} key={board.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
export default BoardScreen;

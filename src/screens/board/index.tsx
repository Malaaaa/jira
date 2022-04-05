import { useDocumentTitle } from "utils";
import { useBoardSearchParams, useProjectInUrl } from "./util";
import { BoardColumn } from "./column";
import styled from "@emotion/styled";
import { useBoard } from "utils/board";
import { SearchPanel } from "screens/board/search-panel";
const BoardScreen = () => {
  useDocumentTitle("Board List");

  const { data: currentProject } = useProjectInUrl();
  const { data: boards } = useBoard(useBoardSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}Board</h1>
      <SearchPanel />
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

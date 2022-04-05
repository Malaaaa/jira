import { useDocumentTitle } from "utils";
import { useBoardSearchParams, useProjectInUrl } from "./util";
import { BoardColumn } from "./column";
import styled from "@emotion/styled";
import { useBoard } from "utils/board";
import { SearchPanel } from "screens/board/search-panel";
export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const BoardScreen = () => {
  useDocumentTitle("Board List");

  const { data: currentProject } = useProjectInUrl();
  const { data: boards } = useBoard(useBoardSearchParams());
  return (
    <ScreenContainer>
      <div>
        <h1>{currentProject?.name}Board</h1>
        <SearchPanel />
        <ColumnsContainer>
          {boards?.map((board) => (
            <BoardColumn board={board} key={board.id} />
          ))}
        </ColumnsContainer>
      </div>
    </ScreenContainer>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
export default BoardScreen;

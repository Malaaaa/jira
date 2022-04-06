import List from "./list";
import SearchPanel from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "screens/project-list/util";
import { ErrorBox, Row, ScreenContainer } from "components/lib";
export const ProjectListScreen = () => {
  useDocumentTitle("Project list", false);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>Project List</h1>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;

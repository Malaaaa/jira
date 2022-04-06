import { Link, Route, Routes, useLocation } from "react-router-dom";
import KanbanScreen from "screens/kanban";
import EpicScreen from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"board"}>
            <Link to={"board"}>board</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>epic</Link>
          </Menu.Item>
        </Menu>
      </Aside>

      <Main>
        <Routes>
          {/*projects/:projectId/board*/}
          <Route path={"board"} element={<KanbanScreen />} />
          {/*projects/:projectId/epic*/}
          <Route path={"epic"} element={<EpicScreen />} />
          <Route index element={<KanbanScreen />} />
        </Routes>
      </Main>
    </Container>
  );
};

export default ProjectScreen;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
  overflow: hidden;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

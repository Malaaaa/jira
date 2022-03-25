import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import ProjectScreen from "screens/project";
import { resetRoute } from "utils";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"projects"} element={<ProjectListScreen />} />
          <Route path={"projects:projectId/*"} element={<ProjectScreen />} />
          <Route index element={<ProjectListScreen />} />
        </Routes>
      </Main>
    </Container>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area is used to give names to grid child elements
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;

function PageHeader() {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>{" "}
        <HeaderItem>Project</HeaderItem>
        <HeaderItem>User</HeaderItem>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type="link" onClick={logout}>
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>{" "}
      </HeaderRight>
    </Header>
  );
}

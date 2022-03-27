import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Routes, Route } from "react-router-dom";
import ProjectScreen from "screens/project";
import { resetRoute } from "utils";
import { ButtonNoPadding, Row } from "components/lib";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/pop-over";
import { useState } from "react";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type={"link"}
          >
            Create Project
          </ButtonNoPadding>
        }
      />{" "}
      <Main>
        <Routes>
          <Route
            path={"projects"}
            element={
              <ProjectListScreen
                projectButton={
                  <ButtonNoPadding
                    onClick={() => setProjectModalOpen(true)}
                    type={"link"}
                  >
                    Create Project
                  </ButtonNoPadding>
                }
              />
            }
          />
          <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
          <Route
            index
            element={
              <ProjectListScreen
                projectButton={
                  <ButtonNoPadding
                    onClick={() => setProjectModalOpen(true)}
                    type={"link"}
                  >
                    Create Project
                  </ButtonNoPadding>
                }
              />
            }
          />
        </Routes>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

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

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>user</span>
      </HeaderLeft>
      <HeaderRight></HeaderRight>
      <User />
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              LogOut
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

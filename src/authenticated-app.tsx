import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
/**
 * The application scenarios of grid and flex
 * 1. to consider, is it a one-dimensional layout or two-dimensional layout
 * Generally speaking, flex is used for one-dimensional layout, grid for two-dimensional layout.
 * 2. from the content or from the layout?
 * From the content: you first have a set of content (the number is generally not fixed), and then you want them to be evenly distributed in the container, the size of the content itself to determine the space occupied
 * from the layout: first plan the grid (the number is generally fixed), and then fill the elements into it
 * From content, use flex
 * From the layout, use grid
 *
 */
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>Projects</h3>
          <h3>User</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Log out</button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

// grid-area is used to give names to grid child elements
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;

import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>Dimension</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.7rem; /* Slightly larger for modern design */
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  color: black;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center; /* Changed to space-between for a modern look */
  align-items: center;
  background: rgba(255, 255, 255, 0.1); /* Glass effect */
  backdrop-filter: blur(5px);
  border-radius: 15px;
  margin: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(255, 255, 255, 0.1); /* Neumorphism */

  svg {
    font-size: 2rem;
    color: black;
  }
`;

export default App;

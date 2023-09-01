import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 3rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 3rem;
  text-decoration: none;
  background: #e0e0e0;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(255, 255, 255, 0.1);
  width: 7rem;
  height: 7rem;
  transform: scale(0.9);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(0.95);
  }

  h4 {
    color: black;
    font-size: 0.9rem;
    position: absolute;
    bottom: 10%;
  }

  svg {
    color: black;
    font-size: 1.8rem;
  }

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    svg,
    h4 {
      color: white;
    }
  }
`;

export default Category;

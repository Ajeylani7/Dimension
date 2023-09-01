import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Vegetarian Picks</h3>
      <Grid>
        <TransitionGroup component={null}>
          {veggie.map((recipe) => (
            <CSSTransition key={recipe.id} timeout={500} classNames="fade">
              <FadeInCard>
                <Link to={"/recipe/" + recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                  <CardText>{recipe.title}</CardText>
                </Link>
              </FadeInCard>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
    display: block;
  }

  box-shadow: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff;
  border-radius: 2rem;
`;

const CardText = styled.h4`
  text-align: center;
  padding: 1rem;
  color: black;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 2rem 2rem;
`;

const FadeInCard = styled(Card)`
  &.fade-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms, transform 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`;

export default Veggie;

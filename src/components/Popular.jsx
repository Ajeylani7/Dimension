import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Grid>
        <TransitionGroup component={null}>
          {popular.map((recipe) => (
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

export default Popular;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid>
      <TransitionGroup component={null}>
        {cuisine.map((item) => (
          <CSSTransition key={item.id} timeout={500} classNames="fade">
            <FadeInCard>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Link>
            </FadeInCard>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Grid>
  );
}

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
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }

  // Neumorphism styling
  background: #e0e0e0;
  box-shadow: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff;
  border-radius: 2rem;
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

export default Cuisine;

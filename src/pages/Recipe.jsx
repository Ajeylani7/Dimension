import React from "react";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <ImageWrapper>
        <Image src={details.image} alt={details.title} />
        <Title>{details.title}</Title>
      </ImageWrapper>
      <Content>
        <Tabs>
          <TabButton
            active={activeTab === "instructions"}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </TabButton>
          <TabButton
            active={activeTab === "ingredients"}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </TabButton>
        </Tabs>
        <Info>
          {activeTab === "instructions" && (
            <FadeIn>
              <Description
                dangerouslySetInnerHTML={{ __html: details.summary }}
              />
              <Description
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              />
            </FadeIn>
          )}
          {activeTab === "ingredients" && (
            <FadeIn>
              <IngredientList>
                {details.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </IngredientList>
            </FadeIn>
          )}
        </Info>
      </Content>
    </DetailWrapper>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeIn = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const DetailWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  object-fit: cover;
  width: 80%;
  border-radius: 2rem;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-top: 1rem;
  color: #333;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) =>
    props.active ? "linear-gradient(35deg, #494949, #313131)" : "transparent"};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover {
    background: #4a4343;
    color: white;
  }
`;

const Info = styled.div``;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #555;
`;

const IngredientList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

export default Recipe;

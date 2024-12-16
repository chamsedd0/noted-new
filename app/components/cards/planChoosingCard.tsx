import styled from "styled-components";
import { Plan } from "@/types/User";

interface StyledProps {
  isRecommended: boolean;
}

const PlanCardContainer = styled.div<StyledProps>`


  flex: 1;
  max-width: 500px;
  background: ${(props) =>
    props.isRecommended ? "linear-gradient(90deg, #8453C9, #4790AF)" : "linear-gradient(90deg, #413B44, #413B44)"};
  background-size: 200% 200%;
  background-position: ${props => props.isRecommended ? "100% 0%" : "0% 0%"};
  color: #fff;
  padding: 24px;
  border-radius: 12px;
  border: none;
  position: relative;
  margin: 20px;
  transition: all 1s ease;
  cursor: pointer;

  @media (max-width: 1200px) {
    width: 90%;
    max-width: unset;
  }

  .details {
    display: flex;
  }

  @media (max-width: 1470px) {
    transform: scale(0.9);
    margin: 0;
  }
`;

const PlanHeader = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .selected {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 32px;
    height: 32px;
    border-radius: 100px;
    border: 3px solid white;
    transition: all 0.3s ease;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inside-circle {
    transition: all 0.3s ease;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 100px;
    opacity: ${(props) => props.isRecommended ? "1" : "0"};

    &:hover {
      opacity: 0.5;
    }
  }
`;

const PlanTitle = styled.h3`
  font-size: 32px;
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0px 15px;
  line-height: 1.8;
  list-style: inside;
  min-width: 350px;
`;

const PlanFeature = styled.li`
  font-size: 16px;
`;

const PlanPrice = styled.p`
  width: 100%;
  display: flex;
  align-items: end;
  flex-direction: column;
  justify-content: end;

  b {
    font-size: 40px;
    display: flex;
    align-items: center;
    gap: 4px;

    img {
      margin-top: 10px;
    }
  }

  span {
    font-size: 16px;
    font-weight: 700 !important;
  }
`;

interface PlanCardProps {
  isRecommended: boolean;
  title: Plan;
  price: number;
  setChosenPlan: (plan: Plan) => void;
}

const PlanCard = ({
  isRecommended,
  title,
  price,
  setChosenPlan,
}: PlanCardProps) => {
  return (
    <PlanCardContainer isRecommended={isRecommended} onClick={() => setChosenPlan(title)}>
      <PlanHeader isRecommended={isRecommended}>
        <PlanTitle><img src="/crown.svg"></img>{title}</PlanTitle>
        <div className="selected">
          <div className="inside-circle"></div>
        </div>
      </PlanHeader>
      <div className="details">
        <PlanFeatures>
          <PlanFeature>10 PDF Uploads a month</PlanFeature>
          <PlanFeature>Unlimited courses</PlanFeature>
          <PlanFeature>Basic Smart Notes</PlanFeature>
          <PlanFeature>Unlimited Scheduling</PlanFeature>
          <PlanFeature>GPT - 3.5</PlanFeature>
        </PlanFeatures>
        <PlanPrice>
        <b>{price - 40}<img src="/turkish-lira.svg"></img></b> 
        <span>monthly</span>
        </PlanPrice>
      </div>

    </PlanCardContainer>
  );
};

export default PlanCard;

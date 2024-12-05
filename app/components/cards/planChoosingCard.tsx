import styled from "styled-components";
import ChooseButtonComponent from "@/app/components/buttons/chooseButton";
import { Plan } from "@/types/User";

interface StyledProps {
  isRecommended: boolean;
}

const PlanCardContainer = styled.div<StyledProps>`
  flex: 1;
  max-width: 440px;
  background-color: #545454;
  color: #fff;
  padding: 24px;
  padding-top: 43px;
  border-radius: 12px;
  border: ${(props) =>
    props.isRecommended ? "2px solid #FFCD48" : "1.5px solid #A3A3A3"};
  position: relative;
  margin: 20px;
  transition: all 0.3s ease;

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

  img {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 40px;
    opacity: ${(props) => (props.isRecommended ? 1 : 0)};
    transition: all 0.3s ease;
  }
`;

const PlanTitle = styled.h3`
  font-size: 32px;
  margin: 0;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0;
  line-height: 1.8;
  list-style: inside;
`;

const PlanFeature = styled.li`
  font-size: 16px;
`;

const PlanPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 28px;

  span {
    margin-right: 10px;
    text-decoration: line-through;
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
    <PlanCardContainer isRecommended={isRecommended}>
      <PlanHeader isRecommended={isRecommended}>
        <PlanTitle>{title}</PlanTitle>
        <img src="/crown.svg" alt="crown" />
      </PlanHeader>
      <PlanFeatures>
        <PlanFeature>10 PDF Uploads a month</PlanFeature>
        <PlanFeature>Unlimited courses</PlanFeature>
        <PlanFeature>Basic Smart Notes</PlanFeature>
        <PlanFeature>Unlimited Scheduling</PlanFeature>
        <PlanFeature>Limited documents space</PlanFeature>
        <PlanFeature>GPT - 3.5</PlanFeature>
      </PlanFeatures>
      <PlanPrice>
        <span>{price} TL</span>
        {price - 40}TL/month
      </PlanPrice>
      <ChooseButtonComponent
        plan={title.toString()}
        event={(planStr: string) => setChosenPlan(planStr as Plan)}
      />
    </PlanCardContainer>
  );
};

export default PlanCard;

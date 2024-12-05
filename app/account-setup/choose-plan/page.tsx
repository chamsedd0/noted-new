"use client";

import styled from "styled-components";
import { useAuth } from "@/app/hooks/useAuth";
import { Plan } from "@/types/User";
import { updatePlan } from "./_actions/updatePlanAction";
import PreLoginFooter from "@/app/components/preLoginFooter";
import PlanCard from "@/app/components/cards/planChoosingCard";

const Box = styled.div`
  background-color: #383838;
  width: 100vw;
  height: 100vh;
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const ChoosePlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 10px;

  h2 {
    font-size: 48px;
    font-weight: 700;

    @media (max-width: 1000px) {
      font-size: 36px;
    }
  }

  span {
    font-size: 16px;
    font-weight: 400;
  }

  @media (max-width: 1000px) {
    margin-top: 25px;
  }

  @media (min-width: 1470px) {
    margin-top: 100px;
  }
`;

const PlanCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img`
  position: absolute;
  width: 165px;
  top: 40px;
  right: 30px;

  @media (max-width: 1000px) {
    width: 125px;
  }
`;

export default function ChoosePlanPage() {
  const { idToken, loading } = useAuth();

  const handlePlanChoosing = async (planStr: string) => {
    if (!idToken) return;
    const plan = planStr as Plan;
    await updatePlan(idToken, plan);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <ChoosePlanContainer>
        <h2>Choose your Plan</h2>
        <span>Choose the plan that suits you the most</span>
        <PlanCards>
          <PlanCard
            isRecommended={false}
            title={Plan.BASIC}
            price={70}
            setChosenPlan={handlePlanChoosing}
          />
          <PlanCard
            isRecommended={true}
            title={Plan.PREMIUM}
            price={150}
            setChosenPlan={handlePlanChoosing}
          />
        </PlanCards>
      </ChoosePlanContainer>
      <PreLoginFooter />
    </Box>
  );
}

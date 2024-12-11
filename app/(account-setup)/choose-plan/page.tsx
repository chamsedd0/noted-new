"use client";
import { Box, Logo, ChoosePlanContainer, PlanCards } from "./styles";
import { Plan } from "@/types/User";
import { updatePlan } from "./_actions/updatePlanAction";
import PreLoginFooter from "@/app/components/preLoginFooter";
import PlanCard from "@/app/components/cards/planChoosingCard";

export default function ChoosePlanPage() {

  const handlePlanChoosing = async (planStr: string) => {
    const plan = planStr as Plan;
    await updatePlan(plan);
  };

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

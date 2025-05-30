"use client";
import { Box, Logo, ChoosePlanContainer, PlanCards, ButtonContainer } from "./styles";
import { AccountSetupStage, Plan } from "@/types/User";
import PreLoginFooter from "@/app/components/preLoginFooter";
import PlanCard from "@/app/components/cards/planChoosingCard";
import { accountSetupStore } from "../_store";
import { useRouter } from "next/navigation";
import BackButtonComponent from "@/app/components/buttons/backButton";

import { useState } from "react";
import ChooseButtonComponent from "@/app/components/buttons/chooseButton";

export default function ChoosePlanPage() {
  const { updateUser, saveSetup } = accountSetupStore();
  const [isRecommended, setIsRecommended] = useState(false);
  const router = useRouter();

  const handleSaving = async () => {
 
    try {


      // Save all accumulated data to database
      await saveSetup();

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save plan. Please try again.");
    }

    }

  const handlePlanChoosing = (planStr: string) => {

      const plan = planStr as Plan;
      setIsRecommended(!isRecommended);

      // Update plan in store
      updateUser({
        plan,
        accountSetupStage: AccountSetupStage.COMPLETED,
      });

    
  };

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <ChoosePlanContainer>
        <h2>Choose your Plan</h2>
        <span>Choose the plan that suits you the most</span>
        <PlanCards>
          <PlanCard
            isRecommended={isRecommended}
            title={Plan.BASIC}
            price={169}
            setChosenPlan={handlePlanChoosing}
          />
          <PlanCard
            isRecommended={!isRecommended}
            title={Plan.PREMIUM}
            price={239}
            setChosenPlan={handlePlanChoosing}
          />
        </PlanCards>
        <ButtonContainer>
          <ChooseButtonComponent event={handleSaving}></ChooseButtonComponent>
          <BackButtonComponent 
            event={() => router.push("/add-time-slots")} 
          />
        </ButtonContainer>
      </ChoosePlanContainer>
      <PreLoginFooter />
    </Box>
  );
}

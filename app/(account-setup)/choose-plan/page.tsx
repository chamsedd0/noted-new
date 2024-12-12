"use client";
import { Box, Logo, ChoosePlanContainer, PlanCards, ButtonContainer } from "./styles";
import { Plan } from "@/types/User";
import PreLoginFooter from "@/app/components/preLoginFooter";
import PlanCard from "@/app/components/cards/planChoosingCard";
import { accountSetupStore } from "../_store";
import { useRouter } from "next/navigation";
import BackButtonComponent from "@/app/components/buttons/backButton";

export default function ChoosePlanPage() {
  const { updateUser, saveSetup } = accountSetupStore();
  const router = useRouter();

  const handlePlanChoosing = async (planStr: string) => {
    try {
      const plan = planStr as Plan;

      // Update plan in store
      updateUser({
        plan,
        accountSetupStage: "COMPLETED",
      });

      // Save all accumulated data to database
      await saveSetup();

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save plan. Please try again.");
    }
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
        <ButtonContainer>
          <BackButtonComponent 
            event={() => router.push("/add-time-slots")} 
          />
        </ButtonContainer>
      </ChoosePlanContainer>
      <PreLoginFooter />
    </Box>
  );
}

import styled from "styled-components";
import { Plan } from "@/types/User";

const SubscriptionCard = styled.div`
  background-color: #535353;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  width: 100%;
  max-width: 600px;

  max-height: 95px;
`;

const SubscriptionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlanIcon = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 34px;
    height: 40px;
  }
`;

const PlanDetails = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 16px;
    font-weight: 600;
  }

  small {
    font-size: 14px;
    color: #cccccc;
  }
`;

const OptionsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type PlanDashboardCardProps = {
  plan: Plan | null;
};

const PlanDashboardCard = ({ plan }: PlanDashboardCardProps) => {
  return (
    <SubscriptionCard>
      <SubscriptionInfo>
        <PlanIcon>
          <img src={plan === Plan.PREMIUM ? "/premium.svg" : "/basic.svg"}></img>
        </PlanIcon>
        <PlanDetails>
          <span>{plan || "No Plan Selected"}</span>
          <small>Until: . . . .</small>
        </PlanDetails>
      </SubscriptionInfo>
      <OptionsIcon>
        <img src="/whitedots.svg"></img>
      </OptionsIcon>
    </SubscriptionCard>
  );
};

export default PlanDashboardCard;

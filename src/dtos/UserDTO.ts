import { AccountSetupStage } from "../entities/User";

export interface UserDTO {
  uid: string;
  name: string;
  email: string;
  birthDate: Date;
  photoUrl?: string;
  accountSetup?: {
    accountSetupCompleted: boolean;
    stage: AccountSetupStage;
  };
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
}

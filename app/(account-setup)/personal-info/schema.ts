import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }).min(1, "First name is required"),
  
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }).min(1, "Last name is required"),
  
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  
  birthDate: z.string({
    required_error: "Birth date is required",
    invalid_type_error: "Birth date must be a string",
  })
    .min(1, "Birth date is required")
    .refine((value) => {
      const date = new Date(value);
      return date < new Date();
    }, "Birth date must be in the past"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

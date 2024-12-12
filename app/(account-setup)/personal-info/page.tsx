"use client";
import { Box, Form, Logo, InputsContainer } from "./styles";
import { Formik } from "formik";
import Footer from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import InputComponent from "@/app/components/inputs/input";
import { personalInfoSchema, type PersonalInfoFormValues } from "./schema";
import { z } from "zod";
import { accountSetupStore } from "../_store";
import { useRouter } from "next/navigation";
import { AccountSetupStage } from "@/types/User";

export default function PersonalInfo() {
  const { user, updateUser } = accountSetupStore();
  const router = useRouter();

  const initialValues: PersonalInfoFormValues = {
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    birthDate: user?.birthDate || new Date().toISOString().split("T")[0],
  };

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          try {
            personalInfoSchema.parse(values);
            return {};
          } catch (error) {
            if (error instanceof z.ZodError) {
              return error.issues.reduce((acc, issue) => {
                const path = issue.path[0] as string;
                acc[path] = issue.message;
                return acc;
              }, {} as Record<string, string>);
            }
            return {};
          }
        }}
        onSubmit={(values) => {
          updateUser({
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            birthDate: values.birthDate,
            accountSetupStage: AccountSetupStage.ADD_COURSES,
          });
          router.push("/add-courses");
        }}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="introduction">
              <h2>Your Information</h2>
              <p>
                Please make sure that the information given below matches your
                actual information
              </p>
            </div>
            <InputsContainer>
              <InputComponent
                title="Your name"
                placeHolder="your name"
                type="text"
                error={touched.firstName && !!errors.firstName}
                errorMesage={touched.firstName ? errors.firstName : ""}
                value={values.firstName}
                setVariable={(value) => setFieldValue("firstName", value)}
              />
              <InputComponent
                title="Your surname"
                placeHolder="your surname"
                type="text"
                error={touched.lastName && !!errors.lastName}
                errorMesage={touched.lastName ? errors.lastName : ""}
                value={values.lastName}
                setVariable={(value) => setFieldValue("lastName", value)}
              />
              <InputComponent
                title="Your Birth Date"
                placeHolder="your birth date"
                type="date"
                error={touched.birthDate && !!errors.birthDate}
                errorMesage={touched.birthDate ? errors.birthDate : ""}
                value={values.birthDate}
                setVariable={(value) => setFieldValue("birthDate", value)}
              />
              <InputComponent
                title="Your Email"
                placeHolder="your email"
                type="email"
                error={touched.email && !!errors.email}
                errorMesage={touched.email ? errors.email : ""}
                value={values.email}
                setVariable={(value) => setFieldValue("email", value)}
              />
            </InputsContainer>
            <NextButtonComponent
              event={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
          </Form>
        )}
      </Formik>
      <Footer />
    </Box>
  );
}

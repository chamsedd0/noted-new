"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Footer from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/button/nextButton";
import InputComponent from "@/app/components/input/input";
import { createUser } from "./_actions/createUserAction";
import { getUser } from "./_actions/getUserAction";
import { personalInfoSchema, type PersonalInfoFormValues } from "./schema";

const Box = styled.div`
  background-color: #383838;
  width: 100vw;
  height: 100vh;
  padding: 60px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 60px;

  @media (max-width: 1470px) {
    padding-bottom: 60px;
    gap: 40px;
  }
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  button {
    margin-top: 48px;
  }

  .introduction {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    h2 {
      font-size: 40px;
      font-weight: 700;

      @media (max-width: 1470px) {
        font-size: 32px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      max-width: 480px;

      @media (max-width: 1470px) {
        font-size: 14px;
      }
    }
  }
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

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal columns */
  gap: 20px; /* Space between form items */
  max-width: 600px;
  width: 100%;
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: 700;
`;

export default function PersonalInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<PersonalInfoFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date(),
  });

  useEffect(() => {
    getUser().then((userData) => {
      if (userData) {
        const nameParts = userData.name.split(" ");
        setInitialValues({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          email: userData.email,
          birthDate: new Date(),
        });
      }
      setIsLoading(false);
    });
  }, []);

  const handleFormSubmit = async (values: PersonalInfoFormValues) => {
    try {
      await createUser(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    }
  };

  if (isLoading) {
    return <Loading>Loading ...</Loading>;
  }

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(personalInfoSchema)}
        onSubmit={handleFormSubmit}
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
                value={values.firstName}
                setVariable={(value) => setFieldValue("firstName", value)}
              />
              <InputComponent
                title="Your surname"
                placeHolder="your surname"
                type="text"
                error={touched.lastName && !!errors.lastName}
                value={values.lastName}
                setVariable={(value) => setFieldValue("lastName", value)}
              />
              <InputComponent
                title="Your Birth Date"
                placeHolder="your birth date"
                type="date"
                error={touched.birthDate && !!errors.birthDate}   
                value={values.birthDate?.toISOString().split("T")[0]}
                setVariable={(value) =>
                  setFieldValue("birthDate", new Date(value))
                }
              />
              <InputComponent
                title="Your Email"
                placeHolder="your email"
                type="email"
                error={touched.email && !!errors.email}
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

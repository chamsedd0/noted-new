"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Footer from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import InputComponent from "@/app/components/inputs/input";
import { getUser } from "./_actions/getUserAction";
import { personalInfoSchema, type PersonalInfoFormValues } from "./schema";
import { updateUser } from "./_actions/updateUserAction";
import { useAuthContext } from "../contexts/AuthContext";
import { z } from "zod";

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
  const { idToken } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<PersonalInfoFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const getUserData = async () => {
      if (idToken) {
        const userData = await getUser(idToken);
        if (userData) {
          setFormData({
            firstName: userData.name.split(" ")[0],
            lastName: userData.name.split(" ")[1],
            email: userData.email,
            birthDate:
              userData.birthDate || new Date().toISOString().split("T")[0],
          });
        }
      }
      setLoading(false);
    };
    getUserData();
  }, [idToken]);

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Box>
      <Logo src="/logo.svg" alt="Logo" />
      <Formik
        initialValues={formData}
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
        onSubmit={async (values, { setSubmitting }) => {
          if (idToken) {
            await updateUser(idToken, values);
            setSubmitting(false);
          }
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
                errorMesage={touched.firstName ? errors.firstName : ''}
                value={values.firstName}
                setVariable={(value) => setFieldValue("firstName", value)}
              />
              <InputComponent
                title="Your surname"
                placeHolder="your surname"
                type="text"
                error={touched.lastName && !!errors.lastName}
                errorMesage={touched.lastName ? errors.lastName : ''}
                value={values.lastName}
                setVariable={(value) => setFieldValue("lastName", value)}
              />
              <InputComponent
                title="Your Birth Date"
                placeHolder="your birth date"
                type="date"
                error={touched.birthDate && !!errors.birthDate}
                errorMesage={touched.birthDate ? errors.birthDate : ''}
                value={values.birthDate}
                setVariable={(value) => setFieldValue("birthDate", value)}
              />
              <InputComponent
                title="Your Email"
                placeHolder="your email"
                type="email"
                error={touched.email && !!errors.email}
                errorMesage={touched.email ? errors.email : ''}
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

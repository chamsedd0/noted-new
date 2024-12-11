"use client";
import { Box, Form, Logo, InputsContainer, Loading } from "./styles";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Footer from "@/app/components/preLoginFooter";
import NextButtonComponent from "@/app/components/buttons/nextButton";
import InputComponent from "@/app/components/inputs/input";
import { getUser } from "./_actions/getUserAction";
import { personalInfoSchema, type PersonalInfoFormValues } from "./schema";
import { updateUser } from "./_actions/updateUserAction";
import { z } from "zod";

export default function PersonalInfo() {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<PersonalInfoFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setInitialValues({
            firstName: userData.name.split(" ")[0] || "",
            lastName: userData.name.split(" ")[1] || "",
            email: userData.email || "",
            birthDate:
              userData.birthDate || new Date().toISOString().split("T")[0],
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading user:", error);
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <Loading>Loading...</Loading>;

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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("name", `${values.firstName} ${values.lastName}`);
            formData.append("email", values.email);
            formData.append("birthDate", values.birthDate);
            await updateUser(formData);
          } catch (error) {
            throw error;
          } finally {
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

"use client";

import { ChangeEvent } from "react";
import {
  Container,
  Input,
  Text,
} from "@/app/(user-area)/scheduler/_components/_styles/popUpInput";

interface PopUpInputProps {
  title: string;
  placeHolder: string;
  type: string;
  error: boolean;
  value: string;
  setVariable: (value: string) => void;
}

export default function PopUpInput({
  title,
  placeHolder,
  type,
  error,
  value,
  setVariable,
}: PopUpInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVariable(e.target.value);
  };

  return (
    <Container>
      <Text $error={error}>{title}</Text>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        type={type}
        $error={error}
      />
    </Container>
  );
}

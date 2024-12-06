"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const HydratedWrapper = styled.div<{ $isHydrated: boolean }>`
  opacity: ${({ $isHydrated }) => ($isHydrated ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export function Hydrated({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <HydratedWrapper $isHydrated={isHydrated}>{children}</HydratedWrapper>;
} 
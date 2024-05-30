import { ReactNode } from "react";

import { AuthContextProvider } from "../Contexts/Auth";
import { CacheItemsUserContextProvider } from "../Contexts/CacheItemsUser";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthContextProvider>
      <CacheItemsUserContextProvider>{children}</CacheItemsUserContextProvider>
    </AuthContextProvider>
  );
};

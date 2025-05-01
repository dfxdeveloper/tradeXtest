import React from "react";
import { HelmetProvider } from "react-helmet-async";

import { ConstantsProvider } from "./components/context/constants";
import { AuthProvider } from "./components/context/auth";
import { SignalsProvider } from "./components/context/signal";
import { UserCredentialsProvider } from "./components/context/user";
import { SocketProvider } from "./components/context/socket";
import { WhatsNewProvider } from "./components/context/whatsnew";

const Providers = ({ children }) => {
  return (
    <HelmetProvider>
      <ConstantsProvider>
        <UserCredentialsProvider>
          <WhatsNewProvider>
            <AuthProvider>
              <SignalsProvider>
                <SocketProvider>
                  {/* Your app components go here */}
                  {children}
                </SocketProvider>
              </SignalsProvider>
            </AuthProvider>
          </WhatsNewProvider>
        </UserCredentialsProvider>
      </ConstantsProvider>
    </HelmetProvider>
  );
};

export default Providers;

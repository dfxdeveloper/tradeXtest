import React from 'react'; 
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
const googleClientId = "157516223299-9qt4mjvbvv6hdcullaih2pk167otgpl2.apps.googleusercontent.com";

const GoogleAuthLogin = ({ onLoginSuccess, children }) => {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLoginButton onLoginSuccess={onLoginSuccess}>
          {children}
        </GoogleLoginButton>
      </GoogleOAuthProvider>
    );
};

const GoogleLoginButton = ({ onLoginSuccess, children }) => {
    const login = useGoogleLogin({
      onSuccess: onLoginSuccess,
      onError: (error) => console.error('Google Login Error:', error),  
      flow: 'auth-code',  // Use Authorization Code flow to get the code
    });
    return (
      React.cloneElement(children, { onClick: login })
    );
};


  
export default GoogleAuthLogin;
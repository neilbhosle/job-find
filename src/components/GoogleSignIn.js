import React, { useEffect } from 'react';

const GoogleSignIn = () => {
  const onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '398547143957-ctbtqpdpbssnt8667hf5ljli3lnu6db5.apps.googleusercontent.com',
          }).then(() => {
            window.gapi.signin2.render('google-signin-button', {
              scope: 'profile email',
              width: 240,
              height: 50,
              longtitle: true,
              theme: 'dark',
              onsuccess: onSignIn,
            });
          });
        });
      }
    };

    if (window.gapi) {
      initializeGoogleSignIn();
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div id="google-signin-button"></div>
      <button onClick={() => window.signOut()}>Sign out</button>
    </div>
  );
};

export default GoogleSignIn;

import React from 'react';
import { useDispatch } from 'react-redux';

import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from 'react-facebook-login-lite';

import {
  googleLogin,
  facebookLogin,
} from '../../redux/actions/authAction';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  };

  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse;
    dispatch(facebookLogin(accessToken, userID));
  };

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          client_id="967464409989-21e4otqnf8rld65bcsac1uo94e9bl6vn.apps.googleusercontent.com"
          cookiepolicy="single_host_origin"
          onSuccess={onSuccess}
        />
      </div>

      <div className="my-2">
        <FacebookLogin appId="224166089582968" onSuccess={onFBSuccess} />
      </div>
    </>
  );
};

export default SocialLogin;

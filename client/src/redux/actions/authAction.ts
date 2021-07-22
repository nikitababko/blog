import { Dispatch } from 'redux';

import { AUTH, IAuthType } from 'redux/types/authType';
import { IUserLogin } from 'utils/TypeScript';
import { postAPI } from 'utils/FetchData';

export const login =
  (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
    try {
      const res = await postAPI('login', userLogin);

      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

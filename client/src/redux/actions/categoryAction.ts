import { Dispatch } from 'redux';

import { ALERT, IAlertType } from 'redux/types/alertType';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
} from 'redux/types/categoryType';

import { postAPI, getAPI } from 'utils/FetchData';

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      });

      const res = await postAPI('category', { name }, token);

      dispatch({
        type: CREATE_CATEGORY,
        payload: res.data.newCategory,
      });

      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      });
    }
  };

export const getCategories =
  () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      });

      const res = await getAPI('category');

      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.categories,
      });

      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.msg },
      });
    }
  };

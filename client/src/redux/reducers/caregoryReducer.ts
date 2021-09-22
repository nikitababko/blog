import * as type from 'redux/types/categoryType';
import { ICategory } from 'utils/TypeScript';

const categoryReducer = (
  state: ICategory[] = [],
  action: type.ICategoryType
): ICategory[] => {
  switch (action.type) {
    case type.CREATE_CATEGORY:
      return [action.payload, ...state];

    case type.GET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};

export default categoryReducer;

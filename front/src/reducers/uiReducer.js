import { types } from '../types/types';

export const initialUiState = {
  loading: false,
};

export const uiReducer = (state = initialUiState, action) => {
  switch (action.type) {
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.uiEndLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

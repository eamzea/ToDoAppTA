import { types } from '../types/types';

const uiStartLoading = () => ({
  type: types.uiStartLoading,
});

const uiEndLoading = () => ({
  type: types.uiEndLoading,
});

const UiActions = {
  startLoading: uiStartLoading,
  endLoading: uiEndLoading,
};

export default UiActions;

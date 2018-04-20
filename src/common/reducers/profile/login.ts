import { IProfileLoginState } from "common/types";
import { actions } from "common/actions";
import reducer from "../reducer";

const initialState = {
  errors: [],
  blockingOperation: null,
} as IProfileLoginState;

export default reducer<IProfileLoginState>(initialState, on => {
  on(actions.attemptLogin, (state, action) => {
    return {
      ...state,
      errors: [],
      blockingOperation: {
        icon: "heart-filled",
        message: ["login.status.login"],
        bps: 0,
        eta: 0,
      },
    };
  });

  on(actions.loginFailed, (state, action) => {
    const { error, username } = action.payload;

    return {
      ...initialState,
      error,
      blockingOperation: null,
      lastUsername: username,
    };
  });

  on(actions.loginCancelled, (state, action) => {
    return {
      ...state,
      blockingOperation: null,
      picking: false,
    };
  });

  on(actions.loginSucceeded, (state, action) => {
    return initialState;
  });

  on(actions.logout, (state, action) => {
    return initialState;
  });
});

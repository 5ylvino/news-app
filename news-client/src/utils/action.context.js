import { createContext, useContext, useReducer } from 'react';

const initialState = {
  target: '',
  payload: ''
};

const StateContext = createContext(initialState);
const ActionContext = createContext(undefined);

export const TransporterManager = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <ActionContext.Provider value={dispatch}>
        {children}
      </ActionContext.Provider>
    </StateContext.Provider>
  );
};

const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case 'open':
      return { ...state, ...action };
    case 'close':
      return { ...state, ...action };
    default:
      return state;
  }
};

export const useTransporter = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(ActionContext);

  if (dispatch === undefined) {
    throw new Error('Please use under Transport manager');
  }

  return {
    ...state,
    send({ payload, target }) {
      dispatch({ type: 'open', target, payload });
    },
    close() {
      dispatch({ type: 'close', target: null, payload: null });
    }
  };
};

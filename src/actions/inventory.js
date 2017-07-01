/*
import type { counterStateType } from '../reducers/counter';

type actionType = {
  type: string
};
*/
import { initInventory as apiInitInventory, validateInventory as apiValidateInventory } from '../api/index';

export const INIT_INVENTORY = 'INIT_INVENTORY';
export const SET_INVENTORY = 'SET_INVENTORY';
export const VALIDATE_INVENTORY_REQUEST = 'VALIDATE_INVENTORY_REQUEST';
export const VALIDATE_INVENTORY_SUCCESS = 'VALIDATE_INVENTORY_SUCCESS';
export const VALIDATE_INVENTORY_FAILURE = 'VALIDATE_INVENTORY_FAILURE';

export const initInventory = () => (
  {
    type: INIT_INVENTORY,
    payload: apiInitInventory()
  }
);

export const setInventory = (inv) => (
  {
    type: SET_INVENTORY,
    payload: inv
  }
);


export const validateInventorySuccess = () => (
  {
    type: VALIDATE_INVENTORY_SUCCESS
  }
);

export const validateInventoryFailure = (error) => (
  {
    type: VALIDATE_INVENTORY_FAILURE,
    payload: error
  }
);


export const validateInventory = () => {
  return (dispatch,getState) => {
    let inv = getState().inventory;
    let i = apiValidateInventory(inv);
    console.log(i);

    if (i.isValid) {
      return Promise.resolve(dispatch(validateInventorySuccess()));
    } else {
      return Promise.resolve(dispatch(validateInventoryFailure(i.error)));
    }
  }
};

/*
export function incrementAsync(delay: number = 1000) {
  return (dispatch: (action: actionType) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
*/

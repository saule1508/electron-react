// @flow
import { INIT_INVENTORY, SET_INVENTORY,
  VALIDATE_INVENTORY_REQUEST, VALIDATE_INVENTORY_SUCCESS, VALIDATE_INVENTORY_FAILURE } from '../actions/inventory';


export default function inventory(state = {hostname: '',ip: '',isValid: false,error: null}, action) {
  switch (action.type) {
    case INIT_INVENTORY:
      return Object.assign({}, state, action.payload);
    case SET_INVENTORY:
      return Object.assign({}, state, action.payload);
    case VALIDATE_INVENTORY_REQUEST:
      return state;
    case VALIDATE_INVENTORY_SUCCESS:
      return Object.assign({}, state, { isValid: true });
    case VALIDATE_INVENTORY_FAILURE:
      return Object.assign({}, state, { isValid: false, error: action.payload });
    default:
      return state;
  }
}

import config from 'config/app'

import {
  CURRENT_USER_REQUEST_ERROR,
  CURRENT_USER_REQUEST_SUCCESS,
  CURRENT_USER_FETCHING,

  CLAIM_ERROR,
  CLAIM_SUCCESS,
  IS_CLAIMING,

} from './actions'

const initialState = {
  loading: false,
  login: false,
  user: {},
  items: {},
}

export default function currentUserReducer(state = initialState,  { type, payload } = action) {
  switch (type) {
    case CURRENT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        login: true,
        user: payload.user,
        errorGlobal: ''
      }
      break;
    case CURRENT_USER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        errorGlobal: 'Không có thông tin user',
      }
      break;
    case CURRENT_USER_FETCHING:
      return {
        ...state,
        loading: true
      }
      break;

    //CLAIM
    case CLAIM_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload]: {
            ...state.items[payload],
            exchanged: true
          }
        },
        isClaiming: false
      }
      break;
    case CLAIM_ERROR:
      return {
        ...state,
        isClaiming: false
      }
      break;
    case IS_CLAIMING:
      return {
        ...state,
        isClaiming: true
      }
      break;
  
    default:
      return state
  }
}

import request from "lib/request"
import config from "config/app"
import lib from 'lib/commons'
import lang from "lng/index"
const lng = lang[config.lng]

export const CURRENT_USER_REQUEST         = 'CURRENT_USER_REQUEST'
export const CURRENT_USER_REQUEST_ERROR   = 'CURRENT_USER_REQUEST_ERROR'
export const CURRENT_USER_REQUEST_SUCCESS = 'CURRENT_USER_REQUEST_SUCCESS'
export const CURRENT_USER_FETCHING        = 'CURRENT_USER_FETCHING'

export const CLAIM         = 'CLAIM'
export const CLAIM_ERROR   = 'CLAIM_ERROR'
export const CLAIM_SUCCESS = 'CLAIM_SUCCESS'
export const IS_CLAIMING   = 'IS_CLAIMING'

export const SELECT_ITEM         = 'SELECT_ITEM'
export const SELECT_ITEM_ERROR   = 'SELECT_ITEM_ERROR'
export const SELECT_ITEM_SUCCESS = 'SELECT_ITEM_SUCCESS'
export const IS_SELECTING_ITEM   = 'IS_SELECTING_ITEM'

export const isCurrentUserFetching = () => {
  return {
    type: CURRENT_USER_FETCHING
  }
}

export const getCurrentUser = () => {
  return (dispatch, getState) => {
    dispatch(isCurrentUserFetching());
    request('api/user/get').then(function(response) {
      if(response.status == 'successful') {
        dispatch(getCurrentUserSuccess(response));
      } else {
        if(response.error_code == 'no_account') {
          lib.showDownlad()
        }
        dispatch(getCurrentUserError(response))
      }
    })
  }
}

export const getCurrentUserSuccess = (response) => {
  return {
    type: CURRENT_USER_REQUEST_SUCCESS,
    payload: response.payload
  }
}

export const getCurrentUserError = (response) => {
  return {
    type: CURRENT_USER_REQUEST_ERROR,
    payload: response.payload
  }
}

//Claim
export const isClaiming = (response) => {
  return {
    type: IS_CLAIMING,
  }
}
export const claim = (reward) => {
  return (dispatch, getState) => {
    dispatch(isClaiming());
    request('api/user/exchange', 'POST', {
      body: JSON.stringify({
        pack_id: parseInt(reward.pack_id)
      })
    }).then(function(response) {
      if(response.status == 'successful') {
        lib.showMessage('<p class="text-center">Bạn đã nhận được ' + reward.name + 'x' + reward.quantity + '</p>')
        dispatch(claimSuccess(reward.pack_id))
      } else {
        lib.showError(response.payload.error_code)
        dispatch(claimError(response))
      }
    })
  }
}
export const claimSuccess = (response) => {
  return {
    type: CLAIM_SUCCESS,
    payload: response
  }
}
export const claimError = (response) => {
  return {
    type: CLAIM_ERROR,
    payload: response.payload
  }
}

//Select
export const isSelectingItem = (response) => {
  return {
    type: IS_SELECTING_ITEM,
  }
}
export const selectItem = (item) => {
  return (dispatch, getState) => {
    dispatch(isSelectingItem());
    request('api/user/select-item', 'POST', {
      body: JSON.stringify({
        item_id: parseInt(item.id)
      })
    }).then(function(response) {
      if(response.status == 'successful') {
        lib.showMessage(lng.youSelected + ` <span class="highlight">${item.item_name}</span>`)
        dispatch(selectItemSuccess(item))
      } else {
        lib.showError(response.error_code)
        dispatch(selectItemError(response))
      }
    })
  }
}
export const selectItemSuccess = (response) => {
  return {
    type: SELECT_ITEM_SUCCESS,
    payload: response
  }
}
export const selectItemError = (response) => {
  return {
    type: SELECT_ITEM_ERROR,
    payload: response
  }
}

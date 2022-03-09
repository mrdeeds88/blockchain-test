import cookie from 'js-cookie';
import config from "config/app.js";
import Strings from './strings.js';
import queryString from "query-string";
import Commons from './commons.js';


/**
 * AJAX post
 * @param: data: could be JSON or null
 */
let post = (url, data) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + url,
    data: JSON.stringify(data == null ? {} : data),
    beforeSend: request => {
      request.setRequestHeader('X-CSRFToken', cookie.get('csrftoken'));
    },
    xhrFields: {
      withCredentials: true
    }
  });
};

/**
 * AJAX get
 * @param data: could be JSON or null
 */
let get = (url, data) => {
  let urlWithData = config.apiUrl + url + (data == null ? "" : ("?" + queryString.stringify(data)));
  return $.ajax(urlWithData, {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    }
  });
};


class AutoRedux {

  constructor(method, url) {
    if(method != 'post' && method != 'get') {
      throw new Error('Invalid method: ' + method)
    }
    if(Strings.isEmpty(url)) {
      throw new Error('Invalid ' + method + ' url: ' + url)
    }

    this.method = method;
    this.url = url;
    this.data = {
      payload: null,
      reduxType: null,
      then: null,
      fail: null
    }
  }

  payload(payload) {
    this.data.payload = payload;
    return this;
  }

  reduxType(reduxType) {
    this.data.reduxType = reduxType;
    return this;
  }

  then(thenFx) {
    this.data.then = thenFx;
    return this;
  }

  fail(failFx) {
    this.data.fail = failFx;
    return this;
  }

  build() {
    if(Strings.isEmpty(this.data.reduxType)) {
      throw new Error('Invalid reduxType value: ' + this.data.reduxType);
    }
    return dispatch => {
      dispatch({
        type: this.data.reduxType,
        status: 'init',
        payload: this.data.payload
      });
      let promise = this.method == 'get' ? get(this.url, this.data.payload) : post(this.url, this.data.payload)
      promise.then(response => {
        const status = response.status;
        //Validate data:
        if(Strings.isEmpty(response.status)) {
          if (Commons.isJsonString(response)) {
            throw new Error('Missing status field from response. Cannot dispatch. Response: ' + JSON.stringify(response))
          }
        }
        //Dispatch response:
        dispatch({
          type: this.data.reduxType,
          status,
          payload: response.payload
        })
        if(this.data.then != null) {
          this.data.then(response, dispatch)
        }
      }).fail((error) => {
        if(this.data.fail != null) {
          this.data.fail(error, dispatch);
        }
      });
    }
  }
}

export default {
  autoPost: (url) => new AutoRedux('post', url),
  autoGet: (url) =>  new AutoRedux('get', url),
  post,
  get
}

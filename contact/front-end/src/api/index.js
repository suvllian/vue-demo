import { jsonp, parseParams, addParamsToUrl } from '../utils/jsonp.js'
import { APIURL, postCongig } from '../config'
import axios from 'axios'
axios.defaults.withCredentials = true

const json = (url, params = {}) => {
  const urlWithParams = addParamsToUrl(url, params)
  return axios.get(urlWithParams)
}

export default {
  getMethodByJsonp (path, params) {
    return jsonp(`${APIURL}/${path}`, params)
  },
  getMethodByJson (params) {
    return json(APIURL, params)
  },
  postMethod (path, params) {
    return axios.post(APIURL, parseParams(params), postCongig)
  }
}

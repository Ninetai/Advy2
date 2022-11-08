import axios from "axios";
import store from "@/store";
import { API_HOST } from "@/config";

export class ApiService {
  get authToken() {
    return store.getters.getAuthToken;
  }

  get(url, params = {}) {
    let axiosParams = {
      baseURL: API_HOST,
      method: "GET",
      url: url,
      headers: {},
      params: params,
    };
    if (localStorage.getItem("accessToken")) {
      axiosParams["headers"] = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
    }

    return axios
      .create(axiosParams)
      .get(url)
      .catch((err) => {
        if (err.response.status === 401) {
          store.dispatch("postClientRefresh");
          // window.location.reload();
        }
      });
  }

  post(url, params = {}, headers = {}) {
    let axiosParams = {
      baseURL: API_HOST,
      headers: headers,
    };
    if (localStorage.getItem("accessToken")) {
      axiosParams["headers"] = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
    }
    return axios.create(axiosParams).post(url, params);
    /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
  }

  postFormData(url, formData = {}) {
    return axios
      .create({
        baseURL: API_HOST,
        method: "POST",
        url: `/api/adv/campaign_files/`,
        headers: {
          Authorization: "Bearer " + store.getters.getAuthToken,
        },
        data: formData,
      })
      .post(url, formData);
    /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
  }

  put(url, params = {}) {
    return axios
      .create({
        baseURL: API_HOST,
        headers: {
          Authorization: "Bearer " + store.getters.getAuthToken,
        },
      })
      .put(url, params);
    /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
  }

  delete(url) {
    return axios
      .create({
        baseURL: API_HOST,
        headers: {
          Authorization: "Bearer " + store.getters.getAuthToken,
        },
      })
      .delete(url);
    /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
  }
}

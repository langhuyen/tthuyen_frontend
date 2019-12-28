import axios from "axios";

var api = {
    getAll: function (url) {
        let me = this;
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

        return new Promise(function (resolve, reject) {
            axios
                .get(url)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error

                    if (error.response.status == 401) me.getNewToken();
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    getById: function (url, id) {
        let me = this;
        var urlRequest = url + "?id=" + id;
        return new Promise(function (resolve, reject) {
            axios
                .get(urlRequest)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error

                    if (error.response.status == 401) me.getNewToken();
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    delete: function (url, Entity) {
        let me = this;
        return new Promise(function (resolve, reject) {
            axios
                .post(url, Entity)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error

                    if (error.response.status == 401) me.getNewToken();
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    insert: function (url, Entity) {
        let me = this;
        return new Promise(function (resolve, reject) {
            axios
                .post(url, Entity)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error

                    if (error.response.status == 401) me.getNewToken();
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    update: function (url, Entity) {
        return new Promise(function (resolve, reject) {
            axios
                .put(url, Entity)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error
                    if (error.response.status == 401) me.getNewToken();
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    post: function (url, Entity) {
        let me = this;
        return new Promise(function (resolve, reject) {
            axios
                .post(url, Entity)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error
                    if (error.response.status == 401) me.getNewToken();
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    getNewToken() {
        var url = `http://localhost:9000/oauth/token?refresh_token=${localStorage.getItem("refresh_token")}&grant_type=refresh_token`;

        axios
            .post(url, null, {
                headers: {
                    Authorization: "Basic " + btoa("loginservice:loginservice"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(result => {
                localStorage.setItem("access_token", result.data.access_token);
                localStorage.setItem("refresh_token", result.data.refresh_token);

            });
    }
};

export default api;
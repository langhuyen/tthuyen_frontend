import axios from "axios";

var api = {
    getAll: function (url) {
        return new Promise(function (resolve, reject) {
            axios
                .get(url)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    getById: function (url, id) {
        var urlRequest = url + "/:" + id;
        return new Promise(function (resolve, reject) {
            axios
                .get(urlRequest)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    delete: function (url, Entity) {
        return new Promise(function (resolve, reject) {
            axios
                .post(url, Entity)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    },
    insert: function (url, Entity) {
        return new Promise(function (resolve, reject) {
            axios
                .post(url, Entity)
                .then(function (response) {
                    // handle success
                    resolve(response);
                })
                .catch(function (error) {
                    // handle error
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
                    reject(error);
                })
                .finally(function () {
                    // always executed
                });
        });
    }
};

export default api;
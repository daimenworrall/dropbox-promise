/*
  NodeJS Dropbox Promise Wrapper
  Daimen Worrall
  https://www.dropbox.com/developers/documentation/http/documentation
*/

const request = require('request');


exports.authenticate = function(key, redirect_uri) {
  return new Promise(function(resolve, reject) {
    if (key === "" || redirect_uri === "") {
      return reject("Missing Client Key and/or Client Secret Key.");
    };
    return resolve( "https://www.dropbox.com/oauth2/authorize?client_id=" + key + "&response_type=code&redirect_uri=" + redirect_uri );
  });
}

exports.accessToken = function(key, secret, auth_code, redirect_url) {
  return new Promise(function(resolve, reject) {
    if (key === "" || secret === "" || auth_code === "" || redirect_url === "") {
      return reject("Missing Auth Code and/or Redirect URL.");
    };

    let url = "https://api.dropboxapi.com/oauth2/token";
    let body = {
      code: auth_code,
      grant_type: "authorization_code",
      redirect_uri: redirect_url,
      client_id: key,
      client_secret: secret
    };
    request.post(url, {form: body, json: true}, function(error, result, body) {
      if (error) return reject(error);
      return resolve(body);
    });
  });
}
exports.api = function(access_token) {
  var access_token = access_token;

  return {
    unlink: function() {
      return new Promise(function(resolve, reject) {

        let query = {
          url: "https://api.dropboxapi.com/2/auth/token/revoke",
          json: true,
          headers: {
            Authorization: "Bearer " + access_token
          }
        }

        request.post(query, function(error, result, body) {
          if (error) return reject(error);
          return resolve(body);
        });
      });
    },
    account: function() {
      return new Promise(function(resolve, reject) {

        let query = {
          url: "https://api.dropboxapi.com/2/users/get_current_account",
          json: true,
          headers: {
            Authorization: "Bearer " + access_token
          }
        }

        request.post(query, function(error, result, body) {
          if (error) return reject(error);
          return resolve(body);
        });
      });
    },
    storage: function() {
      return new Promise(function(resolve, reject) {

        let query = {
          url: "https://api.dropboxapi.com/2/users/get_space_usage",
          json: true,
          headers: {
            Authorization: "Bearer " + access_token
          }
        }

        request.post(query, function(error, result, body) {
          if (error) return reject(error);
          return resolve(body);
        });
      });
    },
    createFolder: function(path) {
      return new Promise(function(resolve, reject) {
        if (path === "") {
          return reject("Missing Path.");
        };

        let query = {
          url: "https://api.dropboxapi.com/2/files/create_folder_v2",
          json: true,
          headers: {
            Authorization: "Bearer " + access_token
          },
          form: {
            path: path,
            autorename: false
          }
        }

        request.post(query, function(error, result, body) {
          if (error) return reject(error);
          return resolve(body);
        });
      });
    }

  }
};

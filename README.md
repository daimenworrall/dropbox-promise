# Dropbox Promise

  A simple Dropbox promise wrapper.

## Installation
  `npm install --save dropbox-promise`

## Usage

  Before starting anything you need to go create your app over at: https://www.dropbox.com/developers/apps then go ahead and grab your Key and Secret.

### Include

  Add the following to the top of your project (with the other dependencies):

  ```javascript
  const dropbox = require('dropbox-promise');
  const key = ""; //Dropbox API Key
  const secret = ""; //Dropbox API Secret Key
  const redirect_url = ""; //URL that the user will be sent to after Dropbox authentication
  ```

### Authentication

  First you must generate a URL for the user to be redirected to.

  ```javascript
  dropbox.authenticate(key, redirect_url)
      .then(function(url) {
        //Returns a URL to redirect the user to.
      })
      .catch(function(error) {
        //Do something with the error.
      });
  ```

  When the user has authenticated, they will be returned to the callback URL supplied with an authentication code. We need to turn this into an access code.

  ```javascript
  dropbox.accessToken(key, secret, authentication_code, redirect_url) //authentication_code is supplied by dropbox after user authentication
    .then(function(result) {
      //Returns the users access_token.
      let access_token = result.access_token;
    })
    .catch(function(error) {
      //Do something with the error.
    });
  ```

### API

  To use the API, you must create an API object:

  ```javascript
  let api = dropbox.api( access_token );
  ```

  This gives us access to various functions. Here's an example of how to use this:

  ```javascript
  let api = dropbox.api( access_token );

  api.unlink() //Unlink our application from the users Dropbox account
      .then(function(result) { //result if any returned
        //Success
      })
      .catch(function(error) {
        //Do something with the error.
      });
  ```


### Available APIs

  ```javascript
  api.unlink() //Unlinks our application from the users Dropbox account
  api.account() //Returns information about the users account
  api.storage() //Returns information regarding the users storage. How much they have and how much they've used
  api.createFolder(path) //Create a folder in the users Dropbox (in our application folder if set up that way)
  api.listFolder(path, recursive, include_media_info, include_deleted, include_has_explicit_shared_members, include_mounted_folders) //List the contents of a folder. All are optional except path
  api.getThumbnail(path, format, size) //Get a thumbnail for a file. Returns a downloaded image. All are optional except path
  ```

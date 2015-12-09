
var app = angular.module('zombify',['ngRoute'])

app.controller('authController',['googleAuth',function(googleAuth){
    var ac = this;

    ac.client_id = googleAuth.CLIENT_ID;
    ac.scopes = googleAuth.SCOPES;

    ac.onAuth = function(apiKey){
        console.log(apiKey);
    }

    ac.handleAuthClick = function(event) {
    gapi.auth.authorize(
      {client_id: ac.client_id, scope: ac.scopes, immediate: false},
      handleAuthResult);
    return false;
  }

}])

app.controller('TabController', ['$location', function($location){
    var tc = this;
    tc.active = function(path){
        return $location.path().match(path);
    };
}]);

app.value('googleAuth',{
    "CLIENT_ID" : '613139624606-6ehoqh6b9qorgltqqaisnun1am8b8hpj.apps.googleusercontent.com',
    "SCOPES" : 'https://www.googleapis.com/auth/drive.metadata.readonly'
})
//
//app.directive('oauthButton', [function(){
//
//    var od = this;
//
//        return
//
//    }]);

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/',{
            templateUrl:'index.html'
        })
        .when('/list',{
            templateUrl:'templates/list.html'
        })
        .when('/document',{
            templateUrl:'templates/document.html'
        })
        .when('/oauth',{
            templateUrl:'templates/oauth.html'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);


// https://stackoverflow.com/questions/11578506/google-drive-using-javascript-handling-file-content
//gapi.client.request({
//    'path': '/drive/v2/files/'+theID,
//    'method': 'GET',
//    callback: function ( theResponseJS, theResponseTXT ) {
//        var myToken = gapi.auth.getToken();
//        var myXHR   = new XMLHttpRequest();
//        myXHR.open('GET', theResponseJS.downloadUrl, true );
//        myXHR.setRequestHeader('Authorization', 'Bearer ' + myToken.access_token );
//        myXHR.onreadystatechange = function( theProgressEvent ) {
//            if (myXHR.readyState == 4) {
////          1=connection ok, 2=Request received, 3=running, 4=terminated
//                if ( myXHR.status == 200 ) {
////              200=OK
//                    console.log( myXHR.response );
//                }
//            }
//        }
//        myXHR.send();
//    }
//});

//$(document).ready(function(){
//  var action;
//  if(window.action == 'list'){
//    action = listFiles;
//  } else if(window.action = 'doc'){
//    action = displayFile;
//  }
//
//  /**
//   * Check if current user has authorized this application.
//   */
//  window.checkAuth = function() {
//    gapi.auth.authorize(
//      {
//        'client_id': CLIENT_ID,
//        'scope': SCOPES.join(' '),
//        'immediate': true
//      }, handleAuthResult);
//  };
//
//  /**
//   * Handle response from authorization server.
//   *
//   * @param {Object} authResult Authorization result.
//   */
//  function handleAuthResult(authResult) {
//    var authorizeDiv = document.getElementById('authorize-div');
//    if (authResult && !authResult.error) {
//      // Hide auth UI, then load client library.
//      authorizeDiv.style.display = 'none';
//      loadDriveApi();
//    } else {
//      // Show auth UI, allowing the user to initiate authorization by
//      // clicking authorize button.
//      authorizeDiv.style.display = 'inline';
//    }
//  }
//
//  /**
//   * Initiate auth flow in response to user clicking authorize button.
//   *
//   * @param {Event} event Button click event.
//   */
//  function handleAuthClick(event) {
//    gapi.auth.authorize(
//      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
//      handleAuthResult);
//    return false;
//  }
//
//  /**
//   * Load Drive API client library.
//   */
//  function loadDriveApi() {
//    gapi.client.load('drive', 'v2', action);
//  }
//
//  /**
//   * Print files.
//   */
//  function listFiles() {
//    var request = gapi.client.drive.files.list({
//        'maxResults': 10,
//        'q': "mimeType = 'application/vnd.google-apps.document'"
//      });
//
//      request.execute(function(resp) {
//        var files = resp.items;
//        if (files && files.length > 0) {
//          for (var i = 0; i < files.length; i++) {
//            var file = files[i];
//            appendLink(file.id, file.title);
//          }
//        } else {
//          appendLink('', 'No files found.');
//        }
//      });
//  }
//
//  function displayFile() {
//    fileId = window.location.hash.substring(1);
//    var request = gapi.client.drive.files.get({fileId: fileId});
//
//    request.execute(function(resp) {
//      var accessToken = gapi.auth.getToken().access_token;
//
//      $.ajax({
//        url: resp.exportLinks["text/plain"],
//        type: "GET",
//        beforeSend: function(xhr){
//          xhr.setRequestHeader('Authorization', "Bearer "+accessToken);
//        },
//        success: function( data ) {
//          $('#output').html(data.replace(/\n/g, "<br>"));
//        }
//      });
//
//    });
//  }
//
//  /**
//   * Append a link element to the body containing the given text
//   * and a link to the /doc page.
//   *
//   * @param {string} id Id to be used in the link's href attribute.
//   * @param {string} text Text to be placed in a element.
//   */
//  function appendLink(id, text){
//    if(id != ''){
//      var li = $('<li></li>');
//      var link = $('<a></a>');
//      link.attr('href', '/doc.html#'+id);
//      link.html(text);
//      li.append(link);
//      $('#output ul').append(li);
//    } else {
//      $('#output').append(text);
//    }
//  }
//
//  $('#authorize-btn').click(handleAuthClick);
//
//
//});

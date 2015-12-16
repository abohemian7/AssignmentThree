
var app = angular.module('zombify',['ngRoute'])

app.controller('authController',['$scope','googleCredentials',function($scope, googleCredentials){
    var ac = this;

    ac.client_id = googleCredentials.CLIENT_ID;
    ac.scopes = googleCredentials.SCOPES;

    var handleAuthResult = function(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            authorizeDiv.style.display = 'none';
            loadDriveApi();
        } else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            authorizeDiv.style.display = 'inline';
        }
    };

    var checkAuth = function() {
        gapi.auth.authorize(
            {
                'client_id': googleCredentials.CLIENT_ID,
                'scope': googleCredentials.SCOPES.join(' '),
                'immediate': true
            }, handleAuthResult);
    };

    var handleAuthClick = function(event) {
        gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            handleAuthResult);
        return false;
    }

    ac.onAuth = function(apiKey){
        console.log(apiKey);



    }
    //
    //ac.handleAuthClick = function(event) {
    //    gapi.auth.authorize(
    //      {client_id: ac.client_id, scope: ac.scopes, immediate: false},
    //      handleAuthResult);
    //    return false;
    //}

}]);

app.controller('TabController', ['$location', function($location){
    var tc = this;
    tc.active = function(path){
        return $location.path().match(path);
    };
}]);

app.controller('ListController', ['ListSvc','zombieTranslator',function(ListSvc, zombieTranslator){

    var lc = this;

    lc.testVals = [1,2,3];

    lc.gDocs = ListSvc;

    lc.translate


}]);

app.value('zombieAPI',{
   "zombieTranslator": 'http://ancient-anchorage-9224.herokuapp.com/zombify?q='
});

app.factory('zombieTranslator',['zombieAPI','$http',function(zombieAPI, $http){

    var translator = {};

    translator.toZombie = function(text){
        return $http.get(zombieAPI.zombieTranslator + text);
    };

    return translator;

}]);

app.service('ListSvc',[function(){
    // list documents here
    var documents = [
        {"id":"1234","title":"first", "body": "this is the first test body"},
        {"id":"2345","title":"second", "body": "this is the second test body"},
        {"id":"3456","title":"third", "body": "this is the third test body"}
    ];

    return documents;

}]);

app.directive('oauth', [function(){

        return {
            restrict: 'E',
            controller: 'authController',
            templateUrl: 'templates/auth-directive.html'
        };
    }]);

app.value('googleCredentials',{
    "CLIENT_ID" : '613139624606-6ehoqh6b9qorgltqqaisnun1am8b8hpj.apps.googleusercontent.com',
    "SCOPES" : 'https://www.googleapis.com/auth/drive.metadata.readonly'
});

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
            templateUrl:'templates/oauth.html'
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

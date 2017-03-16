'use strict';
/* Controllers */
var barListControllers = angular.module('barListControllers', ["firebase", 'ui.bootstrap']);
barListControllers.controller('BarListCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
    $scope.orderProp = 'type';
    // sets check box filters 
    $('.category').on('change', function() {
      $scope.category_list = [];
      $('#filters :input:checked').each(function() {
        $scope.category = $(this).val();
        $scope.category_list.push($scope.category); //Push each check item's value into an array
      });
      if ($scope.category_list.length == 0) {
        $('.resultblock').fadeIn();
      } else {
        $('.resultblock').each(function() {
          var item = $(this).attr('data-tag');
          if (jQuery.inArray(item, $scope.category_list) > -1) //Check if data-tag's value is in array
            $(this).fadeIn('slow');
          else $(this).hide();
        });
      }
    });
    //$("span.chip").justtext(); //return "A quick brown fox" 
    //map options navigation
    $('li .newsearch').on('click', function() {
      $('input#barQuery').val('');
      $('.opened').toggleClass('opened');
      $('div.form-inline').toggleClass('opened');
    })
    $('li .getquery').on('click', function() {
      $('.opened').toggleClass('opened');
      $('div.querySort').toggleClass('opened');
    })
    $('li .sort').on('click', function() {
      $('.opened').toggleClass('opened');
      $('div.sorting').toggleClass('opened');
    })
    $scope.refresh = function() {
      $scope.query = '';
      $scope.category_list = [];
      $('#filters :input:checked').attr('checked', false); // Unchecks it
      $(".bars li").css("display", "flex");
    }
    $scope.close = function() {
      $('.opened').toggleClass('opened');
      $scope.category_list = [];
      $('#filters :input:checked').attr('checked', false); // Unchecks it
    };
    $('button#back-to-top').on('click', function() {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    })
    $scope.navigate = function(lat, lng, name) {
      var ua = navigator.userAgent.toLowerCase();

      function iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
          // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
          var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
      }
      var ver = iOSversion() || [0];
      var addressLongLat = lat + ',' + lng
      if (ver[0] >= 5) {
        window.open("http://maps.apple.com/?q=" + name, '_system');
        if (navigator.userAgent.match('CriOS')) {
          window.open("comgooglemaps://?q=" + name);
          // window.open("geo:0,0?q="+ name , '_system');
        }
      } else if ((ua.indexOf("android") !== -1)) {
        //window.open("geo:"+addressLongLat);
        window.open("geo:0,0?q=" + name, '_system');
      } else {
        //window.open("http://maps.google.com/?q="+addressLongLat, '_system');
        window.open('https://www.google.com/maps/place/?key=AIzaSyCXOqIYw5VQH9kCQwj3buLfVV3vHvKfxsM&q=' + name);
      }
    };
  }
]);
// barListControllers.controller('BarDetailCtrl', ['$scope', '$routeParams', 'Data',
//   function($scope, $routeParams, Data) {
//     $scope.data = Data.get({datamarkerId: $routeParams.datamarkerId}, function(data) {
//       $scope.mainImageUrl = data.images[0];
//     });
//     $scope.setImage = function(image) {
//       $scope.mainImageUrl = image;
//     };
//   }]);
barListControllers.controller('RecommendedListView', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
    $scope.features = function(datas) {
      return datas.features;
    };
    //  $(".chip").each(function(){
    //      $(this).contents().filter(function(){ 
    //       return this.nodeType == 3; 
    //     })[0].nodeValue = ""
    //   }); 
    $scope.wine = function(datas) {
      return datas.type === "Wine Bar";
    };
    $scope.breweries = function(datas) {
      return datas.type === "Brewery";
    };
  }
]);
barListControllers.controller('HomeCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
  }
]);
barListControllers.controller('NavCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
  }
]);
barListControllers.controller('FooterCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
  }
]);
barListControllers.controller('FormController', ['$scope', '$http', '$window',
  function($scope, $http, $window) {
    var type = this;
    type.meals = [];
    // Call the form data
    $http.get('../json/form-meals.json').success(function(data) {
      type.meals = data;
    });
    $scope.booking = {};
    console.log($scope.booking);
    // watch for a change in the totalDays or groupSize
    $scope.$watchGroup(['booking.totalDays', 'booking.groupSize'], function(value) {
      total();
    });
    // send data to action.php on submit
    $scope.handleFormSubmit = function(booking) {
      /*----
      Un comment the following lines to enable action.php script
      ----*/
      $http.post('../process/action.php', booking).success(function(data, status) {
        if (data.success) {
          $window.alert("Thank you! Your message has been sent.");
          $scope.booking = {};
          // display success message
          $scope.$parent.message = true;
        }
      }).error(function(data, status) {
        $window.alert("Sorry, there was a problem!");
      });
      /*----
      Remove the following 2 lines of code to enable action.php script
      ----*/
      //  $scope.booking = {};
      //  $scope.$parent.message = true;
    };
    this.selectMeal = function(setMeal) {
      if (!setMeal.active) {
        angular.forEach(this.meals, function(s) {
          s.active = false;
        });
        setMeal.active = true;
      }
      total();
    };
    var me = this;
    var total = function() {
      var total = 0;
      var percentage = 0;
      var mealType;
      var discount = false;
      total = $scope.booking.totalDays * $scope.booking.groupSize;
      angular.forEach(me.meals, function(s) {
        if (s.active) {
          total *= s.price;
          mealType = s.name + ' - ' + s.description;
        }
      });
      if ($scope.booking.totalDays >= 10) {
        percentage = (total / 100) * 10;
        total -= percentage;
        discount = true;
      }
      $scope.booking.total = total;
      $scope.booking.percentage = percentage;
      $scope.booking.mealType = mealType;
      $scope.booking.discount = discount;
    };
    // Datepicker
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened1 = true;
      $scope.opened2 = false;
    };
    $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened1 = false;
      $scope.opened2 = true;
    };
    $scope.clear = function() {
      $scope.dt = null;
      $scope.dt2 = null;
    };
    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }
]);
// barListControllers.controller('ContactFormController', ['$scope', '$http',
//    function($scope, $http){
//       $scope.result ="hidden";
//       $scope.resultMessage ="message";
//       $scope.contactData; 
//       $scope.submitButtonDisabled = false;
//       $scope.submitted = false;
//       $scope.submit  = function(contactForm){
//         console.log(contactForm);
//         $scope.submitted = true;
//         $scope.submitButtonDisabled = true;
//         if(contactForm.valid){ 
//           $http({
//            method: 'POST',
//            url: '/process/contact.php',
//            headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
//            }).success(function(data){
//             if(data.success){
//               $scope.submitButtonDisabled = true;
//               $scope.resultMessage = data.message;
//               $scope.result= 'bg-success';
//             }
//             else {
//               $scope.submitButtonDisabled = false;
//               $scope.resultMessage = data.message;
//               $scope.result ='bg-danger';
//             } //end data success
//           }); /*end success*/
//         }else{
//             $scope.submitButtonDisabled = false;
//             $scope.resultMessage ="Failed to send.";
//             $scope.result ='bg-danger';
//         }
//       }//end submit
// }]);
// let's create a re-usable factory that generates the $firebaseAuth instance
barListControllers.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
barListControllers.controller("ToastsCtrl", ["$scope", "Auth",
  function($scope, Auth) {
    $scope.auth = Auth;
    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });
  }
]);
barListControllers.controller("ToastCtrl", ["$scope", "Auth",
  function($scope, Auth) {
    $scope.auth = Auth;
    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });
    /**
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Shortcuts to DOM Elements.
    var messageForm = document.getElementById('message-form');
    var messageInput = document.getElementById('new-post-message');
    var titleInput = document.getElementById('new-post-title');
    var textInput = document.getElementById('text');
    var photoURLInput = document.getElementById('photourl');
    var signInButtonGoogle = document.getElementById('sign-in-button-google');
    var signInButtonFacebook = document.getElementById('sign-in-button-facebook');
    var splashPage = document.getElementById('page-splash');
    var addPost = document.getElementById('add-post');
    var addButton = document.getElementById('add');
    var recentPostsSection = document.getElementById('recent-posts-list');
    var userPostsSection = document.getElementById('user-posts-list');
    var topUserPostsSection = document.getElementById('top-user-posts-list');
    var recentMenuButton = document.getElementById('menu-recent');
    var myPostsMenuButton = document.getElementById('menu-my-posts');
    var myTopPostsMenuButton = document.getElementById('menu-my-top-posts');
    var signOutButton = document.getElementById('sign-out-button');
    var date = new Date();
    /**
     * Saves a new post to the Firebase DB.
     */
    // [START write_fan_out]
    function writeNewPost(uid, username, photo, title, image, body) {
      // A post entry.
      var postData = {
        uid: uid,
        author: username,
        photo: photo,
        title: title,
        image: image,
        body: body,
        date: date,
        starCount: 0
      };
      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('posts').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/posts/' + newPostKey] = postData;
      updates['/user-posts/' + uid + '/' + newPostKey] = postData;
      return firebase.database().ref().update(updates);
    }
    // [END write_fan_out]
    /**
     * Star/unstar post.
     */
    // [START post_stars_transaction]
    function toggleStar(postRef, uid) {
      postRef.transaction(function(post) {
        if (post.stars && post.stars[uid]) {
          post.starCount--;
          post.stars[uid] = null;
        } else {
          post.starCount++;
          if (!post.stars) {
            post.stars = {};
          }
          post.stars[uid] = true;
        }
        return post;
      });
    }
    // [END post_stars_transaction]
    /**
     * Creates a post element.
     */
    function createPostElement(postId, author, photo, title, image, body) {
      var uid = firebase.auth().currentUser.uid;
      // console.log(postId+ ' ; ' + photo + ' ; ' +title+ ' ; '+ text+' ; '+ author);
      var html = '<div class="post mdl-cell mdl-cell--12-col ' + 'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' + '<div class="mdl-card mdl-shadow--2dp">' + '<div class="header">' + '<div class="profile">' + '<img ng-src="" class="avatar">' + '<div class="username mdl-color-text--black"></div>' + '</div></div>' + '<div class="mdl-card__title mdl-color--lime-600 mdl-color-text--white">' + '<h4 class="mdl-card__title-text author-title"></h4>' + '</div>' + '<div class="details">' + '<img ng-src="" class="post-image"><input id="text" class="hide">' + '<div class="text"></div>' + '<div class="star">' + '<div class="not-starred material-icons">star_border</div>' + '<div class="starred material-icons">star</div>' + '<div class="star-count">0</div>' + '</div>' + '<div class="comments-container"></div>' + '<form class="add-comment" action="#">' + '<div class="mdl-textfield mdl-js-textfield">' + '<input class="mdl-textfield__input new-comment" type="text">' + '<label class="mdl-textfield__label">Comment...</label>' + '</div>' + '</form>' + '</div></div>' + '</div>';
      // Create the DOM element from the HTML.
      var div = document.createElement('div');
      div.innerHTML = html;
      var postElement = div.firstChild;
      // componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);
      var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
      var commentInput = postElement.getElementsByClassName('new-comment')[0];
      var star = postElement.getElementsByClassName('starred')[0];
      var unStar = postElement.getElementsByClassName('not-starred')[0];
      // Set values.
      postElement.getElementsByClassName('username')[0].innerText = author;
      postElement.getElementsByClassName('avatar')[0].src = photo;
      postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;
      postElement.getElementsByClassName('text')[0].innerText = body;
      postElement.getElementsByClassName('post-image')[0].src = image;
      // Listen for comments.
      // [START child_event_listener_recycler]
      var commentsRef = firebase.database().ref('post-comments/' + postId);
      commentsRef.on('child_added', function(data) {
        addCommentElement(postElement, data.key, data.val().text, data.val().author);
      });
      commentsRef.on('child_changed', function(data) {
        setCommentValues(postElement, data.key, data.val().text, data.val().author);
      });
      commentsRef.on('child_removed', function(data) {
        deleteComment(postElement, data.key);
      });
      // [END child_event_listener_recycler]
      // Listen for likes counts.
      // [START post_value_event_listener]
      firebase.database().ref('posts/' + postId + '/starCount').on('value', function(snapshot) {
        updateStarCount(postElement, snapshot.val());
      });
      // [END post_value_event_listener]
      // Listen for the starred status.
      firebase.database().ref('posts/' + postId + '/stars/' + uid).on('value', function(snapshot) {
        updateStarredByCurrentUser(postElement, snapshot.val());
      });
      // Create new comment.
      addCommentForm.onsubmit = function(e) {
        e.preventDefault();
        createNewComment(postId, firebase.auth().currentUser.displayName, uid, commentInput.value);
        commentInput.value = '';
        // commentInput.parentElement.MaterialTextfield.boundUpdateClassesHandler();
      };
      // Bind starring action.
      var onStarClicked = function() {
        var globalPostRef = firebase.database().ref('/posts/' + postId);
        var userPostRef = firebase.database().ref('/user-posts/' + uid + '/' + postId);
        toggleStar(globalPostRef, uid);
        toggleStar(userPostRef, uid);
      };
      unStar.onclick = onStarClicked;
      star.onclick = onStarClicked;
      return postElement;
    }
    /**
     * Writes a new comment for the given post.
     */
    function createNewComment(postId, username, uid, text) {
      firebase.database().ref('post-comments/' + postId).push({
        text: text,
        author: username,
        uid: uid
      });
    }
    /**
     * Updates the starred status of the post.
     */
    function updateStarredByCurrentUser(postElement, starred) {
      if (starred) {
        postElement.getElementsByClassName('starred')[0].style.display = 'inline-block';
        postElement.getElementsByClassName('not-starred')[0].style.display = 'none';
      } else {
        postElement.getElementsByClassName('starred')[0].style.display = 'none';
        postElement.getElementsByClassName('not-starred')[0].style.display = 'inline-block';
      }
    }
    /**
     * Updates the number of stars displayed for a post.
     */
    function updateStarCount(postElement, nbStart) {
      postElement.getElementsByClassName('star-count')[0].innerText = nbStart;
    }
    /**
     * Creates a comment element and adds it to the given postElement.
     */
    function addCommentElement(postElement, id, text, author) {
      var comment = document.createElement('div');
      comment.classList.add('comment-' + id);
      comment.innerHTML = '<span class="username"></span>:&nbsp;<span class="comment"></span>';
      comment.getElementsByClassName('comment')[0].innerText = text;
      comment.getElementsByClassName('username')[0].innerText = author;
      var commentsContainer = postElement.getElementsByClassName('comments-container')[0];
      commentsContainer.appendChild(comment);
    }
    /**
     * Sets the comment's values in the given postElement.
     */
    function setCommentValues(postElement, id, text, author) {
      var comment = postElement.getElementsByClassName('comment-' + id)[0];
      comment.getElementsByClassName('comment')[0].innerText = text;
      comment.getElementsByClassName('fp-username')[0].innerText = author;
    }
    /**
     * Deletes the comment of the given ID in the given postElement.
     */
    function deleteComment(postElement, id) {
      var comment = postElement.getElementsByClassName('comment-' + id)[0];
      comment.parentElement.removeChild(comment);
    }
    /**
     * Starts listening for new posts and populates posts lists.
     */
    function startDatabaseQueries() {
      // [START my_top_posts_query]
      var myUserId = firebase.auth().currentUser.uid;
      var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
      // [END my_top_posts_query]
      // [START recent_posts_query]
      var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
      // [END recent_posts_query]
      var userPostsRef = firebase.database().ref('user-posts/' + myUserId);
      var fetchPosts = function(postsRef, sectionElement) {
        postsRef.on('child_added', function(data) {
          var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
          containerElement.insertBefore(createPostElement(data.key, data.val().author, data.val().photo, data.val().title, data.val().image, data.val().body), containerElement.firstChild);
        });
      };
      fetchPosts(topUserPostsRef, topUserPostsSection);
      fetchPosts(recentPostsRef, recentPostsSection);
      fetchPosts(userPostsRef, userPostsSection);
    }
    /**
     * Writes the user's data to the database.
     */
    // [START basic_write]
    function writeUserData(userId, name, photo, email) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        photo: photo
      });
    }
    // [END basic_write]
    // Bindings on load.
    window.addEventListener('load', function() {
      // Bind Sign in button.
      signInButtonGoogle.addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
        // updateUser();
      });
      signInButtonFacebook.addEventListener('click', function() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider);
        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // updateUser();
            // ...
          }
          // The signed-in user info.
          var user = result.user;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      });
      signOutButton.addEventListener('click', function() {
          firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Peace out-")
          }, function(error) {
            // An error happened.
          });
        })
        // Listen for auth state changes
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          writeUserData(user.uid, user.displayName, user.photoURL, user.email);
          startDatabaseQueries();
          $scope.displayName = user.displayName;
          var photoURL = user.photoURL;
          // $scope.message = "Welcome" + $scope.displayName;
        } else {
          // splashPage.style.display = 'block';
        }
      });
      //handle image uploads
      function handleFileSelect(e) {
        var file = e.target.files[0];
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();
        // Get a reference to the location where we'll store our photos
        var storageRef = firebase.storage().ref().child('images');
        // Get a reference to store file at photos/<FILENAME>.jpg
        var photoRef = storageRef.child(file.name);
        // Upload file to Firebase Storage
        var uploadTask = photoRef.put(file);
        uploadTask.on('state_changed', null, null, function() {
          // When the image has successfully uploaded, we get its download URL
          var downloadUrl = uploadTask.snapshot.downloadURL;
          // Set the download URL to the message box, so that the user can send it to the database
          textInput.value = downloadUrl;
        });
      }
      file.addEventListener('change', handleFileSelect, false);
      // Saves message on form submit.
      messageForm.onsubmit = function(e) {
        e.preventDefault();
        if (messageInput.value && titleInput.value) {
          var postText = messageInput.value;
          var postImage = textInput.value;
          messageInput.value = '';
          // [START single_value_read]
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            var username = snapshot.val().username;
            var photo = snapshot.val().photo;
            // [START_EXCLUDE]
            writeNewPost(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.photoURL, titleInput.value, postImage, postText).then(function() {
              myPostsMenuButton.click();
            });
            // [END_EXCLUDE]
          });
          // [END single_value_read]
        }
      };
      updateUser.onsubmit = function(e) {
          var user = firebase.auth().currentUser;
          e.preventDefault();
          if (user != null) {
            console.log("Sign-in user provider: " + user.providerId);
            console.log("  Provider-specific UID: " + user.uid);
            console.log("  Name: " + user.displayName);
            console.log("  Email: " + user.email);
            console.log("  Photo URL: " + user.photoURL);
            user.providerData.forEach(function(profile) {
              var newDisplayName = profile.displayName;
              var newImage = profile.photoURL;
              console.log("Sign-in provider: " + profile.providerId);
              console.log("  Provider-specific UID: " + profile.uid);
              console.log("  Name: " + profile.displayName);
              console.log("  Email: " + profile.email);
              console.log("  Photo URL: " + profile.photoURL);
            });
            // var newDisplayName = document.getElementById("newDisplayName");
            // var newImage = document.getElementById("newImage");
            user.updateProfile({
              displayName: newDisplayName,
              photoURL: photoURL
            }).then(function() {
              // Update successful.
              //$('#modalprofile').closeModal();
            }, function(error) {
              // An error happened.
              alert('something is wrong');
            });
          }
        }
        // Bind menu buttons.
      recentMenuButton.onclick = function() {
        recentPostsSection.style.display = 'block';
        userPostsSection.style.display = 'none';
        topUserPostsSection.style.display = 'none';
        addPost.style.display = 'none';
        recentMenuButton.classList.add('is-active');
        myPostsMenuButton.classList.remove('is-active');
        myTopPostsMenuButton.classList.remove('is-active');
      };
      myPostsMenuButton.onclick = function() {
        recentPostsSection.style.display = 'none';
        userPostsSection.style.display = 'block';
        topUserPostsSection.style.display = 'none';
        addPost.style.display = 'none';
        recentMenuButton.classList.remove('is-active');
        myPostsMenuButton.classList.add('is-active');
        myTopPostsMenuButton.classList.remove('is-active');
      };
      myTopPostsMenuButton.onclick = function() {
        recentPostsSection.style.display = 'none';
        userPostsSection.style.display = 'none';
        topUserPostsSection.style.display = 'block';
        addPost.style.display = 'none';
        recentMenuButton.classList.remove('is-active');
        myPostsMenuButton.classList.remove('is-active');
        myTopPostsMenuButton.classList.add('is-active');
      };
      addButton.onclick = function() {
        recentPostsSection.style.display = 'none';
        userPostsSection.style.display = 'none';
        topUserPostsSection.style.display = 'none';
        addPost.style.display = 'block';
        recentMenuButton.classList.remove('is-active');
        myPostsMenuButton.classList.remove('is-active');
        myTopPostsMenuButton.classList.remove('is-active');
        messageInput.value = '';
        titleInput.value = '';
      };
      recentMenuButton.onclick();
    }, false);

    function updateUser() {
      var user = firebase.auth().currentUser;
      if (user != null) {
        console.log("Sign-in user provider: " + user.providerId);
        console.log("  Provider-specific UID: " + user.uid);
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log("  Photo URL: " + user.photoURL);
        var newDisplayName, newImage;
        user.providerData.forEach(function(profile) {
          newDisplayName = profile.displayName;
          newImage = profile.photoURL;
        });
        user.updateProfile({
          displayName: newDisplayName,
          photoURL: newImage
        }).then(function() {
          // Update successful.
          console.log("profile has been updated");
          console.log("  Name: " + user.displayName);
          console.log("  Photo URL: " + user.photoURL);
        }, function(error) {
          // An error happened.
          alert('something is wrong');
        });
      }
    }
    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        //  [END authwithemail]
        // if on state change this is a user
        document.getElementById('quickstart-sign-in').disabled = true;
      }
    }

    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END createwithemail]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // updateUser();
          var displayName = user.username;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log(displayName);
          console.log(email);
        }
      });
    }
    $scope.displayName = "Anonymous";
    $scope.setFile = function(element) {
      $scope.$apply(function($scope) {
        $scope.theFile = element.files[0];
      });
    }
    $('button#create').on('click', function() {
      console.log('button changed');
      //handle user image uploads
      function handleUserFileSelect(e) {
        var file = e.target.files[0];
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();
        // Get a reference to the location where we'll store our photos
        var storageRef = firebase.storage().ref().child('images');
        // Get a reference to store file at photos/<FILENAME>.jpg
        var photoRef = storageRef.child(file.name);
        // Upload file to Firebase Storage
        var uploadTask = photoRef.put(file);
        uploadTask.on('state_changed', null, null, function() {
          // When the image has successfully uploaded, we get its download URL
          var downloadUrl = uploadTask.snapshot.downloadURL;
          // Set the download URL to the message box, so that the user can send it to the database
          photoURLInput.value = downloadUrl;
        });
      }
      userphoto.addEventListener('change', handleUserFileSelect, false);
    });

    function createProfile() {
      var user = firebase.auth().currentUser;
      if (user) {
        var displayName = $scope.displayName;
        //var filename = $scope.theFile.name;
        var filename = photoURLInput.value;
        console.log('obtained displayName:  ' + displayName + "photo name: " + filename);
        var username = $scope.displayName;
        console.log('scope displayName: ' + $scope.displayName);
        user.updateProfile({
          displayName: username,
          email: email,
          photoURL: filename
        }).then(function() {
          // Update successful.
          $scope.message = "Yo " + username;
          console.log("profile has been updated");
          console.log("  Name: " + user.displayName);
          console.log("  Email: " + user.email);
          console.log("  Photo URL: " + user.photoURL);
          $('#modal2').closeModal();
        }, function(error) {
          // An error happened.
          alert('something is wrong');
        });
      }
    }
    /**
     * Handles registering callbacks for the auth status.
     *
     * This method registers a listener with firebase.auth().onAuthStateChanged. This listener is called when
     * the user is signed in or out, and that is where we update the UI.
     *
     * When signed in, we also authenticate to the Firebase Realtime Database.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // updateUser();
          var displayName = user.username;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var refreshToken = user.refreshToken;
          var providerData = user.providerData;
          // [START_EXCLUDE silent]
          // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          // document.getElementById('quickstart-account-details').textContent = JSON.stringify({
          //   displayName: displayName,
          //   email: email,
          //   emailVerified: emailVerified,
          //   photoURL: photoURL,
          //   isAnonymous: isAnonymous,
          //   uid: uid,
          //   refreshToken: refreshToken,
          //   providerData: providerData
          // }, null, '  ');
          //   // [END_EXCLUDE]
          // update their status
        } else {
          //   // User is signed out.
          //   // [START_EXCLUDE silent]
          //   document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          //   document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          //   document.getElementById('quickstart-account-details').textContent = 'null';
          //   // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('signup').addEventListener('click', createProfile, false);
    }
    window.onload = function() {
      initApp();
    };
  }
]);
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
'use strict';

// Shortcuts to DOM Elements.
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('new-post-message');
var titleInput = document.getElementById('new-post-title');
var signInButtonGoogle = document.getElementById('sign-in-button-google');
var signInButtonFacebook= document.getElementById('sign-in-button-facebook');
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
function writeNewPost(uid, username, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
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
function createPostElement(postId, title, text, author) {
  var uid = firebase.auth().currentUser.uid;
console.log(title);
  var html =
      '<div class="post mdl-cell mdl-cell--12-col ' +
                  'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
        '<div class="mdl-card mdl-shadow--2dp">' +
          '<div class="mdl-card__title mdl-color--lime-600 mdl-color-text--white">' +
            '<h4 class="mdl-card__title-text"></h4>' +
          '</div>' +
          '<div class="header">' +
            '<div class="profile">' +
              '<div class="avatar"></div>' +
              '<div class="username mdl-color-text--black"></div>' +
            '</div>' +
          '</div><div class="details">' +
          '<div class="star">' +
            '<div class="not-starred material-icons">star_border</div>' +
            '<div class="starred material-icons">star</div>' +
            '<div class="star-count">0</div>' +
          '</div>' +
          '<div class="text"></div>' +
          '<div class="comments-container"></div>' +
          '<form class="add-comment" action="#">' +
            '<div class="mdl-textfield mdl-js-textfield">' +
              '<input class="mdl-textfield__input new-comment" type="text">' +
              '<label class="mdl-textfield__label">Comment...</label>' +
            '</div>' +
          '</form>' +
        '</div></div>' +
      '</div>';

  // Create the DOM element from the HTML.
  var div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;
  componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);

  var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
  var commentInput = postElement.getElementsByClassName('new-comment')[0];
  var star = postElement.getElementsByClassName('starred')[0];
  var unStar = postElement.getElementsByClassName('not-starred')[0];

  // Set values.
  postElement.getElementsByClassName('text')[0].innerText = text;
  postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;
  postElement.getElementsByClassName('username')[0].innerText = author;

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
    commentInput.parentElement.MaterialTextfield.boundUpdateClassesHandler();
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
  comment.innerHTML = '<span class="username"></span><span class="comment"></span>';
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
      containerElement.insertBefore(
          createPostElement(data.key, data.val().title, data.val().body, data.val().author),
          containerElement.firstChild);
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
function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}
// [END basic_write]

// Bindings on load.
window.addEventListener('load', function() {
  // Bind Sign in button.
  signInButtonGoogle.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
  signInButtonFacebook.addEventListener('click', function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
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
  signOutButton.addEventListener('click', function(){
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
      splashPage.style.display = 'none';
      writeUserData(user.uid, user.displayName, user.email);
      startDatabaseQueries();
    } else {
      splashPage.style.display = 'block';
    }
  });

  // Saves message on form submit.
  messageForm.onsubmit = function(e) {
    e.preventDefault();
    if (messageInput.value && titleInput.value) {
      var postText = messageInput.value;
      messageInput.value = '';
      // [START single_value_read]
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var username = snapshot.val().username;
        // [START_EXCLUDE]
        writeNewPost(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName,
            titleInput.value, postText).then(function() {
              myPostsMenuButton.click();
            });
        // [END_EXCLUDE]
      });
      // [END single_value_read]
    }
  };
  
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
      }
      document.getElementById('quickstart-sign-in').disabled = true;
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
          var displayName = user.username;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var refreshToken = user.refreshToken;
          var providerData = user.providerData;
          // [START_EXCLUDE silent]
        //   document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        //   document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        //   document.getElementById('quickstart-account-details').textContent = JSON.stringify({
        //     displayName: displayName,
        //     email: email,
        //     emailVerified: emailVerified,
        //     photoURL: photoURL,
        //     isAnonymous: isAnonymous,
        //     uid: uid,
        //     refreshToken: refreshToken,
        //     providerData: providerData
        //   }, null, '  ');
        //   // [END_EXCLUDE]
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
    }

    window.onload = function() {
      initApp();
    };

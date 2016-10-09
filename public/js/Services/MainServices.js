/**
 * Created by CollabMedi on 4/17/16.
 */

collabmedi.factory('mainFactory', function ($q, $http, REST_URL, $state, $rootScope, $stateParams) {

  var host = 'http://ec2-54-152-86-123.compute-1.amazonaws.com:3000';
  var exports = {};

  exports.login = function (user) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'login', {
      id:user.id,
      password:user.password
    }).
      success(function (data, status, headers, config) {
        if (data && status ==201) {
          deferred.resolve(data);
        }
        else{
          deferred.reject(true);
        }
      }).
      error(function (data, status, headers, config) {
        deferred.reject(true);
      });
    return deferred.promise;
  }

  exports.addUser = function (user) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'users', {
      _id:user.emailID,
      password:user.password,
      user_type:user.userType,
      doctor_id:user.doctorID,
      fname:user.firstName,
      lname:user.lastName,
      email:user.emailID,
      phone:user.phoneNo,
      pic_link:''
    }).
    success(function (data, status, headers, config) {
      if (data && status == 201) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.addUserPost = function (post, userid, username) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'posts/' + userid, {
      content:post.status,
      type:'user',
      posted_by: username
    }).
    success(function (data, status, headers, config) {
      if (data && status == 204) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.addPostComment = function (postid, userid, comment) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'comments/' + postid + '/' + userid, {
      content:comment
    }).
    success(function (data, status, headers, config) {
      if (data && status == 204) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.addGroupPost = function (post, username, groupid) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'groups/posts/' + groupid, {
      content: post,
      type: 'user',
      posted_by: username
    }).
    success(function (data, status, headers, config) {
      if (data && status == 204) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.addGrpPostComment = function (postid, username, comment) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'groups/comments/' + postid + '/' + username, {
      content:comment
    }).
    success(function (data, status, headers, config) {
      if (data && status == 204) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.addBlogPostComment = function (blogid, username, comment) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'blogs/comments/' + blogid + '/' + username, {
      content:comment
    }).
    success(function (data, status, headers, config) {
      if (data && status == 204) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.joinGroup = function (groupid, userid) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'groups/join/' + groupid + '/' + userid).
    success(function (data, status, headers, config) {
      if (data && status == 204) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.createGroup = function (group, userid) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'groups/' + userid, {
      name:group.name,
      description: group.description,
      pic_link: 'images/group-profile-cover.jpg'
    }).
    success(function (data, status, headers, config) {
      if (data && status == 201) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.createBlog = function (blogname, blogdesc, userid, name) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'blogs/' + userid, {
      name: blogname,
      description: blogdesc,
      author: name
    }).
    success(function (data, status, headers, config) {
      if (data && status == 201) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.getUserPosts = function (userid) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'posts?userid=' + userid).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getConnections = function (userid) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'users?id=' + userid).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getCurrentUserPosts = function (userid) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'users/' + userid).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data.posts);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getUserDetails = function(emailid) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'users/' + emailid).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getBlogs = function() {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'blogs/').
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getGroups = function() {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'groups/').
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getGroupDetails = function(groupid) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'groups/posts/' + groupid).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.getBlogDetails = function(blogid) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'blogs/' + blogid).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.sendRequest = function (userid, friendid) {
    var deferred = $q.defer();

    $http.put(host+REST_URL.baseUrl + 'users/' + friendid + '/' + userid).
    success(function (data, status, headers, config) {
      if (data && status == 201) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.acceptRequest = function (userid, friendid) {
    var deferred = $q.defer();

    $http.put(host+REST_URL.baseUrl + 'users/friend/' + userid + '/' + friendid).
    success(function (data, status, headers, config) {
      if (data && status == 201) {
        deferred.resolve(true);
      }
      else{
        deferred.resolve(false);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(true);
    });
    return deferred.promise;
  }

  exports.getTrends = function() {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'trends').
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else {
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.searchEverything = function() {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'search').
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.medicalAlternatives = function(medicineName) {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'truemd/medicineAlternatives/' + medicineName).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.searchEverything = function() {
    var deferred = $q.defer();

    $http.get(host+REST_URL.baseUrl + 'search').
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.medicalAlternatives = function(medicineName) {
    var deferred = $q.defer();


    $http.get(host+REST_URL.baseUrl + 'truemd/medicineAlternatives/' + medicineName).
    success(function (data, status, headers, config) {
      if (data && status == 200) {
        deferred.resolve(data);
      }
      else{
        deferred.resolve(data);
      }
    }).
    error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  }

  exports.checkD = function(symptoms) {
    var deferred = $q.defer();

    $http.post(host+REST_URL.baseUrl + 'checkd/',{"symptoms":symptoms}).
      success(function (data, status, headers, config) {
        if (data && status == 200) {
          deferred.resolve(data);
        }
        else{
          deferred.resolve(false);
        }
      }).
      error(function (data, status, headers, config) {
        deferred.reject(data);
      });
    return deferred.promise;
  }

  return exports;
});
angular.module('starter.controllers', [])

    .controller('MainController', function($rootScope, $scope, $state, mainFactory, $cookies, $filter,$http,$interval) {

        $scope.navbarCollapsed = false;
        $scope.menuCollapsed = false;
        $scope.chatCollapsed = true;
        $scope.currentUserEmailID = $rootScope.username;
        $scope.currentUserType = $rootScope.usertype;
        $scope.searchText = '';
        $scope.isTen = false;

        $scope.loadPeople = function() {
            console.log('/rest/v1/users/listOnlineConnections/'+ $rootScope.username);
            $http({
                method: 'GET',
                url: '/rest/v1/users/listOnlineConnections/'+ $rootScope.username
            }).success(function(data, status) {
                console.log('/rest/v1/users/listOnlineConnections/'+ $rootScope.username);
                $scope.peoples = data;
            });

        };

        $scope.sendMsg = function(toID,msgTxt) {
            console.log(msgTxt,toID);
            $http({
                method: 'GET',
                url:'/rest/v1/sendMsg/'+ $rootScope.username+'/'+toID+'/'+msgTxt
            }).success(function(data, status) {
                console.log('/rest/v1/sendMsg/'+ $rootScope.username+'/'+toID+'/'+msgTxt);
                $scope.msgTxt = '';
                $scope.getChatHistory(toID);
            });
        }

        $scope.getChatHistory = function(toID) {
            console.log(toID);
            console.log('/rest/v1/msgHistory/'+ $rootScope.username+'/'+toID);
            var httpRequest = $http({
                method: 'GET',
                url: '/rest/v1/msgHistory/'+ $rootScope.username+'/'+toID
            }).success(function(data, status) {
                console.log('/rest/v1/msgHistory/'+ $rootScope.username+'/'+toID);
                $scope.msgs= data;
                $scope.ContactName=toID;
                console.log($scope.msgs);
                $interval(function(){
                    console.log($scope.ContactName);
                    console.log('/rest/v1/msgHistory/'+ $rootScope.username+'/'+$scope.ContactName);
                    var httpRequest = $http({
                        method: 'GET',
                        url: '/rest/v1/msgHistory/'+ $rootScope.username+'/'+$scope.ContactName
                    }).success(function(data, status) {
                        console.log('/rest/v1/msgHistory/'+ $rootScope.username+'/'+$scope.ContactName);
                        $scope.msgs= data;
                        $scope.ContactName=$scope.ContactName;
                    });
                },5000);
            });
        };

        $scope.login = function () {
            mainFactory.login($scope.user).then(function (resp) {
                $rootScope.isLogged='true';
                $rootScope.username=$scope.user.id;
                $rootScope.name=resp.fname;
                $rootScope.usertype=resp.user_type;
                $rootScope.emailid=resp.email;
                if(resp.pic_link != '') {
                    $rootScope.profile_pic_110 = resp.pic_link + 'profile_pic.jpg';
                    $rootScope.profile_pic_50=resp.pic_link + 'profile_pic_50.jpg';
                }
                else {
                    $rootScope.profile_pic_110='images/people/110/default_profile.jpg';
                    $rootScope.profile_pic_50='images/people/50/default_profile_50.jpg';
                }
                $state.go('home');
            }, function (err) {
                $rootScope.isLogged = undefined;
                $rootScope.username = undefined;
                $rootScope.name = undefined;
                $rootScope.usertype = undefined;
                $rootScope.emailid = undefined;
                $rootScope.profile_pic_110 = undefined;
                $rootScope.profile_pic_50 = undefined;
                $scope.err_message = "Login Failed..";
                $state.go('login');
            });
        }

        $scope.addUser = function () {
            mainFactory.addUser($scope.user).then(function (resp) {
                if (resp == true) {
                    $rootScope.isLogged = 'true';
                    $rootScope.username = $scope.user.emailID;
                    $rootScope.name = $scope.user.firstName;
                    $rootScope.usertype = $scope.user.userType;
                    $rootScope.emailid = $scope.user.emailID;
                    $rootScope.profile_pic_110 = 'images/people/110/default_profile.jpg';
                    $rootScope.profile_pic_50 = 'images/people/50/default_profile_50.jpg';
                    $state.go('home');
                }
                else {
                    $rootScope.isLogged = undefined;
                    $rootScope.username = undefined;
                    $rootScope.name = undefined;
                    $rootScope.usertype = undefined;
                    $rootScope.emailid = undefined;
                    $rootScope.profile_pic_110 = undefined;
                    $rootScope.profile_pic_50 = undefined;
                    $scope.err_message = "Registration Failed..";
                    $state.go('registration');
                }
            }, function (err) {
                $rootScope.isLogged = undefined;
                $rootScope.username = undefined;
                $rootScope.name = undefined;
                $rootScope.usertype = undefined;
                $rootScope.emailid = undefined;
                $rootScope.profile_pic_110 = undefined;
                $rootScope.profile_pic_50 = undefined;
                $scope.err_message = "Registration Failed..";
                $state.go('registration');
            });
        }

        $scope.registration = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go('registration');
            }
            else {
                $state.go('userprofile');
            }
        }

        $scope.showLogin = function() {
            $state.go('login');
        }

        $scope.timeline = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("timeline");
            }
        }

        $scope.newsfeed = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("home");
            }
        }

        $scope.userprofile = function (emailid) {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                mainFactory.getUserDetails(emailid).then(function (resp) {
                    $rootScope.profile = resp;
                }, function (err) {
                    $state.go('login');
                });
                $state.go("userprofile");
            }
        }

        $scope.connections = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("connections");
            }
        }

        $scope.messages = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("messages");
            }
        }

        $scope.allgroups = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("groups");
            }
        }

        $scope.allblogs = function () {
            $state.go("blogs");
        }

        $scope.recommendDoc = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("recommenddoc");
            }
        }

        $scope.recommendPharma = function () {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                $state.go("recommendpharma");
            }
        }

        $scope.groupprofile = function (groupid) {
            if (angular.isUndefined($rootScope.isLogged)) {
                $state.go("login");
            }
            else {
                mainFactory.getGroupDetails(groupid).then(function (resp) {
                    $rootScope.currentGroup = resp;
                });
                $state.go("groupprofile");
            }
        }

        $scope.blogprofile = function (blogid) {
            mainFactory.getBlogDetails(blogid).then(function (resp) {
                $rootScope.currentBlog = resp;
            });
            $state.go("blogprofile");
        }

        $scope.logout = function () {
            $rootScope.isLogged = undefined;
            $rootScope.username = undefined;
            $rootScope.name = undefined;
            $rootScope.usertype = undefined;
            $rootScope.emailid = undefined;
            $rootScope.profile_pic_110 = undefined;
            $rootScope.profile_pic_50 = undefined;
            $state.go("login");
        }

        $scope.addUserPost = function () {
            mainFactory.addUserPost($scope.post, $rootScope.username, $rootScope.name).then(function (resp) {
                $state.go($state.current, {}, {reload: true});
            }, function (err) {
                $state.go($state.current, {}, {reload: true});
            });
        }

        $scope.addPostComment = function (postid, comment) {
            mainFactory.addPostComment(postid, $rootScope.name, comment).then(function (resp) {
                $state.go($state.current, {}, {reload: true});
            }, function (err) {
                $state.go($state.current, {}, {reload: true});
            });
        }

        $scope.addGroupPost = function (poststatus,groupid) {
            mainFactory.addGroupPost(poststatus, $rootScope.name, groupid).then(function (resp) {
                $scope.groupprofile(groupid);
            }, function (err) {
                $scope.groupprofile(groupid);
            });
        }

        $scope.addGrpPostComment = function (postid, comment, groupid) {
            mainFactory.addGrpPostComment(postid, $rootScope.name, comment).then(function (resp) {
                $scope.groupprofile(groupid);
            }, function (err) {
                $scope.groupprofile(groupid);
            });
        }

        $scope.addBlogPostComment = function (blogid, comment) {
            mainFactory.addBlogPostComment(blogid, $rootScope.name, comment).then(function (resp) {
                $scope.blogprofile(blogid);
            }, function (err) {
                $scope.blogprofile(blogid);
            });
        }

        $scope.createGroup = function () {
            mainFactory.createGroup($scope.group, $rootScope.username).then(function (resp) {
                $state.go($state.current, {}, {reload: true});
            }, function (err) {
                $state.go($state.current, {}, {reload: true});
            });
        }

        $scope.createBlog = function (blogname,blogdesc) {
            mainFactory.createBlog(blogname, blogdesc, $rootScope.username, $rootScope.name).then(function (resp) {
                $state.go($state.current, {}, {reload: true});
            }, function (err) {
                $state.go($state.current, {}, {reload: true});
            });
        }

        $scope.joinGroup = function (groupid) {
            mainFactory.joinGroup(groupid, $rootScope.username).then(function (resp) {
                $state.go($state.current, {}, {reload: true});
            }, function (err) {
                $state.go($state.current, {}, {reload: true});
            });
        }

        $scope.sendRequest = function (friendEmail) {
            mainFactory.sendRequest($rootScope.username, friendEmail).then(function (resp) {
                $scope.userprofile(friendEmail);
            }, function (err) {
                $scope.userprofile(friendEmail);
            });
        }

        $scope.acceptRequest = function (friendEmail) {
            mainFactory.acceptRequest($rootScope.username, friendEmail).then(function (resp) {
                $scope.userprofile($rootScope.username);
            }, function (err) {
                $scope.userprofile($rootScope.username);
            });
        }

        $scope.redirectProfile = function (selectedItem) {
            if(selectedItem.type == 'User') {
                $scope.userprofile(selectedItem.id);
            }
            if(selectedItem.type == 'Group') {
                $scope.groupprofile(selectedItem.id);
            }
            if(selectedItem.type == 'Blog') {
                $scope.blogprofile(selectedItem.id);
            }
        }

        $scope.getAlternatives = function (medicineName) {
            mainFactory.medicalAlternatives(medicineName).then(function (resp) {
                $scope.medicineAlternatives = resp;
            }, function (err) {
                $scope.medicineAlternatives = [];
            });
        }

        if($rootScope.isLogged == 'true') {
            $scope.newsfeed.pic = $rootScope.profile_pic_110;
            $scope.newsfeed.pic_50 = $rootScope.profile_pic_50;
            $scope.newsfeed.fname = $rootScope.name;
            $scope.newsfeed.emailid = $rootScope.emailid;
            $scope.newsfeed.today_date = new Date();

            mainFactory.getUserPosts($rootScope.username).then(function (resp) {
                $scope.posts = resp;
            }, function (err) {
                $state.go('login');
            });

            mainFactory.getCurrentUserPosts($rootScope.username).then(function (resp) {
                $scope.currentuserposts = resp;
            }, function (err) {
                $state.go('login');
            });

            mainFactory.getConnections($rootScope.username).then(function (resp) {
                $scope.friends = resp;
            }, function (err) {
                $state.go('login');
            });

            mainFactory.getGroups().then(function (resp) {
                $scope.groups = resp;
            }, function (err) {
                $state.go('login');
            });

            mainFactory.getTrends().then(function (resp) {
                $scope.trends = resp;
            }, function (err) {
                $scope.trends = [];
            });

            mainFactory.searchEverything().then(function (resp) {
                $rootScope.searchAll = resp;
            }, function (err) {
                $rootScope.searchAll = [];
            });
        }

        mainFactory.getBlogs().then(function (resp) {
            $scope.blogs = resp;
        }, function (err) {
            $state.go('login');
        });

        var symtopms = ["Skin problems",
            "Anxiety",
            "Vaginal Discharge",
            "Impotence",
            "Hot Flashes",
            "Hearing Voices",
            "Mouth Sores",
            "False Beliefs",
            "Leaking Urine",
            "Skin discoloration",
            "Numbness",
            "Lightheadedness",
            "Painful Intercourse",
            "Delusions",
            "Buttock Pain",
            "Stomach Upset",
            "Leukoplakia",
            "Night Sweats",
            "Weight loss",
            "Between Periods",
            "Indigestion",
            "Warmth of Joints",
            "Tingling",
            "Malignancies",
            "Limping",
            "Dark Urine",
            "Diarrhea",
            "Nail Changes",
            "Joint pain",
            "Rash",
            "Neck Pain",
            "Fractures",
            "Cough",
            "Low Back Pain",
            "Neck Stiffness",
            "Confusion",
            "Pus Between the Gums and Teeth",
            "Breast Pain",
            "Conjunctivitis",
            "Toe Swelling",
            "Palpitations",
            "Decreased Social Interactivity",
            "Loss of Height",
            "Painful Gums",
            "Difficulty Starting and Stopping the Urine Stream",
            "Testicular Pain",
            "Erectile Dysfunction",
            "Inability to Urinate When Standing",
            "Malaise",
            "Vomiting",
            "Joint Tenderness",
            "Abdominal Swelling",
            "Fear",
            "Abdominal Pain",
            "Weak Urine Stream",
            "Early Satiety",
            "Terror",
            "Loss of appetite",
            "Flank Pain",
            "Chills",
            "Tender Gums",
            "Cold",
            "Black Stools",
            "Blurred vision",
            "Acne",
            "Swollen Gums",
            "Nausea",
            "Leg Swelling",
            "Slow healing wounds",
            "Joint Stiffness",
            "Jaundice",
            "Decreased Appetite",
            "Shaking",
            "Extreme Fatigue",
            "Easy Bruising",
            "Increased urine",
            "Yeast infections",
            "Back Stiffness",
            "Dizziness",
            "Sweating",
            "Seizures",
            "Frequent Urination",
            "Back Pain",
            "Eye Pain",
            "Urinary Frequency",
            "Earache",
            "Fungal Nails",
            "Blood in the Semen",
            "Tooth Loss",
            "Loss of Control of Urination When Coughing or Laughing",
            "Nail Pitting",
            "Loose Teeth",
            "Upper Abdominal Pain",
            "Sneezing",
            "Tooth Sensitivity",
            "Bone Pain",
            "Swollen Joints",
            "Groin Swelling",
            "Bleeding Gums",
            "Loss of Muscle Control",
            "Bleeding During Toothbrushing",
            "Difficulty Breathing",
            "Sore Throat",
            "Shortness of Breath",
            "Weight Loss",
            "Dark urine",
            "Joint Redness",
            "Fainting",
            "Muscle Aches",
            "Withdrawn Behavior",
            "Blood in the Urine",
            "Racing Heart",
            "Pain When Chewing",
            "Scrotal Pain",
            "Reddened Gums",
            "Pale Stools",
            "Bright Red Gums",
            "Bloating",
            "Chest Pain",
            "White Spots on Gums",
            "Receding Gums",
            "Bad Taste in the Mouth",
            "Enlarged Lymph Nodes",
            "Spaces Between Teeth",
            "Fungal Infection",
            "Nonsense Talking",
            "Abdominal pain",
            "Finger Swelling",
            "Pain With Walking",
            "Disordered Thought",
            "Dribbling Urine",
            "Toothache",
            "Hallucinations",
            "Heavy Menstrual Periods",
            "Nervousness",
            "Stooped Posture",
            "Fever",
            "Nipple Pain",
            "Increased Abdominal Girth",
            "Headache",
            "Pain With Ejaculation",
            "Oral Thrush",
            "Runny Nose",
            "Excessive thirst",
            "White Tongue",
            "Dreamlike Sensations",
            "Loss of Appetite",
            "Muscle Stiffness",
            "Fatigue",
            "Muscle pain",
            "Blood in Urine",
            "Agitation",
            "Tingling in the Hands",
            "Breast lump",
            "Failure to Recognize What Is Real",
            "Altered Perceptions",
            "Painful Urination",
            "Pelvic Pain",
            "Vaginal Candidiasis",
            "Shortness Of Breath",
            "Joint Pain",
            "Bad Breath",
            "Body Aches",
            "Constipation",
            "Sore throat",
            "Itching",
            "Swollen Lymph Nodes",
            "Burning Urination",
            "Tremors"
        ];

        $scope.selectedSymptoms = [];

        $scope.$watch(function () {
            return $scope.search;
        }, function () {
            if($scope.search){
                $scope.filteredSymptoms = $filter('filter')(symtopms, $scope.search);
            }
            else if($scope.search=='') {
                $scope.filteredSymptoms = [];
            }
        });

        $scope.selectSymptom = function(u) {
            if($scope.selectedSymptoms.indexOf(u)==-1 && $scope.selectedSymptoms.length<=10) {
                $scope.selectedSymptoms.push(u);
            }
            else {
                // do nothing
            }
            $scope.filteredSymptoms = [];
            $scope.search = "";
            if($scope.selectedSymptoms.length==10) {
                $scope.isTen = true;
                $scope.syMsg = "Only 10 symptoms can be selected";
            }
        }

        $scope.removeS = function(index) {
            console.log('harish');
            $scope.selectedSymptoms.splice(index,1);
        }

        $scope.findDiseases = function() {
            mainFactory.checkD($scope.selectedSymptoms).then(function(data){
                $scope.diseases = data;
                console.log($scope.diseases);
            },function(err) {
            });
        }
    });
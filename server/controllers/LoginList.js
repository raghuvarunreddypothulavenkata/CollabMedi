/**
 * Created by Manoranjan on 4/17/2016.
 */
var userList =['1001','1002','1003','rvraghu.pothula@gmail.com','manoranjan.1234@gmail.com'];

module.exports.loginList =function(email,flag) {
    if(flag==1) {
        userList.push(email);
        console.log(userList);
    }
    else if(flag==0) {
        var indexEmail=userList.indexOf(email);
        delete  userList[indexEmail];
    }

}
module.exports.isOnLine =function(toID)
{
    return userList.indexOf(toID);
}


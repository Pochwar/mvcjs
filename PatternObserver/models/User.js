function User(username){
    Observable.call(this);
    this.username = username;
}

User.prototype = Object.create(Observable.prototype);
User.prototype.constructor = User;

User.prototype.setUsername = function(username){
    this.username = username;
    this.notify('changed-username', {'username': username});
};
function User(username){
    EventEmitter.call(this);
    this.username = username;

}

User.prototype = Object.create(EventEmitter.prototype);
User.prototype.constructor = User;

User.prototype.setUsername = function(username){
    this.username = username
    this.emit("changed-username", {'username': this.username});
};
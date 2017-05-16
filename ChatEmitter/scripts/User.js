function User(username){
    EventEmitter.call(this);
    this.username = username;
    this.online = true;
    this.friends = [];

    this.init()
}

User.prototype = Object.create(EventEmitter.prototype);
User.prototype.constructor = User;

User.prototype.init = function(){
    document.querySelector("#" + this.username + "-send-message").onsubmit = (function(e){
        e.preventDefault();
        var msg = document.querySelector("#" + this.username + "-message").value;
        if (msg !== "" && this.online){
            this.buildMsg("You : ", msg,  this.username);

            this.emit("speak", {
                username: this.username,
                msg: msg
            });

            document.querySelector("#" + this.username + "-message").value = "";
        }

    }).bind(this)

    document.querySelector("#" + this.username + "-disconnect").onclick = (function(e){
        if(this.online){
            this.disconnect();
            this.emit("disconnect", {'username': this.username})
        }
    }).bind(this)


};

User.prototype.addFriends = function(user) {
    this.friends.push(user);
};

User.prototype.initFriends = function(){
    this.friends.forEach((function(friend){
        friend.on("speak", (speak = function(data){
            if(this.online){
                this.buildMsg(data.username + " : ", data.msg, this.username);
            }
        }).bind(this));

        console.log(friend.events);

        friend.on("disconnect", (disconnect = function(data){
            if(this.online) {
                this.buildMsg(data.username, " has disconnect", this.username);
            }
        }).bind(this))
    }).bind(this))
};


User.prototype.disconnect = function(){
    this.online = false;
};

User.prototype.buildMsg = function(msgUserName, msg, TargetUserName){
    var p = document.createElement('p');
    p.innerText = msgUserName + msg;
    document.querySelector("#" + TargetUserName + "-messages-list").appendChild(p);
};

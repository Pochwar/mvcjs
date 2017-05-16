function User(username){
    EventEmitter.call(this);
    this.username = username;
    this.friends = [];

    this.sendMessageCb = this.sendMessage.bind(this);
    this.decoCb = this.deco.bind(this);
    this.speakCb = this.speak.bind(this);
    this.deconnectCb = this.disconnect.bind(this);

    this.init()
}

User.prototype = Object.create(EventEmitter.prototype);
User.prototype.constructor = User;

User.prototype.init = function(){
    document.querySelector("#" + this.username + "-send-message").onsubmit = function(e) { e.preventDefault(); }
    document.querySelector("#" + this.username + "-send-message").addEventListener("submit", this.sendMessageCb);
    document.querySelector("#" + this.username + "-disconnect").addEventListener("click", this.decoCb);
};

User.prototype.setFriend = function(friend) {
    this.friends.push(friend);
    friend.on("speak", this.speakCb);
    friend.on("disconnect", this.deconnectCb);
};


User.prototype.buildMsg = function(msgUserName, msg, TargetUserName){
    var p = document.createElement('p');
    p.innerText = msgUserName + msg;
    document.querySelector("#" + TargetUserName + "-messages-list").appendChild(p);
};

User.prototype.speak = function(data){
    this.buildMsg(data.username + " : ", data.msg, this.username);
}

User.prototype.disconnect = function(data){
    this.buildMsg(data.username, " has disconnect", this.username);
}

User.prototype.sendMessage = function(e){
    e.preventDefault();
    var msg = document.querySelector("#" + this.username + "-message").value;
    if (msg !== ""){
        this.buildMsg("You : ", msg,  this.username);
        this.emit("speak", {
            username: this.username,
            msg: msg
        });
        document.querySelector("#" + this.username + "-message").value = "";
    }
}

User.prototype.deco = function(e){
    this.emit("disconnect", {'username': this.username})
    this.friends.forEach((function(friend){
        friend.off("disconnect", this.deconnectCb);
        friend.off("speak", this.speakCb);
        document.querySelector("#" + this.username + "-send-message").removeEventListener("submit", this.sendMessageCb);
        document.querySelector("#" + this.username + "-disconnect").removeEventListener("click", this.decoCb);
    }).bind(this))
}

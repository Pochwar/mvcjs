function UserView(user){
    EventEmitter.call(this);
    this.model = user;

    this.init();
}

UserView.prototype = Object.create(EventEmitter.prototype);
UserView.prototype.constructor = User;

UserView.prototype.init = function() {
    document.querySelector("#change-username").onsubmit = (function(e){
        e.preventDefault();

        var username = document.querySelector("#username").value;
        if (username !== ""){
            this.emit("change-username", {'username': username});
            document.querySelector("#username").value = "";
        }
    }).bind(this);

    this.model.on("changed-username", function(data){
        document.querySelector("#show-username").innerText = data.username;
    })
};

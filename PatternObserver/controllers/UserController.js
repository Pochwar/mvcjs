function UserController(user){
    this.model = user;
}

UserController.prototype.update = function(label, data){
    if(label === "change-username") {
        this.model.setUsername(data.username);
    }
};
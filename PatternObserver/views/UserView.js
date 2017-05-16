function UserView(){
    Observable.call(this);
    this.init();
}

UserView.prototype = Object.create(Observable.prototype);
UserView.prototype.constructor = User;

UserView.prototype.init = function() {
    document.querySelector("#change-username").onsubmit = (function(e){
        e.preventDefault();
        var username = document.querySelector("#username").value;
        if (username !== ""){
            this.notify('change-username', {'username': username});
            document.querySelector("#username").value = "";
        }

    }).bind(this);
};

UserView.prototype.update = function(label, data) {
    if(label === "changed-username") {
        document.querySelector("#show-username").innerText = data.username
    }
};
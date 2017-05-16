window.onload = function() {
    //instanciation des models, vues et controllers
    var user = new User("Balek");
    var view = new UserView(user);
    var controller = new UserController(user, view);
};
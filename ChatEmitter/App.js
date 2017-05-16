window.onload = function() {
    var alice = new User('alice');
    var bob = new User('bob');
    var frank = new User('frank');

    alice.addFriends(frank);
    alice.addFriends(bob);
    bob.addFriends(alice);
    bob.addFriends(frank);
    frank.addFriends(alice);
    frank.addFriends(bob);

    alice.initFriends();
    bob.initFriends();
    frank.initFriends();
}
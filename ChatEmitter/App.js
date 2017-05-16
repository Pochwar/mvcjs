window.onload = function() {
    var alice = new User('alice');
    var bob = new User('bob');
    var frank = new User('frank');

    alice.setFriend(frank);
    alice.setFriend(bob);
    bob.setFriend(alice);
    bob.setFriend(frank);
    frank.setFriend(alice);
    frank.setFriend(bob);
}
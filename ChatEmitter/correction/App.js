window.onload = function() {
  var alice = new Chat('alice');
  var bob = new Chat('bob');

   alice.setFriend(bob);
   bob.setFriend(alice);
}

function Chat(name) {
  EventEmitter.call(this);

  this.name = name;
  this.element = document.querySelector('#' + this.name);

  this.sendMessageCb = this.sendMessage.bind(this);
  this.displayMessageCb = this.displayMessage.bind(this);
  this.showDisconnectCb = this.showDisconnect.bind(this);

  this.init();
}

Chat.prototype = Object.create(EventEmitter.prototype);
Chat.prototype.constructor = Chat;

Chat.prototype.init = function() {
  // Gestion du formulaire de message:
  // je sépare le preventDefault du sendMessage, car je souhaite que le preventDefault
  // continue d'être executé même après une déco
  this.element.querySelector('form').onsubmit = function(e) { e.preventDefault(); }
  this.element.querySelector('form').addEventListener('submit', this.sendMessageCb);

  // Déco
  document.querySelector('#' + this.name + '-disconnect').onclick = (function(e) {
    e.preventDefault();

    // Je n'écoute plus les évenements de mon ami
    this.friend.off('message', this.displayMessageCb);
    this.friend.off('disconnected', this.showDisconnectCb);
    this.element.querySelector('form').removeEventListener('submit', this.sendMessageCb);

    // Je le préviens de ma déco
    this.emit('disconnected');
  }).bind(this);
}

Chat.prototype.setFriend = function(friend) {
  this.friend = friend;
  // Lorsque mon ami émet un évenement 'message', je l'affiche
  this.friend.on('message', this.displayMessageCb);

  // Lorsque mon ami se déconnecte, je suis prévenu
  this.friend.on('disconnected', this.showDisconnectCb);
}

Chat.prototype.sendMessage = function() {
  var message = document.querySelector('#' + this.name + '-message').value;

  // J'affiche mon message dans ma fenêtre
  this.displayMessage({
    name: 'You',
    content: message
  });

  // J'envoie un event pour prévenir que j'ai envoyé un message
  this.emit('message', {
    name: this.name,
    content: message
  });

  document.querySelector('#' + this.name + '-message').value = '';
}

Chat.prototype.displayMessage = function(data) {
  document.querySelector('#' + this.name + '-messages-list').innerHTML += '<br /><strong>' + data.name + ': </strong>' + data.content;
}

// Affichage du message de déconnection
Chat.prototype.showDisconnect = function() {
  document.getElementById(this.name + '-messages-list').innerHTML += '<br /><i>' + this.friend.name + ' est hors ligne</i>';
}



















/*function Chat(name) {
  EventEmitter.call(this);

  this.name = name;

  // Je défini des références à tout mes callbacks
  this.sendMessageCb = this.sendMessage.bind(this);
  this.showMessageCb = this.showMessage.bind(this);
  this.showDisconnectCb = this.showDisconnect.bind(this);

  this.init();
}

Chat.prototype = Object.create(EventEmitter.prototype);
Chat.prototype.constructor = Chat;

Chat.prototype.setFriend = function(friend) {
  this.friend = friend;
  this.bindEvents();
}

Chat.prototype.init = function() {
  // Je rajoute le preventDefault à part, pour qu'il soit toujours executé, même une fois
  // déconnecté du chat
  document.getElementById(this.name + '-send-message').onsubmit = function(e) { e.preventDefault() };

  // Je gère mon event 'submit' sur le formulaire d'envoi de message
  document.getElementById(this.name + '-send-message').addEventListener('submit', this.sendMessageCb);

  // Je gère mon event 'click' sur le bouton disconnect
  document.getElementById(this.name + '-disconnect').onclick = (function() {
    this.disconnect();
  }).bind(this)
}

Chat.prototype.bindEvents = function() {
  // Lorsque je reçois un message de mon ami
  this.friend.on('sent', this.showMessageCb);
  // Lorsque mon ami se déconnecte
  this.friend.on('disconnect', this.showDisconnectCb);
}

Chat.prototype.sendMessage = function() {
  var message = document.getElementById(this.name + '-message').value;

  // Affichage du message dans ma fenêtre de chat
  this.showMessage({
    name: 'Vous',
    message: message
  });

  // J'envoie l'évenement 'sent' avec en paramètre mon nom et le message
  this.emit('sent', {
    name: this.name,
    message: message
  });
}

// Affichage des messages
Chat.prototype.showMessage = function(data) {
  document.getElementById(this.name + '-messages-list').innerHTML += '<br /><strong>' + data.name + ': </strong>' + data.message;
}

// Affichage du message de déconnection
Chat.prototype.showDisconnect = function() {
  document.getElementById(this.name + '-messages-list').innerHTML += '<br /><i>' + this.friend.name + ' est hors ligne</i>';
}

// Je supprime les callbacks attachés à mes événements de Chat lorsque je me déconnecte
Chat.prototype.disconnect = function() {
  // Je ne fais plus rien lorsque je reçois un message
  this.friend.off('sent', this.showMessageCb);
  // Je ne fais plus rien lorsque mon ami se déconnecte
  this.friend.off('disconnect', this.showDisconnectCb);
  // Je ne fait plus rien lorsque j'envoie un message
  document.getElementById(this.name + '-send-message').removeEventListener('submit', this.sendMessageCb);

  // J'envoie l'évenement 'disconnect' pour prévenir mon ami de ma déconnection
  this.emit('disconnect');
}
*/
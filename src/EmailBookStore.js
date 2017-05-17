var EmailBookDispatcher = require('./EmailBookDispatcher');
var EmailBookConstants = require('./EmailBookConstants');
var EventEmitter = require('events').EventEmitter;

var CONTACTS_CHANGED_EVENT = 'contacts-changed';

var _contacts = {};
var _init = false;

/**
 * Create a new contact
 * @param  {string} name The name of the person
 * @param  {string} Email The Email number of that person
 */
function create(name, Email) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var contact = {
    id: id,
    name: name,
    Email: Email
  };
  _contacts[id] = contact;
  window.x = _contacts;
}


/**
 * Remove a contact
 * @param  {string} id
 */
function remove(id) {
  delete _contacts[id];
}

var EmailBookStore = function() {
  this._eventEmitter = new EventEmitter();
};
EmailBookStore.prototype.getContacts = function() {
  var contacts = Object.keys(_contacts).map(function(id) {
    return _contacts[id];
  });

  if (!_init) {
    // Simulate contacting web server
    setTimeout(function() {
      create('Jon Snow ', 'jonsnow@winterfell.com');
      create('Tyrion Lannister', 'tyrion@lannister.com');
      create('Danerys targaryen', 'danny@targerey.com');
      create('Arya Start', 'arya@stark.com');
      this.emitContactsChanged();
    }.bind(this), 1000);

    _init = true;
  }

  return contacts;
};

EmailBookStore.prototype.addContactsChangedListener = function(callback) {
  this._eventEmitter.on(CONTACTS_CHANGED_EVENT, callback);
};
EmailBookStore.prototype.removeContactsChangedListener = function(callback) {
  this._eventEmitter.removeListener(CONTACTS_CHANGED_EVENT, callback);
};
EmailBookStore.prototype.emitContactsChanged = function() {
  this._eventEmitter.emit(CONTACTS_CHANGED_EVENT, {});
};

var EmailBookStore = new EmailBookStore();

// Register the store in the dispatcher
EmailBookDispatcher.register(function(action) {
  switch(action.actionType) {
    case EmailBookConstants.CREATE_CONTACT:
      var name = action.data.name.trim();
      var Email = action.data.Email.trim();
      if (name !== '' && Email !== '') {
        console.log(name + Email)
        create(name, Email);
      }
      EmailBookStore.emitContactsChanged();
      break;

    case EmailBookConstants.REMOVE_CONTACT:
      var id = action.data.id;
      remove(id);
      EmailBookStore.emitContactsChanged();
      break;

    default:
      // no op
  }
});

module.exports = EmailBookStore;
var EmailBookDispatcher = require('./EmailBookDispatcher');
var EmailBookConstants = require('./EmailBookConstants');

var ContactActions = {
  create: function(name, Email) {
    EmailBookDispatcher.dispatch({
      actionType: EmailBookConstants.CREATE_CONTACT,
      data: { name: name, Email: Email }
     
    });
  },

  remove: function(id) {
    EmailBookDispatcher.dispatch({
      actionType: EmailBookConstants.REMOVE_CONTACT,
      data:{ id: id }
    });
  }
};

module.exports = ContactActions;
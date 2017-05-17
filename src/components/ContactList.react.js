var React = require('react');
var ContactActions = require('../ContactActions');

/**
 * Group a list of contacts by the first letter of their name
 * and sort the list alphabetically
 * @param {array} contacts The list of contacts
 * @return {object}
 */
function groupAndSortByFirstLetter(contacts) {
  var groups = {};
  contacts.forEach(function(contact) {
    var firstLetter = contact.name[0].toUpperCase();
    (groups[firstLetter] || (groups[firstLetter] = [])).push(contact);
  });

  var letters = Object.keys(groups);
  letters.sort();

  var sortedGroups = {};
  letters.forEach(function(letter) {
    sortedGroups[letter] = groups[letter];
  });
  return sortedGroups;
}


var ContactList = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired
  },

  render: function() {
    var contactGroups = groupAndSortByFirstLetter(this.props.contacts);

    var panels = Object.keys(contactGroups).map(function(letter) {
      var listItems = contactGroups[letter].map(function(contact) {
        return (
          <li key={contact.id} className="list-group-item">
            <span className="badge">{contact.Email}</span>
            <i className="glyphicon glyphicon-remove" onClick={this._handleRemove.bind(this, contact)}></i> {contact.name}
          </li>
        );
      }.bind(this));

      return (
        <div key={letter} className="panel panel-default">
          <div className="panel-heading">{letter}</div>
          <div className="panel-body">
            <ul className="list-group">
              {listItems}
            </ul>
          </div>
        </div>
      );
    }.bind(this));

    return (
      <div className="contact-list">{panels}</div>
    );
  },

  _handleRemove: function(contact) {
    ContactActions.remove(contact.id);
  }
});

module.exports = ContactList;
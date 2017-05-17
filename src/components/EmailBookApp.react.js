var React = require('react');

var EmailBookStore = require('../EmailBookStore');
var ContactList = require('./ContactList.react');
var ContactsFilter = require('./ContactsFilter.react');
var ContactForm = require('./ContactForm.react');

var _filterValue = null;

/**
 * Get the state based on the store values
 * @return {object}
 */
function getStateFromStore() {
  return {
    contacts: filterContacts(_filterValue, EmailBookStore.getContacts())
  };
}

/**
 * Filter the list of contacts
 * @param {string} filterValue
 * @param {array} contacts
 * @return {array}
 */
function filterContacts(filterValue, contacts) {
  if (!filterValue || filterValue === '')
    return contacts;

  return contacts.filter(function(contact) {
    return contact.name.toLowerCase().indexOf(filterValue) >= 0;
  });
}

var EmailBookApp = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    EmailBookStore.addContactsChangedListener(this._onContactsChanged)
  },

  componentWillUnmount: function() {
    EmailBookStore.removeContactsChangedListener(this._onContactsChanged)
  },

  render: function() {
    return (
      <div >
        <div className="row">
          <h2>Please enter the Contact Details</h2>
          <ContactForm />
        </div>
        
    <div className="row">
          <h2>Your contacts</h2>
          <ContactsFilter onFilter={this._handleFilter} />
          <ContactList contacts={this.state.contacts} />
        </div>
        </div>
    );
  },

  _onContactsChanged: function() {
    this.setState(getStateFromStore());
  },

  _handleFilter: function(filterValue) {
    _filterValue = (filterValue || '').toLowerCase();
    this.setState(getStateFromStore());
  }
});

module.exports = EmailBookApp;
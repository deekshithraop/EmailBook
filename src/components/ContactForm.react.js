var React = require('react');
var ContactActions = require('../ContactActions');

var ContactForm = React.createClass({
  render: function() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input ref="name" type="text" name="name" className="form-control" id="name" placeholder="Enter name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input ref="email" type="text" name="email" className="form-control" id="email" placeholder="******@domain.com" />
        </div>
        <button type="button" className="btn btn-default" onClick={this._handleSubmit}>Add</button>
      </form>
    );
  },

  _handleSubmit: function() {
    var nameNode = this.refs.name.getDOMNode();
    var name = nameNode.value.trim();
    var emailNode = this.refs.email.getDOMNode();
    var email = emailNode.value.trim();
    console.log(email)
    ContactActions.create(name, email);
    nameNode.value = '';
    emailNode.value = '';
  }
});

module.exports = ContactForm;
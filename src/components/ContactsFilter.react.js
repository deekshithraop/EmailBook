var React = require('react');

var _lastValue;

var ContactsFilter = React.createClass({
  propTypes: {
    onFilter: React.PropTypes.func
  },

  render: function() {
    return (
      <form>
        <input ref="input" type="text" className="form-control"
               placeholder="Search your contacts..." onKeyUp={this._handleKeyUp} />
      </form>
    );
  },

  _handleKeyUp: function() {
    var value = this.refs.input.getDOMNode().value.trim();
    if (!_lastValue || value !== _lastValue) {
      _lastValue = value;
      if (this.props.onFilter) {
        this.props.onFilter(value);
      }
    }
  }
});

module.exports = ContactsFilter;
var Message = React.createClass({
  render: function () {
    return <li className="message">{this.props.content}</li>;
  }
});

module.exports = Message;

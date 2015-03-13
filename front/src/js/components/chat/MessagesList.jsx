var MessageComponent = require ('./Message');

var MessagesList = React.createClass({
  renderMessage: function (content) {
    return <MessageComponent key={content.id} content={content} />;
  },
  render: function () {
    return (
      <ul className="messages-list">
        {this.props.messages.map(this.renderMessage)}
      </ul>
    );
  }
});

module.exports = MessagesList;

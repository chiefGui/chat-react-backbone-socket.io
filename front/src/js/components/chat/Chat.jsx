var WriterComponent         = require ('./Writer')
    , MessagesListComponent = require ('./MessagesList')
    , socket                = io();

var Chat = React.createClass({
  getInitialState: function () {
    socket.on('message:received', this.handleMessageReceived);

    return {
      messages: []
    };
  },
  handleMessageReceived: function (message) {
    this.setState({ messages: this.state.messages.concat([message]) });
  },
  render: function () {
    return (
      <div className="chat">
        <MessagesListComponent messages={this.state.messages} />
        <WriterComponent />
      </div>
    );
  }
});

module.exports = Chat;

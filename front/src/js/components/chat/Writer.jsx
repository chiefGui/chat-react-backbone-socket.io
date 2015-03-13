var socket = io();

var Writer = React.createClass({
  getInitialState: function () {
    return {
      message: ''
    };
  },
  componentDidMount: function () {
    React.findDOMNode(this.refs.writerInput).focus();
  },
  clearInput: function () {
    this.setState({ message: '' });
  },
  handleChange: function (event) {
    this.setState({ message: event.target.value });
  },
  handleSubmit: function (event) {
    event.preventDefault();

    socket.emit('message:send', this.refs.writerInput.props.value);

    this.clearInput();
  },
  render: function () {
    return (<section className="writer">
      <form action="" onSubmit={this.handleSubmit}>
        <input
          ref="writerInput"
          value={this.state.message}
          onChange={this.handleChange}
          placeholder="Write something and press enter"
          className="writer-input form-control" />
      </form>
    </section>);
  }
});

module.exports = Writer;

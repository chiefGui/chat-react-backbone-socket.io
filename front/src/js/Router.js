var ChatComponent = require ('./components/chat/Chat')
    , socket      = io();

var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  initialize: function () {
    Backbone.history.start({
      pushState: true
    });
  },
  index: function () {
    React.render(React.createElement(ChatComponent), $('.app').get(0));
  }
});

module.exports = Router;

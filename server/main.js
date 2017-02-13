import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function () {
    return Links.find({});
  });
});

const middleware = ConnectRoute(function (router) {
  // localhost:3000/ NO MATCH
  // localhost:3000/books/abcd NO MATCH
  // localhost:3000/abcd WILL MATCH!!
  router.get('/:token', (req) => console.log(req));
});

WebApp.connectHandlers.use(middleware);

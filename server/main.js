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

// Executed on visits with a route like `localhost:3000/abcd`
function onRoute(req, res, next) {
  // Take the token and find first matching link in Links collection
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    // If link object found: redirect to Long URL
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // Else redirect to React App
    next();
  }
}

const middleware = ConnectRoute(function (router) {
  // localhost:3000/ NO MATCH
  // localhost:3000/books/abcd NO MATCH
  // localhost:3000/abcd WILL MATCH!!
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);

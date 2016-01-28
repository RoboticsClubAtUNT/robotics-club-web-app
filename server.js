// BASE SETUP
// ===========================================================================

// load init modules
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var JsonApiError = require('./errorHandler');
var mongoose = require('mongoose');

// load model schemas
var Post = require("./app/models/post");
var User = require("./app/models/user");

// generate the mongo db uri
var DB_USER = "untrobo";
var DB_PASS = "untrobotsareawesome";
var MONGO_DB_URI = "";
MONGO_DB_URI += "mongodb://" + DB_USER + ":" + DB_PASS;
MONGO_DB_URI += "@ds059682.mongolab.com:59682/untrobo";

// connect to the database
console.log("Connecting to database...");
mongoose.connect(MONGO_DB_URI, function(err) {
  if (err) throw err;
});
console.log("Connected to database.");

app.use(express.static('dist'));

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// handle operational errors
app.use(function(err, req, res, next) {
  var errorStack = err.stack.split('\n');
  var error = new JsonApiError({
    status: err.status,
    code: err.statusCode,
    title: errorStack[0],
    detail: err.stack
  });
  res.status(err.status).json({error: error});
});

var port = process.env.PORT || 8080;

var tempStorage = [];

// ROUTES FOR OUR API
// ===========================================================================

var router = express.Router();

// middleware for all requests
router.use(function(req, res, next) {
  // do logging
  // handle api key
  // handle CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // go to the appropriate route
});

// serve the API cheat sheet


// ROUTES GO HERE

// on routes that end in /posts
// -----------------------------------------------------

/**
 * Routes for our API
 *
 * POST (v1)
 * [ ] create a post
 * [ ] delete a post
 * [ ] find a post
 * [ ] get all the posts
 * [ ] update / edit a post
 */

router.route("/api/v1/posts")

  // create a post
  .post(function(req, res) {

    console.log("[POST] %s", req.path);

    var errors = [];
    var hasError = false;
    var data = req.body.data;

    if (!req.body.data) {
      errors.push(new JsonApiError({
        status: null,
        code: "1000",
        title: "POST Error",
        detail: "Expecting a 'data' object at the root of the request's body."
      }));
      hasError = true;
    }

    var post = new Post();

    try {

      // BUILD THE POST DOCUMENT
      if (!data.attributes) { throw "Missing 'attributes' property in 'data' object."; }
      post.type = "post";

      if (!data.attributes.title) { throw "Missing 'attributes.title' property in 'data' object."; }
      post.attributes.title = data.attributes.title; // required

      if (!data.attributes.body) { throw "Missing 'attributes.body' property in 'data' object."; }
      post.attributes.body = data.attributes.body; // required

      if (!data.attributes.kind) { throw "Missing 'attributes.kind' property in 'data' object."; }
      post.attributes.kind = data.attributes.kind; // required

      post.attributes.created = Date.now();
      post.attributes.updated = Date.now();

      post.attributes.tags = data.attributes.tags || null;
      post.attributes.isPrivate = data.attributes.isPrivate || false;
      post.attributes.isPublished = data.attributes.isPublished || false;

      if (!data.links) { throw "Missing 'links' property in 'data' object."; }
      post.links.first = data.links.first || null;

      post.links.next = data.links.next || null;
      post.links.self = "http://www.untrobotics.com/knowledgebase/" + data.attributes.kind + "/" + post._id;
      post.links.prev = data.links.prev || null;
      post.links.last = data.links.last || null;
      post.links.related = data.links.related || null;

      if (!data.relationships) { throw "Missing 'relationships' property in 'data' object."; }
      if (!data.relationships.author) { throw "Missing 'relationships.author' property in 'data' object."; }
      post.relationships.author.data._type = data.relationships.author.data._type;
      post.relationships.author.data._id = data.relationships.author.data._id;

    } catch (err) {

      console.error(err);
      errors.push(new JsonApiError({
        status: null,
        code: null,
        title: null,
        detail: err
      }));

    } finally {

      if (errors.length > 0) {
        res.json({ error: errors });
      } else {
        // save to the database
        post.save(function(err) {
          if (err) {
            var error = new JsonApiError({
              status: null,
              code: null,
              title: err.name,
              detail: err.message
            });
            res.status(500).json({ error: error });
          } else res.json({ data: post });
        });
      }
    }
  })

  // get an array of all the posts
  .get(function(req, res) {

    console.log("[GET] %s", req.path);

    Post.find(function(err, data) {
      var error = new JsonApiError({
        status: "500",
        code: null,
        title: "GET Error",
        detail: err
      });
      if (err) res.status(500).json({ error: error });
      else res.json({ data: data });
    });
  });

// on routes that end in /posts/:id
// ------------------------------------------------------
router.route("/api/v1/posts/:id")
  // get the post by id
  .get(function(req, res) {

    console.log("[GET] %s", req.path);

    var post_id = req.params.id;

    Post.findOne({ _id: post_id }, function(err, data) {
      if (err) {
        var error = new JsonApiError({
          status: null,
          code: null,
          title: err.name,
          detail: err.message
        });
        res.status(500).json({ error: error });
      } else res.json({ data: data });
    });

  })
  // delete the specific post
  .delete(function(req, res) {

    console.log("[DELETE] %s", req.path);

    var post_id = req.params.id;

    Post.remove({ _id: post_id }, function(err, data) {
      if (err) {
        var error = new JsonApiError({
          status: null,
          code: null,
          title: err.name,
          detail: err.message
        });
        res.status(500).json({ error: error });
      } else res.json({ data: data });
    });
  })
  // update the post
  .patch(function(req, res) {

    console.log("[PATCH] %s", req.path);

    var post_id = req.params.id;

    var errors = [];
    var hasError = false;
    var data = req.body.data;

    if (!req.body.data) {
      errors.push(new JsonApiError({
        status: null,
        code: "1000",
        title: "POST Error",
        detail: "Expecting a 'data' object at the root of the request's body."
      }));
      hasError = true;
    }


    Post.findById(post_id, function(err, post) {
      try {

        // BUILD THE POST DOCUMENT FOR PATCHING
        // we are essentailly replacing the doc completely but
        // always keeping _id and data.attributes.created the same

        if (!data.attributes) { throw "Missing 'attributes' property in 'data' object."; }
        post.type = "post";

        if (!data.attributes.title) { throw "Missing 'attributes.title' property in 'data' object."; }
        post.attributes.title = data.attributes.title; // required

        if (!data.attributes.body) { throw "Missing 'attributes.body' property in 'data' object."; }
        post.attributes.body = data.attributes.body; // required

        if (!data.attributes.kind) { throw "Missing 'attributes.kind' property in 'data' object."; }
        post.attributes.kind = data.attributes.kind; // required

        post.attributes.created = data.attributes.created;
        post.attributes.updated = Date.now();

        post.attributes.tags = data.attributes.tags || null;
        post.attributes.isPrivate = data.attributes.isPrivate || false;
        post.attributes.isPublished = data.attributes.isPublished || false;

        if (!data.links) { throw "Missing 'links' property in 'data' object."; }
        post.links.first = data.links.first || null;

        post.links.next = data.links.next || null;
        post.links.self = "http://www.untrobotics.com/knowledgebase/" + data.attributes.kind + "/" + post_id;
        post.links.prev = data.links.prev || null;
        post.links.last = data.links.last || null;
        post.links.related = data.links.related || null;

        if (!data.relationships) { throw "Missing 'relationships' property in 'data' object."; }
        if (!data.relationships.author) { throw "Missing 'relationships.author' property in 'data' object."; }
        post.relationships.author.data._type = data.relationships.author.data._type;
        post.relationships.author.data._id = data.relationships.author.data._id;

      } catch (someError) {

        console.error(someError);
        someError.push(new JsonApiError({
          status: null,
          code: null,
          title: null,
          detail: someError
        }));

      } finally {

        if (errors.length > 0) {
          res.json({ error: errors });
        } else {
          // save to the database
          post.save(function(err, doc) {
            if (err) {
              var error = new JsonApiError({
                status: null,
                code: null,
                title: err.name,
                detail: err.message
              });
              res.status(500).json({ error: error });
            } else res.json({ data: doc });
          });
        }
      }
    });
  });

router.route("/api/v1/users")
  .post(function(req, res) {

    console.log("[POST] %s", req.path);

    var errors = [];
    var hasError = false;
    var data = req.body.data;

    if (!req.body.data) {
      errors.push(new JsonApiError({
        status: null,
        code: "1000",
        title: "POST Error",
        detail: "Expecting a 'data' object at the root of the request's body."
      }));
      hasError = true;
    }

    var user = new User();

    try {

      // BUILD THE POST DOCUMENT
      if (!data.attributes) { throw "Missing 'attributes' property in 'data' object."; }
      user.type = "user";

      if (!data.attributes.name) { throw "Missing 'attributes.name' property in 'data' object."; }
      user.attributes.name = data.attributes.name; // required

      if (!data.attributes.password) { throw "Missing 'attributes.password' property in 'data' object."; }
      user.attributes.password = data.attributes.password; // required

      if (!data.attributes.email) { throw "Missing 'attributes.email' property in 'data' object."; }
      user.attributes.email = data.attributes.email; // required

      user.attributes.created = Date.now();
      user.attributes.updated = Date.now();

      user.attributes.avatarUrl = data.attributes.avatarUrl || null;
      user.attributes.isMember = data.attributes.isMember || false;
      user.attributes.isVerified = data.attributes.isVerified || false;
      user.attributes.isAdmin = false;

    } catch (err) {

      console.error(err);
      errors.push(new JsonApiError({
        status: null,
        code: null,
        title: null,
        detail: err
      }));

    } finally {

      if (errors.length > 0) {
        res.json({ error: errors });
      } else {
        // save to the database
        user.save(function(err) {
          if (err) {
            var error = new JsonApiError({
              status: null,
              code: null,
              title: err.name,
              detail: err.message
            });
            res.status(500).json({ error: error });
          } else res.json({ data: user });
        });
      }
    }
  })
  .get(function(req, res) {
    console.log("[GET] %s", req.path);

    User.find(function(err, data) {
      var error = new JsonApiError({
        status: "500",
        code: null,
        title: "GET Error",
        detail: err
      });
      if (err) res.status(500).json({ error: error });
      else res.json({ data: data });
    });
  });

router.get("/*", function(req, res) {
  var options = {
    root: __dirname + "/dist/"
  };

  res.sendFile("index.html", options, function(err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log("Served Client!!!");
    }
  });
});


// register the routes
app.use('/', router);

// START THE SERVER
app.listen(port);
console.log("Magic is happening on port %s", port);

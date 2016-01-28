# Robotics Club @ UNT's API (v1)

This API adheres to v1.0 of the [JSONAPI specification](http://jsonapi.org/format/).

| API Actions                                       |
| ------------------------------------------------- |
| [Create a Post](#create-a-post)                   |
| [Find All the Posts](#find-all-the-posts)         |
| [Find a Specific Post ](#find-a-specific-post)    |
| [Remove a Specific Post](#remove-a-specific-post) |
| [Update a Specific Post](#update-a-specific-post) |

### Create A Post

Create a new Post and save it to the database.

> ##### URL
`/api/v1/posts`

> ##### Method
`POST`

> ##### URL Params
None

> ##### Data Params
``` js
{
  "data": {
    "attributes": {
      "title": String,
      "body": String,
      "kind": String,
      "tags": String,
      "isPrivate": Boolean,
      "isPublished": Boolean
    },
    "links": {
      "first": String,
      "next": String,
      "prev": String,
      "last": String,
      "related": String
    },
    "relationships": {
      "author": {
        "data": {
          "_type": String,
          "_id": String
        }
      }
    }
  }
}
```

> ##### Success Response

> ##### Error Response

> ##### Example

### Find All The Posts

Returns a JSON document with an array of all the posts
within the database.

> ##### URL
`/api/v1/posts`

> ##### Method
`GET`

> ##### URL Params
None

> ##### Data Params
None

> ##### Success Response
``` js
{
  "data": [{
    "type": String,
    "_id": String,
    "attributes": {
      "title": String,
      "body": String,
      "kind": String,
      "created": Date,
      "updated": Date,
      "tags": String,
      "isPrivate": Boolean,
      "isPublished": Boolean
    },
    "links": {
      "first": String,
      "next": String,
      "self": String,
      "prev": String,
      "last": String,
      "related": String
    },
    "relationships": {
      "author": {
        "data": {
          "_type": String,
          "_id": String
        }
      }
    }
  }, ...]
}
```

> ##### Error Response

> ##### Example



### Find A Specific Post

Returns a JSON document with an array of all the posts
within the database.

> ##### URL
`/api/v1/posts/:id`

> ##### Method
`GET`

> ##### URL Params
None

> ##### Data Params
None

> ##### Success Response
``` js
{
  "data": {
    "type": String,
    "_id": String,
    "attributes": {
      "title": String,
      "body": String,
      "kind": String,
      "created": Date,
      "updated": Date,
      "tags": String,
      "isPrivate": Boolean,
      "isPublished": Boolean
    },
    "links": {
      "first": String,
      "next": String,
      "self": String,
      "prev": String,
      "last": String,
      "related": String
    },
    "relationships": {
      "author": {
        "data": {
          "_type": String,
          "_id": String
        }
      }
    }
  }
}
```

> ##### Error Response

> ##### Example


### Remove A Specific Post

Returns a JSON document with an array of all the posts
within the database.

> ##### URL
`/api/v1/posts/:id`

> ##### Method
`DELETE`

> ##### URL Params
None

> ##### Data Params
None

> ##### Success Response

> ##### Error Response

> ##### Example


### Update A Specific Post

Returns a JSON document with an array of all the posts
within the database.

> ##### URL
`/api/v1/posts/:id`

> ##### Method
`PATCH`

> ##### URL Params
None

> ##### Data Params
None

> ##### Success Response

> ##### Error Response

> ##### Example

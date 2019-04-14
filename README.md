# mini-wp

## Articles Route
**Note:**  <br>*  *is required*
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/articles</span> | *token | *title, *content, *image, tags | Status: 201<br>Object{id, title, content, featured_image, author, tags, createdAt, updatedAt} | Status: 400<br>Object { message: `title / content / image required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Create a Article
 GET | <span style="color:red">/articles</span> | *token |  | Status: 200<br>[Object{id, title, content, featured_image, author, tags, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All User's articles
 GET | <span style="color:red">/articles/my</span> | *token |  | Status: 200<br>Object{id, title, content, featured_image, author, tags, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | All user's article
 GET | <span style="color:red">/articles/:id</span> | *token |  | Status: 200<br>Object{id, title, content, featured_image / author, tags, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | One article based on article's id
 PUT | <span style="color:red">/articles/:id</span> | *token | *title, *content, *image, tags | Status: 200<br>Object{id, title, content, featured_image, author, tags, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Update a Article
 DELETE | <span style="color:red">/articles/:id</span> | *token |  | Status: 200<br>Object{id, title, content, featured_image, author, tags, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Delete a Article

<br>

## Users Route
**Note:**  *  *is required*
 HTTP | Router | Body | Success | Error | Description
------|--------|------|---------|-------|------------
 POST | <span style="color:red">/users/signin</span> |  *email, *password | Status: 200<br>Object{token, id, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Sign In User  
 POST | <span style="color:red">/users/signup</span> |  *email, *password | Status: 201<br>Object{email, password, createdAt, updatedAt} | Status: 400<br>Object { message: `Email / password required` }<br>Status: 400<br>Object { message: `Email / password wrong` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign Up User  
 POST | <span style="color:red">/users/googlesignin</span> | *idToken  | Status: 200<br>Object{token, id, createdAt, updatedAt} | Status: 400<br>Object { message: `Email / password required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign In User using Google Sign In 

<br>

## Tags Route
**Note:**  <br>*  *is required*
  HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 GET | <span style="color:red">/tags</span> | *token |  | Status: 200<br>[Object {id, name, [articles], createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All tags
 GET | <span style="color:red">/tags/one</span> | *token |  | Status: 200<br>Object {id, name, [articles], createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Get a tag based on query

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:<br>
$npm install<br>
$npm run start or $npm run dev<br>

Access the Server side via http://localhost:5000/.

Access the Client side via http://localhost:8080/.
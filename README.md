# Simply Blog
The application is a blogging engine built with ASP.NET Core Web API. 
Client app is built with React JS.

The application is using XML file as data storage. 
There is only one user account - administrator. Default credentials:

    username: admin 
    password: admin 

## Features
* CRUD operations
* Administrator account
* Anonymous comments
* XML storage 
* Paging
* Rich textbox based on Draft.js
* Images manager (upload, delete, get link)

## Getting Started
### Prerequisites
* .NET Core 2.1+

### Configuration
Admin is authenticated via JWT. The token is valid for 3 days. The token should be send via Authorization header:
`headers: {
Authorization: Bearer {token}
}`

## End Points
##### Administrator:
* **Authenticate:** POST - allow anonymous user
url: `/api/admin/auth`
request body: `{
	"username": "admin",
	"password": "admin"
}`

* **Update Credentials:** POST - allow only authorized user
url: `/api/admin/credential`
request body: `{
	"login": "admin",
	"password": "admin",
    "secret": "abcdefghijklmnoprstuwxyzabcdefghijklmnoprstuwxyzabcdefghijklmnoprstuwxyz"
}`
All parameters are optional. 
**Secret must be at least than 64 characters long.**

* **Update About:** POST - allow only authorized user
url: `/api/admin/about`
request form: `{
    "about": "Lorem ipsum...",
    "useExistingImage": false,
    "image": [file]
}`

* **Update Header Image:** POST - allow only authorized user
url: `/api/admin/header`
request: `{
    "image": [file]
}`

* **Upload Image:** POST - allow only authorized user
url: `/api/admin/upload`
request: `{
    "image": [file]
}`

* **Delete Image:** POST - allow only authorized user
url: `/api/admin/images/{id}`
query parameters: 
`id` | string; required |

* **Get all Uploaded Images:** POST - allow only authorized user
url: `/api/admin/images`

##### Posts:
* **Get posts:** GET - allow anonymous user
url: `/api/blog/posts/{page}`
query parameters: 
`page` | integer; required | Show posts from the page.

* **Get post:** GET - allow anonymous user
url: `/api/blog/{id}`
query parameters: 
`shortPost` | boolean; optional; default: false | If true returns post without comments.

* **Create post:** POST - allow only authorized user
url: `/api/blog/new`
json: `{"title": "New Post", "content": "Some random text", "image": "c:\fake.jpg"}`
All parameters are required.

* **Edit post:** PATCH - allow only authorized user
url: `/api/blog/{id}}`
json: `{"title": "New Post", "content": "Some random text", "image": "c:\fake.jpg"}`
All parameters are required.

* **Delete post:** DELETE - allow only authorized user
url: `/api/blog/{id}}`

##### Comments:
* **Get all post's comments:** GET - allow anonymous user
url: `/api/blog/comments/{id}`
query parameters: 
`id` | guid; required | Post identifier.

* **Create comment:** POST - allow anonymous user
url: `/api/blog/{id}/new}`
json: `{"author": "me", "content": "Some random text", "email": "fake@fake.com"}`
`content` and `email` are required
query parameters: 
`id` | guid; required | Post identifier.

* **Delete comment:** DELETE - allow only authorized user
url: `/api/blog/{postId}/{id}}`

##### Utilities:
* **Get header image:** GET - allow anonymous user
url: `/api/blog/header`

* **Get about section:** GET - allow anonymous user
url: `/api/blog/about`

* **Get all tags:** GET - allow anonymous user
url: `/api/blog/tags`

## Built With
### Server side:
* ASP.NET Core 2.1
* Automapper

### Client side:
* ReactJS 16.8
* Redux 4.0
* React-Router 5.0
* Axios 

## License
This project is licensed under MIT License.

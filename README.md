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
json: `{
	"username": "admin",
	"password": "admin"
}`

* **Change Password:** POST - allow only authorized user
url: `/api/admin/changePassword?value=newPassword`
query parameters: 
`value` | string; required | New password.

* **Change Login:** POST - allow only authorized user
url: `/api/admin/changeLogin?value=newLogin`
query parameters: 
`value` | string; required | New login.

* **Change Secret:** POST - allow only authorized user
url: `/api/admin/changeSecret?value=abcdefghijklmnoprstuwxyzabcdefghijklmnoprstuwxyzabcdefghijklmnoprstuwxyz`
query parameters: 
`value` | string; required | New secret. It's used for authentication via JWT. **Must be longer than 64 characters.**

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
* **Get comments:** GET - allow anonymous user
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

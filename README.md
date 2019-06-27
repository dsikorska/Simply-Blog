# Simply Blog
The application is a blogging ASP.NET Core Web API. 
Client app is built with React JS.

* The application is using XML file as data storage. 

* There is only one user account - administrator. Default logging:

    username:``` admin ```
    password:``` admin ```

## Features
* CRUD operations
* Administrator account
* Everyone can write comments
* XML storage 

## Getting Started
### Prerequisites
* .NET Core 2.1+

### Configuration
```appsettings.json``` file is a configuration file.
The section ```secret``` is used for generating security token. The token is needed for authorizing the administrator. You can modify it directly. New secret text have to be longer than 64 characters.

#### How to change password?
The password is stored as encrypted hash in ```appsettings.json```. You shouldn't change it directly. 

##### Change password using Web API:
* Please make a request to the end point:
```/api/admin/hash```
* As a respond you'll receive some long strange text. 
* Open ```appsettings.json```. Replace the text at section ```hash```. 
**Don't forget about quotes!**

#### How to change username?
You can replace section ```username``` in ```appsettings.json``` directly!

## End Points
* soon

## Built With
* ASP.NET Core 2.1

## License
This project is licensed under MIT License.

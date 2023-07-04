# myFlix-client

## Objective

Using React, the client-side for an app called myFlix based on its
existing server-side code (REST API and database) is being built. 
The interface they’ll use when making requests to—and receiving responses from—the server-side is being created. The
client-side of the myFlix app includes several interface views (built using the React library) that will
handle data through the (previously defined) REST API endpoints.

## Essential Views & Features:

### Main view

+ Returns ALL movies to the user (each movie item with an image, title, and description)
+ Filtering the list of movies with a “search” feature
+ Ability to select a movie for more details
+ Ability to log out
+ Ability to navigate to Profile view

### Single Movie view
+ Returns data (description, genre, director, image) about a single movie to the user
+ Allows users to add a movie to their list of favorites

### Login view
+ Allows users to log in with a username and password

### Signup view
+ Allows new users to register (username, password, email, date of birth)

### Profile view
+ Displays user registration details
+ Allows users to update their info (username, password, email, date of birth)
+ Displays favorite movies
+ Allows users to remove a movie from their list of favorites
+ Allows existing users to deregister

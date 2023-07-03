# movie-api-frontend-cab230
CAB230 (Web Computing) is an introductory unit into web-based software systems, giving students practical experience with HTML, CSS and frameworks such as React on the client side and node.js, Express and the node ecosystem on the server side. The project featured in this repository is the second assignment (A2) for CAB230, completed in semester 1, 2023.

The backend REST API provided for the assessment had multiple authenticated and non-authenticated endpoints, requiring us to manage user tokens on the client side via browser local storage. As UI design was not a significant consideration in the marking criteria, pages are minimalistic, relying heavily on react-bootstrap components. Here are some examples:
<details>
  
  <summary>Screenshots</summary>
  /search
  
  ![image](https://github.com/JamieThomasAnderson/movie-api-frontend-cab230/assets/96888832/20aa5b33-c38c-4233-a87d-0c2b111a3402)

  /movie?imdbID=imdbID

  ![image](https://github.com/JamieThomasAnderson/movie-api-frontend-cab230/assets/96888832/9e597cda-0632-4897-849c-e4c728557d47)

  /actor?actorID=actorID
  
  ![image](https://github.com/JamieThomasAnderson/movie-api-frontend-cab230/assets/96888832/73619365-d6ab-481b-bd1a-d15f05cc578d)

</details>

# Setup

Without access to the backend to make requests, there is little point in running it yourself. But below are the instructions:

### Prerequisites

Install [Node.js and npm](https://nodejs.org/en/download/)

### Installation  

```sh
git clone https://github.com/JamieThomasAnderson/movie-api-frontend-cab230.git
cd movie-api-frontend-cab230
npm install
npm start
```
The application will now be running at http://localhost:3000/

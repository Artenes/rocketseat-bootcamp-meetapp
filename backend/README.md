[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/backend">
    <img src="https://i.imgur.com/GiiNYKp.jpg" alt="Logo" width="90" height="80">
  </a>

  <h3 align="center">Meetapp (backend)</h3>

  <p align="center">
    Create and organize meetups about programing!
    <br />
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## About The Project

REST API to help create, manage and list meetups about programming. This is not a flesh out product ot be used in production, it is just a demo application created during [Rocketseat's GoStack bootamp](https://rocketseat.com.br/bootcamp).

### Built With

* [Node js](https://nodejs.org)
* [Express](https://expressjs.com)
* [Sequelize](https://sequelize.org/)

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* Node js
* npm
* yarn
* Postgres database (recomend using a docker image for that)

### Installation

1. Clone the repo
```sh
git clone https://github.com/Artenes/rocketseat-bootcamp-meetapp
```

2. Access the `backend` directory
```sh
cd rocketseat-bootcamp-meetapp/backend
```

3. Install dependencies
```sh
yarn
```

4. Create a copy of the .env.example file
```sh
cp .env.example .env
```

5. Configure the .env file

6. Have a postegres database running and then run the migrations to create the tables
```sh
yarn sequelize db:migrate
```

7. Run the server
```sh
yarn dev
```

## Usage

In the root folder there is a file called `meetapp-insomnia.json` that can be imported into [Insomnia](https://insomnia.rest/). There there will be tests with sample requests for each available route.

There are protected and unprotected routes. To access a protected route, you need a `JWT` token in the header of the requeast as such:

```sh
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTY3OTUwMTM2LCJleHAiOjE1Njg1NTQ5MzZ9.JPHK7jwgSgvdVABon2HxtJT6ddofu6EWW53az6qF-0M
```
For that you have to create a user in the `POST /users` endpoint, then create a session in `POST /sessions` endpoint. See endpoints descriptions below for more details.

### Users

A user that can create meetups and take part on them.

#### POST /users

Creates a new user.

Body
```json
{
  "name": "Jhon",
  "email": "jhon@doe.com",
  "password": "123456"
}
```

#### PUT /users [protected]

Edits the current logged in user.

Body
```json
{
  "name": "New Jhon",
  "email": "newjhon@doe.com",
  "oldPassword": "123456",
  "password": "1234567",
  "confirmPassword": "1234567"
}
```

### Sessions

A session to access protected routes in the API.

#### POST /sessions

Creates a new `JWT` token for a user.

Body
```json
{
  "email": "jhon@doe.com",
  "password": "123456"
}
```

### Files

An image used by another resource. Files must be uploaded separately from the requests that need them.

#### POST /files

Uploads a new file.

Body - Multipart Form
```json
file: file/path
```

#### Meetups

A meetup of users.

#### GET /events

Lists all meetups in the application for guests to browse.

#### POST /meetups [protected]

Creates a new meetup with the logged user as the organizer.

Body
```json
{
  "title": "A meetup",
  "description": "Some random meetup",
  "localization": "New York",
  "date": "2019-10-20T15:00:00-04:00",
  "image_id": 1
}
```

#### PUT /meetups/:id [protected]

Edits the details with a meetup that belongs to the user with the given id.

Body
```json
{
  "title": "A new meetup",
  "description": "Some new random meetup",
  "localization": "New New York",
  "date": "2019-11-20T15:00:00-04:00",
  "image_id": 2
}
```

#### GET /meetups [protected]

Lists all meetups created by the logged user.

#### DELETE /meetups/:id [protected]

Cancels (hard delete) a meetup that belongs to the user with the given id.

### Registrations

Is when a user register to attend to a meetup created by another user.

#### POST /registrations [protected]

Creates a new registration in a meetup.

Body
```json
{
  "meetup_id": 1
}
```

#### GET /registrations [protected]

Lists all registration of the logged user.

## Contributing

Contributions are welcome, even though this was made only for learning purposes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Artenes Nogueira - [artenes.nogueira@gmail.com](mailto:artenes.nogueira@gmail.com)

My blog: [http://artenesbok.com/](http://artenesbok.com/)

My Linkedin: [https://www.linkedin.com/in/artenes/](https://www.linkedin.com/in/artenes/)

README template from: [https://github.com/othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)

[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/artenes/

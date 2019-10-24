[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/backend">
    <img src="https://i.imgur.com/GiiNYKp.jpg" alt="Logo" width="90" height="80">
  </a>

  <h3 align="center">Meetapp</h3>

  <p align="center">
    Create and organize meetups about programing!
    <br />
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Applications](#applications)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## About The Project

Full-stack application to create and manage meetups about programming. This is not a flesh out product to be used in production, it is just a demo application created during [Rocketseat's GoStack bootamp](https://rocketseat.com.br/bootcamp).

### Applications

Each application has its own README. Click in the titles below for more details.

#### [Backend](https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/backend)

A REST API made in [Node js](https://nodejs.org). This is the core of the application where all the user and meetups data is managed.

#### [Web](https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/web)

A SPA web application made in [React JS](https://reactjs.org/). This is where meetups organizers goes to create and manage meetups.

#### [Mobile](https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/mobile)

A mobile application made with [React Native](https://facebook.github.io/react-native/). This is where attendees goes to browse and subscribe to meetups. **Only the android version of the app was tested. The IOs version might not work properly**.

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

You need these tools installed and configured to run the application in your machine.

* [Node JS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/lang/en/)
* A [Postgres SQL](https://www.postgresql.org/) database
* A mailing service such as [mailtrap](https://mailtrap.io)
* Have [Java and Android setup in your machine](https://www.decoide.org/react-native/docs/android-setup.html) (the IOs build for the mobile application was not tested so it might not work)
* Have a real device with android connected via usb or an emulator ([Genymotion is recomended](https://www.genymotion.com))

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

5. Configure the .env file (make sure to have your database running with a database created and an mailing service credentials at hand).

6. Run the migrations to create the tables. Make sure the database you set in .env exists.
```sh
yarn sequelize db:migrate
```

You can also run a seeder to setup some test data.
```sh
yarn sequelize db:seed:all
```

7. Run the server
```sh
yarn dev
```

8. Access the `web` directory
```sh
cd .. && cd web
```

9. Install dependencies
```sh
yarn
```

10. Run the app
```sh
yarn start
```

11. Access the `mobile` directory
```sh
cd .. && cd mobile
```

12. Install dependencies
```sh
yarn
```

13. Make sure you got an emulator or a device with android running.

14. Revers ports so your device can connect to the backend and [Reactotron](https://github.com/infinitered/reactotron)

For backend:
```sh
adb reverse tcp:3333 tcp:3333
```

For Reactotron:
```sh
adb reverse tcp:9090 tcp:9090
```

15. Run the app
```sh
yarn android
```

For consecutive runs just call
```sh
yarn start
```

In the end all 3 apps must be up and running ready to be used.

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

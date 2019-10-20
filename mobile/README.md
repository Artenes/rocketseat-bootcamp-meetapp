[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/backend">
    <img src="https://i.imgur.com/GiiNYKp.jpg" alt="Logo" width="90" height="80">
  </a>

  <h3 align="center">Meetapp (mobile)</h3>

  <p align="center">
    Create and organize meetups about programing!
    <br />
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Target Platforms](#target-platforms)
  * [Built With](#built-with)
  * [Tooling](#tooling)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## About The Project

Mobile application made with react-native to browse and take part in meetups made for developers. This is not a flesh out product to be used in production, it is just a demo application created during [Rocketseat's GoStack bootamp](https://rocketseat.com.br/bootcamp).

### Target Platforms

- Android
- IOs (**not tested, it will probably not work**)

If running the mobile app, do **it on Android**. No tests were made on an IPhone. React native can target both platforms but probably IOs will not work out of the box for you since it was not tested.

### Built With

* [React Native](https://facebook.github.io/react-native/)
* [Redux](https://redux.js.org/)
* [Redux-Saga](https://redux-saga.js.org/)

### Tooling

* [Reactotron](https://github.com/infinitered/reactotron)
* [Prettier](https://prettier.io/)
* [ESLint](https://eslint.org/)

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* Have [java and android setup in your machine](https://www.decoide.org/react-native/docs/android-setup.html)
* Have a real device with android connected via usb or an emulator ([Genymotion is recomended](https://www.genymotion.com))
* Have the [cli for react-native](https://medium.com/@mohitaunni/react-native-cli-explained-for-beginners-4725a271c30d)
* Have the [backend set up](https://github.com/Artenes/rocketseat-bootcamp-meetapp/tree/master/backend)

### Installation

1. Clone the repo
```sh
git clone https://github.com/Artenes/rocketseat-bootcamp-meetapp
```

2. Access the `mobile` directory
```sh
cd rocketseat-bootcamp-meetapp/mobile
```

3. Install dependencies
```sh
yarn
```

4. Make sure the backend app is running

5. Revers ports so your device can connect to the backend and [Reactotron](https://github.com/infinitered/reactotron)

For backend:
```sh
adb reverse tcp:3333 tcp:3333
```

For Reactotron:
```sh
adb reverse tcp:9090 tcp:9090
```

6. Run the app
```sh
react-native run-android
```

For consecutive runs just call
```sh
react-native start
```

## Features

### SignUp
Allows users to create an account.
![Signup](images/signup.jpg)

### SignIn
Allows users to enter in the application.
![Signup](images/signin.jpg)

### Dashborad
Displays a list of the meetups available to take part in.
![Signup](images/dashboard.jpg)

### Registrations
Shows meetups where user took part.
![Signup](images/registrations.jpg)

### Profile
Shows user data and allow to edit them.
![Signup](images/profile.jpg)

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

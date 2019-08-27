# Meetapp backend

# How was setup

### Node JS

[Node JS](https://nodejs.org) a JavaScript runtime build on Chrome's V8 JavaScript
engine. We will use it as the base for our application.

### Yarn

[Yarn](https://yarnpkg.com) is a dependency management tool. It will be used to manage third-party libraries in our project.

Initializes a new project:

```shell
yarn init -y
```

### Express

[Express](https://expressjs.com/) is a framework that we will use to make a REST API.

Install it with yarn:

```shell
yarn add express
```

### Sucrase

[Sucrase](https://sucrase.io/) is a library that converts `CommonJS` code into `ES6`. We will use it
to write code using `ES6` specifications such as `import from` and `export default`.
`Node JS` do not understand `ES6`, that is why we need a tool such as `Sucrase`.
This is mostly a preference, we can still just use `CommonJS` specification.

Install it with yarn as a dev dependency:

```shell
yarn add sucrase -D
```

### Nodemon

[Nodemon](https://nodemon.io/) is a utility that will monitor for any changes in your
source and automatically restart our server. It will be used just as a tool to make or
development faster.

Install it with yarn as a dev dependency:

```
yarn add nodemon -D
```
Nodemon just delegate calls to `node` to run our project, since `node` do not
understand `ES6` it will break. That is why we have to tell `nodemon` to use
`sucrase` to run our code with a configuration file in the root of our project:

`nodemon.json`
```json
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

### EditorConfig

[EditorConfig](https://editorconfig.org/) is a tool that helps maintain consistent
coding styles for multiple developers. It will be used to constrain some code
style rules into our text editor our IDE so it can format our code properly.

For it to work you need to install a plugin for your text editor or IDE of choice
and make it read the file available in the root of the project:

`.editorconfig`
```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter. It will be used
as a tool to automatically format our code whe we save a file.

Install it with yarn as a dev dependency:

```
yarn add prettier -D
```

It will have a set of rules already defined, but we will tell it a couple more things
to worry about when formating our files in a configuration file in the root of the project:

`.prettierrc`
```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### ESLint
[ESLint](https://eslint.org/) is a linting utility for JavaScript and JSX. It will
be used to also enforce a code style and standard in our code.

Install it with yarn as a dev dependency among other utilities to work with Prettier:

```
yarn add eslint eslint-config-prettier eslint-plugin-prettier -D
```
Create a configuration file with:

```
yarn eslint --init
```

Choose the following options in the wizard:
- To check syntax, find problems and enforce code style
- JavaScript modules (import/export)
- None of these
- Node (press i to select it)
- Use a popular style guide
- Airbnb (https://github.com/airbnb/javascript)
- JavaScript

Any prompt that appears, just type Y and hit enter.

Then make your configuration file in the project's root to look like this:

`.eslintrc.js`
```javascript
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
```
### Sequelize

[Sequelize](https://sequelize.org/) is a promise-base Node.js ORM. It will be used
to help us deal with access to a relational database and to manage the tables on it.

Install it with yarn along other libraries to help it access a postgres database:

```
yarn add sequelize pg pg-hstore
```

Also install sequelize-cli, that is a cli to help generate files used by sequelize:

```
yarn add sequelize-cli -D
```

Sequelize need to know where we want to put some files it needs to work. For that
we create this file in the root of the project:

`.sequelizerc`
```javascript
const { resolve } = require('path');

module.exports = {
  'config': resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
}
```
Note that this configuration is just a suggestion on how to organize the project,
these paths can point to anywhere within the project directory.

We have to tell sequelize how to acces our postgres database. For that we create the
/src/config/database.js in our project:

`database.js`
```javascript
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
Note that this file is the same one defined in `.sequelizerc` file.
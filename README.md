# Star Wars Galaxy

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/github/civa86/star-wars-galaxy/badge.svg?branch=master)](https://coveralls.io/github/civa86/star-wars-galaxy?branch=master)
[![Build Status](https://travis-ci.org/civa86/star-wars-galaxy.svg?branch=master)](https://travis-ci.org/civa86/star-wars-galaxy)
[![Dependency Status](https://david-dm.org/civa86/star-wars-galaxy.svg)](https://david-dm.org/civa86/star-wars-galaxy)

This project wants to collect instruments and best practices to build a modern progressive web application.

Data are provided by the public [Star Wars Api](https://swapi.co/).

## Development

```bash
npm run start
```

Project has been started with [create-react-app](https://github.com/facebook/create-react-app).

Default tools and configurations provided by CRA (no `eject`):

* Code Transpilation: [Babel](https://babeljs.io/).
* Code Linting: [ESLint](https://eslint.org/) with `react-app` configuration.
* Code Packaging: [webpack](https://webpack.js.org/)

#### Application Structure

###### Root folder

```bash
.
├── README.md           # Readme documentation
├── docs                # Documentation assets
├── package-lock.json   # Locked dependencies tree
├── package.json        # Main project file
├── public              # Public Assets
└── src                 # Source code files
```

###### Source Code folder

```bash
./src/
├── components                  # contains all components
├── containers                  # contains all connected components (containers)
├── index.js                    # main file
├── less                        # contains less stylesheets files
├── middleware                  # redux middlewares
├── reducers                    # redux application logic
├── registerServiceWorker.js    # production service worker
├── setupTests.js               # add enzyme to jest test runner
├── store.js                    # redux store
└── utils                       # utils functions
```

#### Code Style

```bash
npm run code-style
```

Tool: [Prettier](https://prettier.io/)

Code Style Check is attached to `pre-commit` hook: staged files are processed with prettier before every commit action.

Configure code style with `prettier` property in `package.json` file.

Git Hook Configuration:

* `precommit` script (not supposed to run manually)
* `lint-staged` property in `package.json`

#### Unit Testing

```bash
npm test
```

Tools: [Jest](https://facebook.github.io/jest/) + [Enzyme](http://airbnb.io/enzyme/)

Running mode depends on `CI` environment variable:

* CI with `true` value for single run
* CI with no value for watch mode

###### Coverage

```bash
npm run coverage
```

Runs test and produce coverage report

Configure files to be included into coverage report with `jest.collectCoverageFrom` property in `package.json`.

#### CSS Preprocessor

```bash
npm run < watch-css | build-css >
```

Tool: [less](http://lesscss.org/)

Produce `src/style.css` file.

Automatically triggered on every `src/less/style.less` update if in `watch` mode.

## Application Logic

Application logic is totally managed with [redux](https://redux.js.org/).

SWAPI async communication is managed with [redux-api-middleware](https://www.npmjs.com/package/redux-api-middleware)
REST API requests are processed within the middleware calling `fetch`.

## NPM Scripts

Usage:

```bash
npm run < script >
```

| script     | description                                   |
| ---------- | --------------------------------------------- |
| start      | start the development workflow                |
| watch-css  | produce the style.css file, watch mode        |
| test       | run unit test, watch mode based on CI env var |
| coverage   | produce the coverage report                   |
| code-style | run code style check on src files             |
| build      | produce the production build                  |
| build-css  | produce the style.css file, single run        |

## Continuous Integration

Application is continuously built with Travis CI.

Every push sent to `master` or one opened `pull requests` triggers the build process.

#### Build Process

`master branch + pull requests`

* Unit Test the application
* Build the style.css file from less source code
* Build the production package

#### After Build

`only master branch`

All builds that are not triggered on a `pull request` produce coverage report.

Coverage Report uploaded to [coveralls](https://coveralls.io/).

## Continuous Delivery

Every push sent to `master` triggers the deploy process.

Pull Request builds never trigger deploy.

#### Before Deploy

* Read application version from `package.json`.
* Write `version.txt` with version and travis incremental build number.
* Add `version.txt` to `build/static` folder.
* Zip the `build` folder into `star-wars-galaxy.zip` artifact archive.
* Git Tag with version and travis incremental build number.

#### Deploy Process

* Upload website on `firebase` hosting.
* Upload `star-wars-galaxy.zip` artifact to `GitHub Releases`.

#### After Deploy

* Run progressive web application audit on new deployed version.
* Upload the audit report to GitHub Gists.

Audit tool: [Lighthouse](https://developers.google.com/web/tools/lighthouse/)

Last Audit Report: [Lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/?gist=f01219ac55a43bb2d52657f959a98acc)

## Full Workflow Scheme

![workflow](docs/img/workflow.jpg 'CI + CD Workflow')

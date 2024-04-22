# README

- [README](#readme)
  - [Summary](#summary)
    - [Development container](#development-container)
  - [Testing](#testing)
  - [Database seeding](#database-seeding)
  - [Contribution guidelines](#contribution-guidelines)
    - [Writing tests](#writing-tests)
  - [Glossary](#glossary)
    - [Environment variables: `.env`](#environment-variables-env)
    - [Petitions examples on Curl format](#petitions-examples-on-curl-format)

---

## Summary

`Backend Homework` this is a challenge.

---

### Development container

This steps are tailored to work with Visual Studio Code, but you are free to chose a different IDE and make necessary adjustments to the setup.

1. Install Visual Studio Code [here](https://code.visualstudio.com/)
2. Install Docker desktop [here](https://code.visualstudio.com/)
3. Install `ms-vscode-remote.remote-containers` extension. If you don't know how to do that follow this steps: <https://code.visualstudio.com/docs/editor/extension-gallery#_install-an-extension>
4. Open this project's folder in Visual Studio Code. The extension will detect a container configuration and will ask you if you want to reopen the project un the container. Accept. (this build develop container and mongodb container to use it as storage)
5. [run database seeders](#database-seeding)
6. after container build finish, you can execute `npm run watch` in terminal to start the app

---

## Testing

To run `jest` test suite, open a terminal and run `npm run test`

---

## Database seeding

- To run seeders, execute `database/seeders/seed.sh`, if the script show an error about permissions, execute this command `chmod +x database/seeders/seed.sh`.

## Contribution guidelines

### Writing tests

- Unit tests are written using `jest`.
- Unit tests are located at `tests/unit`. Only has the test files.
- They use other files to simulate inputs, known as _mocks_, located `tests/mocks`

## Glossary

### Environment variables: `.env`

The following structure is an example of the contents of the file:

```env
DB_HOST=database
DB_DATABASE=test
DB_USERNAME=root
DB_PASSWORD=example
TOKEN_SECRET=BackendHomeworkTest
TOKEN_EXPIRATION_TIME=1200s
```

### Petitions examples on Curl format

```env
Create User

curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": "",
    "password": ""
}'
```

```env
Login

curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": "",
    "password": ""
}'
```

```env
Create Movie

curl --location 'http://localhost:3000/movies' \
--header 'Authorization: ' \
--header 'Content-Type: application/json' \
--data '{
    "name": "",
    "year": "",
    "director": "",
    "company": "",
    "private": false
}'
```

```env
Read movies

curl --location 'http://localhost:3000/movies' \
--header 'Authorization: '
```

```env
Update movies

curl --location --request PATCH 'http://localhost:3000/movies/id' \
--header 'Authorization: ' \
--header 'Content-Type: application/json' \
--data '{
    "name": "",
    "year": ""
}'
```

```env
Delete movies

curl --location --request DELETE 'http://localhost:3000/movies/id' \
--header 'Authorization: '
```

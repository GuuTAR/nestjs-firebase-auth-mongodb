# nestjs-firebase-auth-mongodb

NestJS Project template for reusable

## Project setup

```bash
$ yarn
```

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `FIREBASE_PROJECT_ID` | yes | Firebase project used to verify ID tokens |
| `FIREBASE_API_KEY` | yes | Web API key, used by `POST /api/v1/auth/signin` |
| `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` | no | Service account; falls back to Application Default Credentials |
| `FIREBASE_AUTH_EMULATOR_HOST` | no | e.g. `localhost:9099` to use the Auth emulator |

## Compile and run the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Run tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

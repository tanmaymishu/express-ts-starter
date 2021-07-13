<p align="center">
  <img src="https://avatars.githubusercontent.com/u/9950313?s=50&v=4">
  <h3 align="center">NodeJS + TypeScript</h3>
  <p align="center">[A Starter Template]</p>
</p>

### 🔑 Key Features:
- Good ol' [Express](https://expressjs.com/).
- Type-safety ([TypeScript](https://www.typescriptlang.org/)).
- ORM with migration, factory, query builder ([Objection](https://vincit.github.io/objection.js/) + [Knex](https://knexjs.org)).
- Authentication ([Passport](http://www.passportjs.org/)).
- Logging ([Winston](https://github.com/winstonjs/winston) + [Morgan](https://github.com/expressjs/morgan)).
- Testing ([Supertest](https://github.com/visionmedia/supertest) + [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/)).
- Mailing ([Nodemailer](https://nodemailer.com/)).
- Request validation ([Express Validator](https://express-validator.github.io/)).
- Background job processing ([Bull](https://docs.bullmq.io/)).
- Queue monitoring dashboard ([Bull Board](https://github.com/felixmosh/bull-board)).

### 🏁 Getting Started:
- [Generate a project](https://github.com/tanmaymishu/nodejs-starter-ts/generate) based on this template.
- Clone the newly created repo and `cd` into the directory.
- Run `cp .env.example .env` to create a .env file based on the example file and provide all the necessary information.
- Run `npm run install` or, `yarn install` if you're using yarn.
- Run `npm run dev` or, `yarn dev`.

### 🤖 Commands:
- `npm run build`: Compile all .ts source files and output the compiled files into /dist directory.
- `npm run dev`: Run the project in development mode. Changes will be picked up and server will be restarted automatically.
- `npm run test`: Run all the unit and integration tests located in /tests directory.
- `npm run start`: Compile the .ts source files and run the project by invoking the compiled source files.
- `npm run fmt`: Format the source code using the rules defined in .prettierrc.
- `npm run migrate:make`: Create a migration file. Ex: `npm run migrate:make create_users_table`. A migration file with current timestamp will be created inside the /src/database/migrations directory.
- `npm run migrate:latest`: Migrate the database schema. This will apply all newly created migrations.
- `npm run migrate:rollback`: Undo the last run migration.
- To run more migration or seed-specific commands, consider installing the knex cli globally. [Learn more](https://knexjs.org/#Migrations-CLI).

### 🐳 Docker:
The project ships with some docker configs and a `cli`. You can interact with the docker containers using this cli. When the `NODE_ENV` variable is set to `production`, the cli will use the `docker-compose.yml` and `docker-compose.prod.yml` file, otherwise it will use the `docker-compose.yml` and `docker-compose.dev.yml` file.
- `./cli start` to launch all the containers in detached mode. `./cli stop` will stop and remove all the containers.
- `./cli yarn` will invoke the `yarn` command from within the `app` container. For example, to compile the source code, you could run `./cli yarn build`.
- When running in production, you might want to use a free SSL from LetsEncrypt. `./cli ssl` will attempt to issue a certificate for the domains you've specified in your `.env` file. The `SSL_STAGING=1` generates a dummy certificate, and `SSL_STAGING=0` generates a real certificate and you will face an ACME challenge. Make sure your DNS record panel is open in another tab before you proceed with this operation. If the ACME challenge fails, try again with `./cli ssl`.
- If the certificate has been generated successfully, you will need to run `./cli post-ssl` to fetch the dhparam key file.
- Adjust the production specific nginx configs in the `nginx.prod.conf` file.

### 💅 Upcoming Features:
- [ ] Template engine and view layer.
- [ ] MongoDB Support and allow swapping between MongoDB and relational DBs.
- [ ] Cookie-based authentication.
- [x] Unified database pagination. [Done]

Do you have a significant feature in mind? [Create an issue](https://github.com/tanmaymishu/nodejs-starter-ts/issues/new) or [send a pull request](https://github.com/tanmaymishu/nodejs-starter-ts/pulls).

### 📝 Notes:
- Although this template comes with many components pre-installed, it does not impose any hard-bound rule on the project structure. Feel free to customize the directory structure and add or remove the components as you see fit for your project. Removing a module will be easier since we're using TypeScript. Any good text editor/IDE will help you track down a non-existing reference in the codebase.
- Kebab-case is used for the file names since it is the most compatible across all operating systems. If you don't like this convention, feel free to change.

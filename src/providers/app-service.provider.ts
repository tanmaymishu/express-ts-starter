import Container from "typedi";
import UserNoSQLRepository from "../repositories/user-nosql-repository";
import UserSQLRepository from "../repositories/user-sql-repository";
import ServiceProvider from "./service-provider";

export default class AppServiceProvider extends ServiceProvider {
    register() {
        Container.set('user.repository', new UserNoSQLRepository());
    }
}

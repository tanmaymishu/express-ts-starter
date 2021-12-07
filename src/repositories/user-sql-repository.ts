import User from "../database/sql/models/user";
import bcrypt from 'bcrypt';
import Repository, { Criteria } from "./repository";

export default class UserSQLRepository implements Repository<User> {
    async save(attrs: any): Promise<User> {
        return await User.query().insert({
            firstName: attrs.firstName,
            lastName: attrs.lastName,
            email: attrs.email,
            password: bcrypt.hashSync(attrs.password, 10)
        });
    }

    async findOne(criteria: Criteria): Promise<User> {
        return await User.query().findOne(criteria) as User;
    }

    async findById(id: number | string): Promise<User> {
        return await User.query().findById(id) as User;
    }
}

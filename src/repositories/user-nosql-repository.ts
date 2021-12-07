import User, { IUser } from "../database/nosql/models/user";
import Repository, { Criteria } from "./repository";

export default class UserNoSQLRepository implements Repository<IUser> {
    async save(body: any): Promise<IUser> {
        return await User.create(body);
    }

    async findOne(criteria: Criteria): Promise<IUser> {
        return await User.findOne(criteria).exec() as IUser;
    }

    async findById(id: string | number): Promise<IUser> {
        return await User.findById(id).exec() as IUser;
    }
}

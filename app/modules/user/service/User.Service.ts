import {UserRepository} from "../repository/User.Repository";
import {Logger} from "../../../../bin/Logger";

export class UserService {
    constructor(
        private readonly logger: Logger,
        private readonly userRepository: UserRepository
    ) {
    }

    async createUser(
        email: string,
        password: string
    ) {
        await this.userRepository.create({
            email,
            password
        })
    }
}
import {UserRepository} from "../repository/User.Repository";
import {Logger} from "../../../../bin/Logger";
import {Cryptography} from "../../../../utils/crypto";
import env from "../../../../start/Env";

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
        const hashedPassword = Cryptography.encrypt(password, env.PEPPER)

        await this.userRepository.create({
            email,
            password: hashedPassword
        })
    }
}
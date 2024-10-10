import {UserRepository} from "../repository/User.Repository";
import {Logger} from "../../../../bin/Logger";
import {Cryptography} from "../../../../utils/crypto";
import env from "../../../../start/Env";
import {ServiceError} from "../../../../lib/core/Errors";


export class UserService {
    constructor(
        private readonly logger: Logger,
        private readonly userRepository: UserRepository
    ) {
    }

    async login(
        email: string,
        password: string
    ) {
        const [user] = await this.userRepository.findByEmail(email)

        if (!user)
            throw new ServiceError(401, 'Invalid email or password')

        const parsedPass = Cryptography.parseEncryptedData(user.password)
        const hashedPassword = Cryptography.encrypt(password, env.PEPPER, parsedPass.iterations, parsedPass.salt)
        const isValid = Cryptography.compareString(hashedPassword, user.password)

        if (!isValid)
            throw new ServiceError(401, 'Invalid email or password')

        return {
            token: '',
            expiresIn: 0,
            expireDate: new Date().toDateString()
        }
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
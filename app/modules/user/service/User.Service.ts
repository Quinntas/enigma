import {UserRepository} from "../repository/User.Repository";
import {Logger} from "../../../../bin/Logger";
import {Cryptography} from "../../../../utils/crypto";
import env from "../../../../start/Env";
import {ServiceError} from "../../../../lib/core/Errors";
import {Cache} from "../../../../lib/core/Cache";
import {JWT} from "../../../../utils/jwt";
import {LOGIN_EXPIRATION} from "./User.Constants";
import {RepositoryErrorData} from "../../../../bin/RepositoryErrorData";


export class UserService {
    constructor(
        private readonly logger: Logger,
        private readonly userRepository: UserRepository,
        private readonly cache: Cache
    ) {
    }

    async login(
        email: string,
        password: string
    ) {
        const user = await this.userRepository.findByEmail(email)

        if (!user)
            throw new ServiceError(401, 'Invalid email or password')

        const parsedPass = Cryptography.parseEncryptedData(user.password)
        const hashedPassword = Cryptography.encrypt(password, env.PEPPER, parsedPass.iterations, parsedPass.salt)
        const isValid = Cryptography.compareString(hashedPassword, user.password)

        if (!isValid)
            throw new ServiceError(401, 'Invalid email or password')

        const expiresIn = LOGIN_EXPIRATION
        const expireDate = new Date(Date.now() + expiresIn * 1000).toISOString()

        const token = JWT.sign({email: user.email}, env.JWT_SECRET, {expiresIn})

        return {
            token,
            expiresIn,
            expireDate
        }
    }

    async createUser(
        email: string,
        password: string
    ) {
        const hashedPassword = Cryptography.encrypt(password, env.PEPPER)

        try {
            await this.userRepository.create({
                email,
                password: hashedPassword
            })
        } catch (e: unknown) {
            if ((e as RepositoryErrorData).code === '23505')
                throw new ServiceError(409, 'Email already exists')
            throw e
        }
    }
}



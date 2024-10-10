import env from "../start/Env";
import {Enigma} from "../lib/core/Server";

export const enigma = new Enigma({
    port: env.PORT,
    development: true,
})


import {Env} from "../lib/core/Env";

export default Env.create('./', {
    PORT: Env.schema.number(),
    POSTGRES_URL: Env.schema.string(),
})
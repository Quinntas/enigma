import {cache} from "./Cache";

export async function loaders() {
    await cache.connect()
}
import {enigma} from "../config/App";
import {router} from "./Routes";
import {Server} from "bun";
import {loaders} from "./Loaders";

enigma.use('/api', router);

enigma.listen(async (server: Server) => {
    await loaders();
    
    console.log(`Server is running on ${server.hostname}:${server.port}`);

    server.development && console.log('Development mode is enabled');
})
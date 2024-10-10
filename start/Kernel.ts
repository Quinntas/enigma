import {enigma} from "../config/App";
import {router} from "./Routes";
import {Server} from "bun";

enigma.use('/api', router);

enigma.listen((server: Server) => {
    console.log(`Server is running on http://${server.hostname}:${server.port}`);
    server.development && console.log('Development mode is enabled');
})
import * as fs from "node:fs";
import {openAPI} from "../config/OpenAPI";

fs.createWriteStream('openapi.json').write(JSON.stringify(openAPI, null, 2));
import {Enigma, jsonResponse, Router} from "../src";

const app = new Enigma({
    serverName: 'Enigma',
})

const router = new Router();

router.post('/test', (req, res) => {
    console.log(req)
    return jsonResponse(res, 200, {message: 'Hello, World!'})
})

app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
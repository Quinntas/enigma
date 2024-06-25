import {Enigma, Request, Router} from "../src";

const app = new Enigma({
    development: true,
    port: 3000,
    startup: () => {
        console.log('Server started on port 3000')
    }
})

const router = new Router();

router.post('/test', async (_req: Request, _server) => {
    return new Response(JSON.stringify({
        message: 'Hello World'
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}, [])

app.use('/', router);

app.listen()
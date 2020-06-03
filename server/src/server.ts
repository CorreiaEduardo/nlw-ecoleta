import express from 'express'

const app = express();

app.get("/hello", (_, res) => {
    res.json({message: 'Hello World!'});
});

const port = 3333;

app.listen(port, () => {
    console.log(`Starting nlw-ecoleta-server on port ${port}`)
})
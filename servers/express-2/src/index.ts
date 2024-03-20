import express from 'express';
import watchmap from '@cyboholics/watchmap-js-sdk';
import axios from 'axios';

const app = express();

const setup = async ()=>
{
    app.use(await watchmap())

    app.get('/express2-test1', (req, res) => {
        console.log("express2-test1 called")
        res.send('Hello World From Test1!');
    })

    app.get('/express2-test2', async (req, res) => {
        console.log("express2-test2 called")
        await axios.get('http://express-1:3001/express1-test3')
        res.send('Hello World From Test2!');
    });

    app.get('/express2-test3', async (req, res) => {
        console.log("express2-test3 called")
        await axios.get('http://django-1:8000/django1-test2')
        res.send('Hello World From Test3!');
    });

    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`);
    })
}

setup()
import axios from 'axios'
const BASE_URL = 'http://localhost:3001/quiz'

const resolveData = res => res.data


export const utils = {
   makeId
}

function makeId(length=5)
{
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
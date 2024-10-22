import { Brisk } from '@brisk/Brisk'; 
import { Router } from '@brisk/Brisk/libs/Router/Router'; 
import {
    getAllUser, 
    getUserById, 
    addUser, 
    editUser, 
    removeUser
} from "@controller/User.controller";

const brisk = new Brisk();

const userRoutes = new Router();

brisk.get('/', getAllUser );
brisk.get('/users/:id', getUserById);
brisk.post('/users', addUser);
brisk.delete('/users/:id', editUser);
brisk.put('/users/:id', removeUser);

export default userRoutes;
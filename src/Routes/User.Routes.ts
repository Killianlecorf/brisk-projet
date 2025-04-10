import { Brisk, Router } from 'brisk'; 
import {
    getAllUser, 
    getUserById, 
    addUser, 
    editUser, 
    removeUser
} from "@/controllers/User.controller";

const brisk = new Brisk();

const userRoutes = new Router();

brisk.get('/users', getAllUser );
brisk.get('/:id', getUserById);
brisk.post('/', addUser);
brisk.delete('/:id', removeUser);
brisk.put('/:id', editUser);

export default userRoutes;
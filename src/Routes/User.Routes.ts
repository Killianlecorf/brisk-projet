import { Router } from 'brisk'; 
import {
    getAllUser, 
    getUserById, 
    addUser, 
    editUser, 
    removeUser
} from "@/controllers/User.controller";

const userRoutes = new Router();

userRoutes.get('/', getAllUser );
userRoutes.get('/:id', getUserById);
userRoutes.post('/', addUser);
userRoutes.delete('/:id', removeUser);
userRoutes.put('/:id', editUser);

export default userRoutes;
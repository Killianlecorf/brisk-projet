import { Brisk} from '../../libs/Brisk';
import { jsonParserMiddleware } from "../../libs/middleware/JsonParser";
import { CustomRequest } from "../../libs/Request";
import { CustomResponse } from "../../libs/Response";
import { connectToDatabase } from "../src/database/db";
import { User } from "./models/user.model";
import cors from 'cors';

const brisk = new Brisk();

brisk.use(jsonParserMiddleware);

brisk.get('/users', async (req: CustomRequest, res: CustomResponse) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching users' });
    }
  });


  brisk.post('/users', async (req: CustomRequest, res: CustomResponse) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = new User({
        username: name,
        email: email,
    });

    try {
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Error creating user' });
    }
});
  
  brisk.delete('/delete/:id', async (req: CustomRequest, res: CustomResponse) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(204).send({});
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting user' });
    }
  });
  
  brisk.put('/users/:id', async (req: CustomRequest, res: CustomResponse) => {
    const userId = req.params.id;
    const { name, email } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user' });
    }
  });



connectToDatabase().then(() => {
    const PORT = 5252;
    brisk.start(PORT, 'Server is running on port ');
  });
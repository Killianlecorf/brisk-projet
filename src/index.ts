import { Brisk, bodyParser, cors} from 'brisk'; 
import { connectToDatabase } from "@/database/db";
import userRoutes from "@/Routes/User.Routes";
import "./configs/aliases";

const brisk = new Brisk();

brisk.use(bodyParser);
brisk.use(cors);

brisk.registerRouter('/users', userRoutes)

connectToDatabase().then(() => {
    const PORT = 5252;
    brisk.start(PORT, 'Server is running on port ');
  });
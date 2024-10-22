import { Brisk, bodyParser, cors} from '@brisk/Brisk'; 
import { connectToDatabase } from "@db/db";
import userRoutes from "@route/User.Routes";

const brisk = new Brisk();

brisk.use(bodyParser);
brisk.use(cors);

brisk.registerRouter('/users', userRoutes)

connectToDatabase().then(() => {
    const PORT = 5252;
    brisk.start(PORT, 'Server is running on port ');
  });
import { Brisk, bodyParser, cors} from 'brisk'; 
import { connectToDatabase } from "@/database/db";
import userRoutes from "@/Routes/User.Routes";
import "./configs/aliases";

const brisk = new Brisk();

brisk.use(bodyParser);

brisk.registerRouter('/users', userRoutes) 

// optionnal CORS configuration 
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

brisk.use(cors(corsOptions));

connectToDatabase().then(() => {
    const PORT = 5253;
    brisk.start(PORT, 'Server is running on port ');
  });
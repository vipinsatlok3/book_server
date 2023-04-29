import { config } from "dotenv"
config()

import app from "./app";
import { PORT } from "./envVariables";

const port = PORT || 3001

app.listen(port, () => console.log(`Server listening on port ${port}`))
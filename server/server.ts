import { envConfig } from "./src/config/config";
import app from "./src/app";
import "./src/model/connection";

const startServer = () => {
    const port = envConfig.portNumber;
    app.listen(port, function () {
        console.log(`Server has started at port ${port}`);
    });
};

startServer();

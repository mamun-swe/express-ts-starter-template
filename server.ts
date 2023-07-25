import { cpus } from "os";
import process from "process";
import cluster from "cluster";
import { app } from "./src/app";
import { dbConnection } from "./src/config/dbconnection.config";

const numCPUs = cpus().length;
const port: any = process.env.PORT || 5000;

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  /* Fork workers. */
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  /* Start app to specific PORT & establish database connection */
  app.listen(port, () => {
    dbConnection();
    console.log(`🚀 [server]: Server is running at http://localhost:${port}`);
  });
}

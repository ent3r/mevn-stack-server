import convict = require("convict");
import { ipaddress } from "convict-format-with-validator";
import { resolve } from "path";

convict.addFormat(ipaddress);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "HOST",
    arg: "host",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Database host name/IP and port",
      format: "*",
      default: "mongodb://localhost:27017",
      env: "MONGO_URI",
    },
    db: {
      doc: "Database name",
      format: String,
      default: "mevn-stack",
      env: "MONGO_DB_NAME",
    },
  },
  logging: {
    level: {
      doc: "How detailed the logging should be",
      format: String,
      default: "warn",
      env: "LOGGING_LEVEL",
    },
  },
});

config.loadFile(resolve(__dirname, `.env.${config.get("env")}.json`));

config.validate({ allowed: "strict" });

export default config;

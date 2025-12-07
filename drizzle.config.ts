import { defineConfig } from "drizzle-kit";
import {readConfigFile} from "./src/config";

export default defineConfig({
  schema: "src/lib/db/schema.ts",
  out: "src/lib/db",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfigFile().dbUrl,
  },
});
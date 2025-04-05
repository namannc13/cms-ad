import app from "./src/app";
import { connectToDB } from "./src/config/db";

const PORT = process.env.PORT || 4000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
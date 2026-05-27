import app from "./src/App";
import connectDB from "./src/Config/Database";

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Trigger restart

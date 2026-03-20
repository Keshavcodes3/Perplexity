import dotenv from './src/Config/dotenv'
dotenv
import app from './src/App'
import Database from './src/Config/Database'

Database()

app.listen(3000,()=>{
    console.log("Server is running at port 3000.....")
})
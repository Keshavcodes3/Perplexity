import 'dotenv/config'
import App from './src/App.js'
import connection from './src/Config/Database.js'

connection();

App.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
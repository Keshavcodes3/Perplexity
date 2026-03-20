import mongoose from 'mongoose';

async function connection() {
   await mongoose.connect(process.env.MONGO_URI)
   console.log('Connected to Database')
}

export default connection
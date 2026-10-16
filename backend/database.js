import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectToDB = async () => {
    const DBURL = process.env.DB_URLS
    try {
        await mongoose.connect(DBURL)
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);

    }
}
export default connectToDB;
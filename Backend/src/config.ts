import dotenv from 'dotenv';
dotenv.config();
const JWT_Secret=process.env.JWT_Secret as string;
const mongodbUrl=process.env.mongodbUrl as string;
export {JWT_Secret,mongodbUrl};
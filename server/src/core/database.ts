import mongoose from 'mongoose';

const URI = process.env.MONGODB_URL;

mongoose.connect(
  `${URI}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (error: any) => {
    if (error) throw Error(error);
    console.log(`Database succesfully connected to: ${URI}`);
  }
);

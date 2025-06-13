import axios from 'axios';
import User from '../models/User';

export async function saveToDB(data: any) {
  let result = await User.findOneAndUpdate(
  { authId: data.authId },
  data,
  { upsert: true, new: true }
);
return result;
}

// export async function saveToCrudCrud(data: any) {
//   const api = process.env.CRUD_CRUD_API!;
//   await axios.post(`${api}/profile`, data);
// }

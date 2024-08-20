import { v4 as uuidv4 } from "uuid";

export default function generateID(type?: string) {
  return type ? `${type}_${uuidv4()}` : uuidv4();
}

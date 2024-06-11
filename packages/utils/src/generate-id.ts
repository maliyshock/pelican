import getRandom from "~/get-random";

export default function generateID() {
  return getRandom(Date.now()).toString();
}

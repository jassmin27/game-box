import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    key: "622efa9eb209447d841785bc25446477",
  },
});

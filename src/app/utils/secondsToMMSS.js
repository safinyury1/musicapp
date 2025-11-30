import moment from "moment";

export default (seconds) => {
  if (isNaN(seconds) || seconds === 0) return "0:00";
  return moment.utc(seconds * 1000).format("mm:ss");
};
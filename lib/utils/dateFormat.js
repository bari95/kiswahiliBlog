import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    // Handle the case where date is not a valid Date object
    console.log(date,"invalid")
    return 'Invalid Date';
  }

  return formatInTimeZone(date, "Africa/Dar_es_Salaam", "dd MMM yyyy");
};

export default dateFormat;


import { repeatCoefficient } from "../globalVariables";

export function SetDateToRepeat(wordsDefs) {
  wordsDefs.forEach((item) => {
    let calcDate = item.repeat_counter * repeatCoefficient;
    let dateParsed = new Date();

    item.time_before_repeat = `${dateParsed.getFullYear()}-${
      dateParsed.getMonth() + 1
    }-${dateParsed.getDate() + calcDate}`;
  });

  return wordsDefs;
}

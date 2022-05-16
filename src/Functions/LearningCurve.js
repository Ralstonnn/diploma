export function SetDateToRepeat(wordsDefs) {
  wordsDefs.forEach((item) => {
    let calcDate = item.repeat_counter * 1.5;
    let dateParsed = new Date(item.time_before_repeat.split("T")[0]);

    dateParsed.setDate(dateParsed.getDate() + calcDate);
    item.time_before_repeat = `${dateParsed.getFullYear()}-${
      dateParsed.getMonth() + 1
    }-${dateParsed.getDate()}`;

    item.repeat_counter += 1;
  });

  return wordsDefs;
}

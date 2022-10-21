function phoneFormat(input) {
  //returns (###) ###-####
  input = input.replace(/\D/g, "");
  var size = input.length;
  if (size > 0) {
    input = "(" + input;
  }
  if (size > 3) {
    input = input.slice(0, 4) + ") " + input.slice(4, 11);
  }
  if (size > 6) {
    input = input.slice(0, 9) + "-" + input.slice(9);
  }
  return input;
}

function formatDate(date) {
  let d = new Date(date);
  let month = "" + d.toLocaleString("en-US", { month: "2-digit" });
  let day = "" + d.toLocaleString("en-US", { day: "2-digit" });
  let year = d.getFullYear();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = "";
  if (hour > 12) {
    hour -= 12;
    time = `${hour}:${minutes}pm`;
  } else {
    hour -= 12;
    time = `${hour}:${minutes}am`;
  }

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/") + " " + time;
}

export { phoneFormat, formatDate };

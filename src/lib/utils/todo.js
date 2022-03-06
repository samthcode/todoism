const getParts = (t) => {
  let matches = String(t).match(/(\**)\s?(.*)/);

  let title = matches[2];

  let maybe = false;
  title = title.replace(/\s?\(maybe\)/, () => {
    maybe = true;
    return "";
  });

  let tags = [];
  title = title.replace(
    /\s?\[\[(.{0,35}?)(?:\:([a-zA-Z]+))?\]\]/g,
    (_, name, colour) => {
      if (name !== "") {
        tags.push({ name, colour });
      }
      return "";
    }
  );

  return {
    priority: matches[1].length,
    maybe,
    title,
    tags,
  };
};

export const hasMaybe = (title) => {
  return getParts(title).maybe;
};

export const getPriority = (title) => {
  return getParts(title).priority;
};

export const getTitle = (title) => {
  return getParts(title).title;
};

export const getTags = (title) => {
  return getParts(title).tags;
};

export const colourToTagCss = (colour) => {
  switch (colour) {
    case "red":
      return "background-color: rgba(204, 50, 50, 0.5);border: 1px solid rgb(204, 50, 50)";
    case "blue":
      return "background-color: rgba(102, 252, 241, 0.5);border: 1px solid rgb(102, 252, 241)";
    default:
      return "background-color: rgba(211, 211, 211, 0.5);border: 1px solid rgb(211, 211, 211)";
  }
};

export const priorityToString = (priority) => {
  let str;
  switch (priority) {
    case 0:
      str = "No";
      break;
    case 1:
      str = "Low";
      break;
    case 2:
      str = "Medium";
      break;
    case 3:
      str = "High";
      break;
    default:
      str = "Very ".repeat(Math.min(priority - 3, 3)) + "High";
  }
  return str + " Priority";
};

export const priorityToCss = (priority) => {
  switch (priority) {
    case 0:
      return "background-color: rgba(211, 211, 211, 0.5);border: 1px solid rgb(211, 211, 211)";
    case 1:
      return "background-color: rgba(45, 201, 55, 0.5);border: 1px solid rgb(45, 201, 55)";
    case 2:
      return "background-color: rgba(231, 180, 22, 0.5);border: 1px solid rgb(231, 180, 22)";
    default:
      return "background-color: rgba(204, 50, 50, 0.5);border: 1px solid rgb(204, 50, 50)";
  }
};

const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

export const sanitiseInput = (input) => {
  return input.replace(/[&<>"']/g, (m) => {
    return entityMap[m];
  });
};

const urlRegex =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

export const renderSimpleMarkdown = (text) => {
  return sanitiseInput(text)
    .replace(urlRegex, '<a target="_blank" href="$&">$&</a>')
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/(?:-[ \t].*\r?\n)*-[ \t].*/gm, (wholeList) => {
      let list = "<ul>";
      for (let li of wholeList.split(/\r?\n/)) {
        list += li.replace(/^-[ \t](.*)$/g, "<li>$1</li>");
      }
      return list + "</ul>";
    });
};

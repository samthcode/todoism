const getParts = (title) => {
  let matches = String(title).match(/(\**)\s?(\(maybe\))?\s?(.*)/);

  return {
    priority: matches[1].length,
    maybe: matches[2] !== undefined,
    title: matches[3],
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
      str = "Very ".repeat(priority - 3) + "High";
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

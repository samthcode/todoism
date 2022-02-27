export const getPriorityAndTitleOfTodo = (title) => {
  let matches = title.match(/(\**) ?(.*)/);
  let priority;
  switch (matches[1].length) {
    case 0:
      priority = "No";
      break;
    case 1:
      priority = "Low";
      break;
    case 2:
      priority = "Medium";
      break;
    case 3:
      priority = "High";
      break;
    default:
      let numberOfVerys = matches[1].length - 3;
      priority = "Very ".repeat(numberOfVerys) + "High";
  }
  priority += " Priority";
  return {
    priority,
    title: matches[2],
  };
};

export const getPriorityOf = (title) => {
  return title.match(/(\**) ?(.*)/)[1].length;
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

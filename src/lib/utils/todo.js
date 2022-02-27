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

/**category drop down list */
const createCtegorylist = (categories, options = []) => {
  for (let category of categories) {
    options.push({
      //  value: category._id,
      _id: category._id,
      name: category.name,
      parentId: category.parentId,
      type: category.type,
    });
    if (category.children.length > 0) {
      createCtegorylist(category.children, options);
    }
  }
  return options;
};
/**category drop down list END */

export default createCtegorylist;

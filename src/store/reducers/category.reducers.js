import { categoryConstant } from "../actions/constaints";
const initState = { categories: [], loading: false };

const buildNewCategory = (parentId, categories, category) => {
  //check if caegory is parent itself. where parentId is udefined
  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        isfeatured: category.isfeatured,
        children: [],
      },
    ];
  }

  let myCategories = [];
  for (let cat of categories) {
    //compare parent id with parent category.
    if (cat._id == parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        isfeatured: category.isfeatured,
        children: [],
      };

      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategory(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCategories; //treversig list.
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
      state = { ...state, categories: action.payload.categories };

      break;
    case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;

    case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
      const catrgory = action.payload.category;
      //we are sending parent id --> current category List and newly added category.
      const updatedCategories = buildNewCategory(
        catrgory.parentId,
        state.categories,
        catrgory
      );
      state = {
        ...state,
        categories: updatedCategories,

        
        loading: false,
      };
      break;

    case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    //UPDATE CASES
    case categoryConstant.UPDATE_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;

    case categoryConstant.UPDATE_CATEGORY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case categoryConstant.UPDATE_CATEGORY_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    //DELETE CASES
    case categoryConstant.DELETE_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;

    case categoryConstant.DELETE_CATEGORY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case categoryConstant.DELETE_CATEGORY_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
  }
  return state;
};

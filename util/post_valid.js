module.exports.validatePostInput = (title, description, price) => {
  const errors = {};
  if (title.trim() === "") {
    errors.title = "Title must not be empty";
  }
  if (description.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (price === "") {
    errors.price = "Price must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

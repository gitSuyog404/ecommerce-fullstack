const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next); // err => next(err)
};

export default asyncHandler;

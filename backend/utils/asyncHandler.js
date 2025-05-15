function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch(async (err) => {
      next(err);
    });
  };
}
export default asyncHandler;

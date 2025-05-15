function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch(async (err) => {
        console.log(err)
      next(err);
    });
  };
}
export default asyncHandler;

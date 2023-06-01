module.exports = {
  isLoggedIn(req, res, next) {
    console.log('INSIDE MIDDLEWARE ISLOGGED IN');
    if (!req.isAuthenticated()) {
      console.log('INSIDE MIDDLEWARE ISLOGGED IN BUT NOT AUTHENTICATED');
      return next({ code: 401, error: { message: 'UNAUTHORIZED' } });
    }
    return next();
  },
};

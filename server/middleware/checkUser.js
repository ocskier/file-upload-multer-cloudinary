const checkUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    console.log('User not logged in redirecting to login!');
    return res.redirect('/login');
  }
};

export default checkUser;

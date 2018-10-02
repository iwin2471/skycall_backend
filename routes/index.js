const index = router => {
  router
    .get("/", (req, res, next) => {
      if (!req.isAuthenticated()) return res.render("M_FirstandLogin");
      else res.redirect("/discuss");
      next();
    })
  return router;
};

export default index;
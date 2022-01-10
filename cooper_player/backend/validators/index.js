exports.createUserValidator = (req, res, next) => {
  req.check("name", "write a name").notEmpty();
  req.check("name", "name must be between 4  to 10").isLength({
    min: 4,
    max: 10,
  });

  req.check("email", "write a email").notEmpty();
  req
    .check("email", "email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });

  req.check("password", "write a password").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("password must contain at 6 character")
    .matches(/\d/)
    .withMessage("must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.songValidation = (req, res, next) => {
  console.log(req.body);
  req.check("songTitle", "write a title").notEmpty()
  req.check("songTitle", "name must be between 4  to 30").isLength({
    min: 4,
    max: 30,
  });
  // req.check("songUrl", "write a song url").notEmpty();
  
  
  req.check("status", "must be boolean").isBoolean()
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}

exports.playlistValidation = (req, res, next) => {
  req.check("playlistName", "write a playlistName").notEmpty()
  req.check("playlistName", "name must be between 4  to 30").isLength({
    min: 4,
    max: 30,
  });
  
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}

exports.queriesValidation = (req, res, next) => {
  req.check("content", "write a content").notEmpty()
  req.check("content", "content must be between 30  to 60").isLength({
    min: 30,
    max: 150,
  });
  
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}

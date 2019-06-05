module.exports = app => {
  const commentController = require("../controllers/comment.controller");

  app.get("/comment", commentController.read);
  app.post("/comment", commentController.create);
};

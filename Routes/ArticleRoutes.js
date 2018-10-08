
const articleController = require("../Controllers/ArticleController");

module.exports = (app) => {
    app.get("/api/fetchAllArticles", articleController.fetchAllArticle)

    app.post("/api/saveArticle", articleController.saveArticle)
}
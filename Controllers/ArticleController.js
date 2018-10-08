const { getDatabaseClient } = require("../Utils/dbConnection");
const { handleError } = require("../Utils/utilMethods");
const { validateString } = require("../Utils/validations");
const constants = require("../Config/constants");


exports.fetchAllArticle = async (req, res) => {
    let client = getDatabaseClient();
    try {
        let result = await client.query("select * from article");
        res.send(result.rows);
    } catch (err) {
        handleError(res, err.toString());
    } finally {
        client.end();
    }
}


exports.saveArticle = async (req, res) => {
    if (validateString(req.body.title)) {
        handleError(res, constants.invalid_title)
        return;
    }
    let client = getDatabaseClient();
    try {
        let body = req.body;
        let query = "insert into article(title,manufacturer,url,image,thumbnail_image) values($1,$2,$3,$4,$5)";
        let queryParams = [body.title, body.manufacturer, body.url, body.image, body.thumbnail_image];
        await client.query(query, queryParams);
        res.end();
    } catch (err) {
        handleError(res, err.toString());
    } finally {
        client.end();
    }
}
const { getDatabaseClient } = require("../Utils/dbConnection");
const { handleError } = require("../Utils/utilMethods");
const { validateString, validateNumber } = require("../Utils/validations");
const constants = require("../Config/constants");


exports.fetchAllArticle = async (req, res) => {
    let client = getDatabaseClient();
    try {
        if (validateNumber(Number(req.params.page_number))) {
            handleError(res, constants.invalid_page_number);
            return;
        }
        let number = (Number(req.params.page_number) - 1) * 5;
        let result = await client.query(`select * from article order by article_id offset ${number} rows fetch first 5 rows only`);
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

exports.fetchArticle = async (req, res) => {
    let articleID = req.params.articleID;
    let client = getDatabaseClient();
    try {
        let result = await client.query(`select * from article where article_id=$1`, [articleID]);
        res.send(result.rows);
    } catch (err) {
        console.log("fetchArticle error");
        handleError(res, err.toString());
    } finally {
        client.end();
    }
}

exports.deleteArticle = async (req, res) => {
    let articleID = req.params.articleID;
    let client = getDatabaseClient();
    try {
        await client.query(`delete from article where  article_id=$1`, [articleID]);
        res.end();
    } catch (err) {
        console.log("deleteArticle error");
        handleError(res, err.toString());
    } finally {
        client.end();
    }
}
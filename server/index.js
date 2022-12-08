const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mysql = require("mysql"),
  DB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_images",
  });

const multer = require("multer"),
      path = require("path"),
      fs = require("fs");

const handleError = (error, response) => {
  response
    .status(500)
    .contentType("text/plain")
    .end("Something went wrong!");
};

const upload = multer({
  dest: "/path/to/temporary/directory/to/store/uploaded/files"
});

app.post(
  "/api/store/image",
  upload.single("image"),
  (request, response) => {
    const tempPath = request.file.path;
    const targetPath = path.join(__dirname, `./gallery/${request.file.originalname}`);

    fs.rename(tempPath, targetPath, error => {
      if (error) return handleError(error, response);
      response
        .status(200)
        .contentType("text/plain")
        .end("File uploaded!");
    });
  }
);


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.post("/api/store/image", (request, response) => {
  const image = request.body.image,
    sql = `Insert Into TImages(path) values('${image}')`;
  console.log(image)

  // DB.query(sql, (error, result) => {
  //   console.log(result);
  // });
});
*/
app.get("/api/get/images", (request, response) => {
  const sql = `SELECT ID, image FROM TImages`;
  DB.query(sql, (error, result) => {
    response.send(result);
  });
});



app.listen(3001, () => console.warn("running on port 3001 ..."));
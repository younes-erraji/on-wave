const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  path = require("path"),
  fs = require("fs"),
  router = express.Router();

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
    const targetPath = path.join(__dirname, `./client/gallery/${request.file.originalname}`);

    fs.rename(tempPath, targetPath, error => {
      if (error) return handleError(error, response);
      response.redirect('/');
    });
  }
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request,response) => {  
  response.sendFile(`${__dirname}/client/click fit.html`);
});

router.get('/api/get/images"', function (request, response) {
  const filePath = path.join(path.resolve(__dirname), '/client/gallery/');

  try {
    const directoryContent = fs.readdirSync(filePath);
    response.send(directoryContent);
  } catch(e) {
    next(e);
  }
});

app.listen(3001, () => console.warn("running on port 3001 ..."));

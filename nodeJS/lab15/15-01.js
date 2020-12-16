const http = require("http");
const url = require("url");
const MongoDB = require("./mongoDB");
const db = new MongoDB();

const ERROR_PAGE_NOT_FOUND = "Page is not found!";

let httpHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      GetMethodHandler(req, res);
      break;
    case "POST":
      PostMethodHandler(req, res);
      break;
    case "PUT":
      PutMethodHandler(req, res);
      break;
    case "DELETE":
      DeleteMethodHandler(req, res);
      break;
    default:
      Error(res, `${req.method} method is not supported!`);
      break;
  }
};

let Error = (res, message) => {
  res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ Code: 400, Message: message }));
};

let Ok = (res, message) => {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ Code: 200, Message: message }));
};

let GetMethodHandler = async (req, res) => {
  var reqURL = url.parse(req.url).pathname;

  switch (reqURL) {
    case "/api/faculties":
      db.GetRecordsByTableName("FACYLTY")
        .then((records) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
           console.log(records);
          res.end(JSON.stringify(records));
        })
        .catch((error) => Error(res, error));
      break;
    case "/api/pulpits":
      db.GetRecordsByTableName("PULPIT")
        .then((records) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(records));
        })
        .catch((error) => Error(res, error));
      break;
    default:
      Error(res, ERROR_PAGE_NOT_FOUND);
      break;
  }
};

let PostMethodHandler = (req, res) => {
  var reqURL = url.parse(req.url).pathname;
  var data_json = "";
  switch (reqURL) {
    case "/api/faculties":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        db.InsertRecords("FACYLTY", data_json)
          .then((records) => 
          res.end(JSON.stringify(records)))
          .catch((error) => {
            Error(res, error);
          });
      });
      break;
    case "/api/pulpits":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        db.InsertRecords("PULPIT", data_json)
          .then((records) => res.end(JSON.stringify(records)))
          .catch((error) => {
            Error(res, error);
          });
      });
      break;
    default:
      Error(res, ERROR_PAGE_NOT_FOUND);
      break;
  }
};

let PutMethodHandler = (req, res) => {
  var reqURL = url.parse(req.url).pathname;
  var data_json = "";
  switch (reqURL) {
    case "/api/faculties":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        db.UpdateRecords("FACYLTY", data_json._id, data_json)
          .then((records) => res.end(JSON.stringify(records)))
          .catch((error) => {
            Error(res, error);
          });
      });
      break;
    case "/api/pulpits":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        db.UpdateRecords("PULPIT", data_json._id, data_json)
          .then((records) => res.end(JSON.stringify(records)))
          .catch((error) => {
            Error(res, error);
          });
      });
      break;
    default:
      Error(res, ERROR_PAGE_NOT_FOUND);
      break;
  }
};

let DeleteMethodHandler = (req, res) => {
  var reqUrlArray = url.parse(req.url).pathname.split("/");

  // Type of Request URL: /api/auditoriums/12
  if (reqUrlArray[1] == "api" && reqUrlArray[3] != undefined) {
    var id = reqUrlArray[3];
    switch (reqUrlArray[2]) {
      case "faculties":
        res.writeHead(200, { "Content-Type": "application/json" });
        db.DeleteField("FACYLTY", id)
          .then((records) => {
            res.end(JSON.stringify(records));
          })
          .catch((error) => {
            Error(res, error);
          });
        break;
      case "pulpits":
        res.writeHead(200, { "Content-Type": "application/json" });
        db.DeleteField("PULPIT", id)
          .then((records) => {
            res.end(JSON.stringify(records));
          })
          .catch((error) => {
            Error(res, error);
          });
        break;
      default:
        Error(res, ERROR_PAGE_NOT_FOUND);
        break;
    }
  } else {
    Error(res, ERROR_PAGE_NOT_FOUND);
  }
};

let server = http.createServer();
server
  .listen(3000, () => {
    console.log("Server is starting...");
  })
  .on("request", httpHandler);


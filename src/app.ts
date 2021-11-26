import express, { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "@tsoa/runtime";
import { XeptagonError } from "./api/REST/interfaces/errors/xeptagon.error";

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if(err instanceof XeptagonError){
    return res.status(err.statusCode).json({
      message: err.message
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
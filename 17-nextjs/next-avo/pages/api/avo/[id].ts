import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../database/db";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

const getById = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { id },
  } = request;
  const db = new Database();
  const entry = await db.getById(id as string);

  await cors(request, response);

  response.status(200).json(entry);
};

export default getById;

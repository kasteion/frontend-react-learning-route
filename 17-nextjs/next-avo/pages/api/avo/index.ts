import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../database/db";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

const allAvos = async (request: NextApiRequest, response: NextApiResponse) => {
  const db = new Database();
  const allEntries = await db.getAll();
  const length = allEntries.length;

  await cors(request, response);

  response.status(200).json({ data: allEntries, length });
};

export default allAvos;

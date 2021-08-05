import { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../database/db";

const getById = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { id },
  } = request;
  const db = new Database();
  const entry = await db.getById(id as string);

  response.status(200).json(entry);
};

export default getById;

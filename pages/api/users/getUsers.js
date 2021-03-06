// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import data from "../../../db";

export default (req, res) => {
  res.status(200).json({
    data,
  });
};

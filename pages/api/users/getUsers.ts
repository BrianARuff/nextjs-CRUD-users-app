import data from "../../../db";

export default (req, res) => {
  res.status(200).json({
    data,
  });
};

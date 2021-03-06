import data from "../../../db";

export default (req, res) => {
  const { name, age } = req.body;
  const user = { name, age };
  data.push(user);
  res.status(200).json(data);
};

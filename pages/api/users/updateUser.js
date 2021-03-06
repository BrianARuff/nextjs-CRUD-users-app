import data from "../../../db";

export default (req, res) => {
  const { name, age, newName, newAge } = req.body;
  const userIndex = data.findIndex((node) => node.name === name && age === age);
  data[userIndex] = { name: newName, age: newAge };
  res.status(200).json({ message: "User updated" });
};

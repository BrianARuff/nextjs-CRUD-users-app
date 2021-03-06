import data from "../../../db";

export default (req, res) => {
  const { name, age } = req.body;
  const userIndex = data.findIndex(
    (user) => user.name === name && user.age === age
  );
  console.log(data, userIndex, name, age);
  if (name && age) {
    data.splice(userIndex, 1);
    res.status(200).json({ message: "User removed" });
  }
};

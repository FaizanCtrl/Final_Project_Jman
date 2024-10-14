const userService = require('../services/userService');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUser = async(req, res) => {
  try {
    const users = await userService.getAllUser();
    if(!users){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
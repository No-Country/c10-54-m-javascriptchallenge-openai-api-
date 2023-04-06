const UserServices = require('../services/user.services');

/* exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAll();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.error(error);
  }
}; */

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserServices.getUser(userId);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

/* exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    //FIX extract only fields that can be updated from req.body
    const updatedUser = await UserServices.updateOne(id, req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error(error);
  }
}; */

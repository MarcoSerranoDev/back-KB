const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) return res.status(401).json({ message: "No user founded" });

    const matchPwd = await bcrypt.compare(password, foundUser.password);

    if (matchPwd) {
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
          username: foundUser.username,
          roles: foundUser.roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );

      const refreshToken = jwt.sign(
        {
          email: foundUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      foundUser.refreshToken = refreshToken;

      await foundUser.save();

      res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);

  try {
    const refreshToken = cookies.token;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email)
          return res.sendStatus(403);

        const accessToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
            roles: foundUser.roles,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204); //No content
  const refreshToken = cookies.token;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    await foundUser.save();

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};

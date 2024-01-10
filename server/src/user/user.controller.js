const { UserModel } = require("../user/user.model");
const bcrypt = require("bcrypt");

//AUTHORIZATION
async function authorize(req, res) {
  if (!req.session.id) {
    return res.status(401).json("You are not logged in");
  }

  return req.session, res.status(200).json(req.session);
}

//Register new user
async function register(req, res) {
  // Check if the user exists
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json("Email already registred");
  }

  //Hash password
  const user = new UserModel(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const jsonUser = user.toJSON();
  jsonUser._id = user._id;
  delete jsonUser.password;

  res.status(201).send(jsonUser);
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    usersArray = JSON.parse(fileData);
    const user = usersArray.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json("Wrong username or password");
    }
    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    delete user.password;
    req.session = user;
    res.status(200).json({
      Message: "Successfully logged in",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    // Check if username and password are correct
    const existingUser = await UserModel.findOne({
      email: email,
    }).select("+password");

    if (
      !existingUser ||
      !(await bcrypt.compare(req.body.password, existingUser.password))
    ) {
      return res.status(401).json("Wrong password or username");
    }

    const user = existingUser.toJSON();
    user._id = existingUser._id;
    delete user.password;

    //Check if user is already logged in
    if (req.session && req.session._id) {
      return res.status(200).json({ message: "Already logged in" });
    }

    //Save info about the user to the session (an encrypted cookie stored on the client)
    req.session._id = user._id;
    console.log("req.session.id", req.session._id);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Logout the user and remove the cookie and session
async function logout(req, res) {
  if (!req.session || !req.session._id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  req.session = null;
  res.status(204).json(null);
}

module.exports = { register, login, logout, authorize };

const xss = require("xss");
const bcrypt = require("bcryptjs");

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  getAllUsers(db) {
    return db
      .from("tw_users AS usr")
      .select(
        "usr.id",
        "usr.user_name",
        "usr.full_name",
        "usr.email",
        "usr.date_created",
        "usr.date_modified"
      );
  },
  hasUserWithUserName(db, user_name) {
    return db("tw_users")
      .where({ user_name })
      .first()
      .then(user => !!user);
  },
  hasUserWithEmail(db, email) {
    return db("tw_users")
      .where({ email })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("tw_users")
      .returning("*")
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain 1 upper case, lower case, number and special character";
    }
    return null;
  },

  validateEmail(email) {
    if (email.length < 4) {
      return "Email be longer than 4 characters";
    } 
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },

  serializeUsers(users) {
    return users.map(this.serializeUser)
  },

  serializeUser(user) {
    return {
      id: user.id,
      full_name: xss(user.full_name),
      user_name: xss(user.user_name),
      email: xss(user.email),
      date_created: new Date(user.date_created)
    };
  }
};

module.exports = UsersService;

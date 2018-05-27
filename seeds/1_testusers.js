const sha1 = require("sha1");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test_user",
          name: "Test User",
          screen_name: "tuser",
          email: "test@user.com",
          residence: "Test",
          phone: "1234567890",
          hyy_member: 1,
          membership: "jasen",
          created: new Date(),
          modified: new Date(),
          hashed_password: sha1("12345kekbUrtest_user"),
          salt: "12345",
          role: "member",
          tktl: 1,
          deleted: 0
        },
        {
          id: 2,
          username: "admin_user",
          name: "ADmin User",
          screen_name: "admin_user",
          email: "admin@user.com",
          residence: "Test",
          phone: "1234567890",
          hyy_member: 1,
          membership: "yllapitaja",
          created: new Date(),
          modified: new Date(),
          hashed_password: sha1("12345kekbUradmin_user"),
          salt: "12345",
          role: "member",
          tktl: 1,
          deleted: 0
        }
      ]);
    });
};

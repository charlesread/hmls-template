'use strict'

module.exports = {
  user: {
    create: 'insert into user values (null, ?, ?, ?, ?)',
    update: 'update user set username = ?, first_name = ?, last_name = ?, hash = ? where username = ?',
    validate: 'select hash from user where username = ?',
    by: {
      username: 'select id, username, first_name, last_name from user where username = ?'
    }
  },
  userRole: {
    by: {
      username: 'select c.role from user a join user_role b on a.id = b.user_id join role c on b.role_id = c.id where a.username = ?'
    }
  }
}
import { pool } from '../../config/db.js';

const findUserByEmail = (email) => {
  return pool.query(
    `SELECT user_id, school_name, full_name, email, password, role
     FROM tbl_users
     WHERE email = ?`,
    [email]
  )
  .then(([rows]) => {
    return rows.length > 0 ? rows[0] : null;
  });
};

const getMyProfile = (email) => {
  return pool.query( `SELECT user_id, school_name, full_name, email, role FROM tbl_users WHERE email = ?`, [email] )
  .then(([rows]) => {
    return rows.length > 0 ? rows[0] : null;
  });
};
export {findUserByEmail, getMyProfile};
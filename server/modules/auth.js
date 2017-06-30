'use strict';

export default {
  isAuthed: (req, res, next) => {
    if(!req.isAuthenticated()) {
      res.status(401).end('Unauthorized');
    }else {
      next();
    }
  }
};
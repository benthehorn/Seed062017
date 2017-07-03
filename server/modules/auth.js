'use strict';

export default {
  isAuthed: (req, res, next) => {
    if(!req.isAuthenticated()) {
      res.status(401).end('Unauthorized');
    }else {
      next();
    }
  },
  isAdmin: (req, res, next) => {
    if(req.user.role != 'admin') {
      res.status(403).end('Forbidden');
    } else {
      next();
    }
  }
};
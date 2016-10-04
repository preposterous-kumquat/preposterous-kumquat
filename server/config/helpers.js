let isLoggedIn = (req) => req.session ? !!req.session.user : false;



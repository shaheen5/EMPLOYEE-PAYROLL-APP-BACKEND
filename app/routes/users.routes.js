module.exports = (app) => {
    const user = require('../controllers/users.controller');

    // Create a new user
    app.post('/registerUser', user.registerUser);

    // login user
    app.get('/login',user.userLogin);
}
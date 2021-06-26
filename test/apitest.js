let chai = require('chai');
let chaiHttp = require('chai-http');
//assertion style
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');

describe('Test APIs', () => {
    /**
    * test for POST user registration
    */
    describe("POST /registerUser", () => {
        it("It should POST new user", (done) => {
            const userDetails = {
                firstName: "ananyaa",
                lastName: "patil",
                emailId: "anu15@gmail.com",
                password: "hello@123"
            };
            chai.request(server)
                .post('/registerUser')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a('object');
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('message').eq("New User Registered !");
                    res.body.should.have.property('data');
                    done();
                });
        });

        it("It should not POST new user when first name is less than 3 characters", (done) => {
            const userDetails = {
                firstName: "s",
                lastName: "miya",
                emailId: "shaheen5@gmail.com",
                password: "hello@123"
            };
            chai.request(server)
                .post('/registerUser')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    /**
         * test for POST user login
         */
    describe("POST /login", () => {
        it("It should login user", (done) => {
            const loginDetails = {
                emailId: "shaheen5@gmail.com",
                password: "hello@123"
            }
            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message').eq("User Login Successful");
                    response.body.should.have.property('data');
                    done();
                });
        })

        it("It should not login user for wrong details", (done) => {
            const loginDetails = {
                emailId: "@gmail.com",
                password: "hello@123"
            }
            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((error, response) => {
                    response.should.have.status(404);
                    response.body.should.have.property('success').eq(false);
                    done();
                });
        });
    });

});
let chai = require('chai');
let chaiHttp = require('chai-http');
//assertion style
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');
let testDataInput = require('../test/testData.json');
let userToken = '';

describe('Test APIs', () => {
    /**
    * test for POST user registration
    */
    describe("POST /registerUser", () => {
        it("It should POST new user", (done) => {
            const userDetails = testDataInput.registerUserData;
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
            const userDetails = testDataInput.registerUserDataWithFirstNameLessThan3Characters;
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
            const loginDetails = testDataInput.loginData;
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
        });

        it("It should not login user for wrong email Id", (done) => {
            const loginDetails = testDataInput.registerUserDataWithFirstNameLessThan3Characters;
            chai.request(server)
                .post("/login")
                .send(loginDetails)
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('success').eq(false);
                    done();
                });
        });
    });

    /**
     * before method to get user token after login
     */
    beforeEach((done) => {
        const userCredentials = testDataInput.loginData;
        chai.request(server)
            .post('/login')
            .send(userCredentials)
            .end((err, res) => {
                res.should.have.status(200);
                userToken = res.body.data;
                done();
            });
    });

    /**
     * test for GET route
     */
    describe("GET employees", () => {
        it("It should GET all the employees", (done) => {
            chai.request(server)
                .get("/getEmployees")
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eq("Successfully Retrieved All Employees !")
                    res.body.should.have.property('data').which.is.a('array');
                    done();
                });
        });

        it("It should NOT GET all the employees for wrong url", (done) => {
            chai.request(server)
                .get("/getEmployee")
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /**
    * test for POST route for employees
    */
    describe("POST /employees", () => {
        it("It should add new employee", (done) => {
            const employee = testDataInput.addEmployeeData;
            chai.request(server)
                .post('/employees')
                .send(employee)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.be.a('object');
                    res.should.have.status(201);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('message').eq("Employee Added Succesfully!");
                    res.body.should.have.property('data');
                    done();
                });
        });

        it("It should NOT POST new employee without the name property", (done) => {
            const employee = testDataInput.addEmployeeDataWithoutName
            chai.request(server)
                .post('/employees')
                .send(employee)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    res.body.should.have.property('message').eq("Invalid Input!");
                    done();
                });
        });

        it("It should NOT POST new employee with first name less than 3 characters", (done) => {
            const employee = testDataInput.addEmployeeDataWithoutName
            chai.request(server)
                .post('/employees')
                .send(employee)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
        });

    });
    /**
     * test for PUT route
     */
    describe("PUT /updateEmployee/:EmployeeID", () => {
        it("It should update employee details", (done) => {
            const employee = testDataInput.updateEmployeeDetails;
            const id = testDataInput.updateEmployeeId.id;
            chai.request(server)
                .put('/updateEmployee/' + id)
                .send(employee)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql('Employee Details Updated Successfully!');
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                });
        });

        it("It should NOT UPDATE employee details for wrong id", (done) => {
            const employee = testDataInput.updateEmployeeDetailsWithWrongId
            const id = testDataInput.updateEmployeeWrongId;
            chai.request(server)
                .put('/updateEmployee/' + id)
                .send(employee)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    if (err) done(err);
                    else done();
                });
        });
    });
    /**
     * test for GET /getEmployee/:EmployeeId
     */
    describe("GET ONE EMPLOYEE /getEmployee/:EmployeeID", () => {
        it("It should retrieve employee details for given id", (done) => {
            const id = testDataInput.getEmployeeDetailsId.id;
            chai.request(server)
                .get('/getEmployee/' + id)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql("Found Employee Details successfully!");
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                });
        });

        it("It should NOT GET employee details for wrong id", (done) => {
            const id = testDataInput.getEmployeeDetailsWrongId.id;
            chai.request(server)
                .get('/getEmployee/' + id)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * test for DELETE /deleteEmployee/:EmployeeId
     */
    describe("DELETE /deleteEmployee/:EmployeeID", () => {
        it("It should delete employee details", (done) => {

            const id = testDataInput.deletePersonId.id;
            chai.request(server)
                .put('/deleteEmployee/' + id)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql('Employee was deleted successfully');
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                });
        });

        it("It should NOT DELETE employee details for wrong id", (done) => {

            const id = testDataInput.deleteIncorrectId.id;
            chai.request(server)
                .put('/deleteEmployee/' + id)
                .set('token', userToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

});
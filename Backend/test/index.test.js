var chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
var app = require('../index');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
var expect = chai.expect;

var agent = chai.request.agent(app);
// const config = require('../mongo/config');
// const db = config.mongoURI;
const auth="JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxZjVhMjQzY2VlZjc4YmI2NTQ5ZGYiLCJpYXQiOjE2MTkzMzU2NjEsImV4cCI6MTYyMDM0MzY2MX0.vl9-uzq40gpOQjg8scrjedf-qySR1Ley0jZtwKZ4e-o";

describe("Fetch all users", ()=> {
  it("GET /fetchUsers", function(done){
    agent
      .get("/fetchUsers")
      .set("Authorization", auth)
      .then(function (res) {
        console.log(res.data);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        console.log("ERERERERER",e);
        done(e);
      });
  });
});

describe("Fetch groups with invalid user id", ()=> {
  it("POST /fetchGroups", (done)=> {
    agent
      .post("/fetchGroups")
      .set("Authorization", auth)
      .send({ user_id: '6081f56443ceef78bb6549dq'})
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.equal(0);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});



describe("Fetch groups with valid user id", ()=> {
  it("POST /fetchGroups", (done)=> {
    agent
      .post("/fetchGroups")
      .set("Authorization", auth)
      .send({ user_id: '6081f56443ceef78bb6549dc'})
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.greaterThan(0);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Fetch all expenses in a group with valid group id", ()=> {
  it("POST /getAllExpenses", (done)=> {
    agent
      .post("/getAllExpenses")
      .set("Authorization", auth)
      .send({ group_id: '6081f56443ceef78bb6549dc'})
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.greaterThan(-1);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Fetch all expenses in a group with invalid group id", ()=> {
  it("POST /getAllExpenses", (done)=> {
    agent
      .post("/getAllExpenses")
      .set("Authorization", auth)
      .send({ group_id: '608393f53ec16132728589cc'})
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.equal(0);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Fetch all group members in a group with valid group id", ()=> {
  it("POST /getGroupMembers", (done)=> {
    agent
      .post("/getGroupMembers")
      .set("Authorization", auth)
      .send({ group_id: '608393f53ec16132728589cc'})
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.equal(4);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Fetch all user expenses for recent activities page", ()=> {
  it("POST /getAllUserExpensesForRecentActivities", (done)=> {
    agent
      .post("/getAllUserExpensesForRecentActivities")
      .set("Authorization", auth)
      .send({ user_id: '0'})
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.equal(0);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
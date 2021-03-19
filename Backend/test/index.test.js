var chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
var app = require('../index');
var expect = chai.expect;

var agent = chai.request.agent(app);

describe("Fetch all users", ()=> {
  it("GET /fetchUsers", (done)=> {
    agent
      .get("/fetchUsers")
      .then(function (res) {
        expect(JSON.parse(res.text).length).to.greaterThan(0);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Fetch groups with invalid user id", ()=> {
  it("POST /fetchGroups", (done)=> {
    agent
      .post("/fetchGroups")
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



describe("Fetch groups with valid user id", ()=> {
  it("POST /fetchGroups", (done)=> {
    agent
      .post("/fetchGroups")
      .send({ user_id: '60'})
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
      .send({ group_id: '72'})
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
      .send({ group_id: '0'})
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
      .send({ group_id: '72'})
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
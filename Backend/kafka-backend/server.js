var connection = new require('./kafka/Connection');

require('./mongo/connectionMongo')

var signup = require('./services/signup')
var auth = require('./services/auth')
var login = require('./services/login')
var fetchUsers = require('./services/fetchUsers')
var newGroup = require('./services/newGroup')
var fetchGroups = require('./services/fetchGroups')
var acceptInvite = require('./services/acceptInvite')
var addExpense = require('./services/addExpense')
var getAllExpenses = require('./services/getAllExpenses')
var getAllIndividualExpenses = require('./services/getAllIndividualExpenses')
var getAllUserExpenses = require('./services/getAllUserExpenses')
var settleUp = require('./services/settleUp')
var updateUserProfile = require('./services/updateUserProfile')
var getAllUserExpensesForRecentActivities = require('./services/getAllUserExpensesForRecentActivities')
var exitGroup = require('./services/exitGroup')
var postComment = require('./services/postComment')
var deleteComment = require('./services/deleteComment')

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('kafka server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log("payload sent",data);
            });
            return;
        });

    });
}


handleTopicRequest("signup", signup)
handleTopicRequest("auth", auth)
handleTopicRequest("login", login)
handleTopicRequest("fetchUsers", fetchUsers)
handleTopicRequest("newGroup", newGroup)
handleTopicRequest("fetchGroups", fetchGroups)
handleTopicRequest("acceptInvite", acceptInvite)
handleTopicRequest("addExpense", addExpense)
handleTopicRequest("getAllExpenses", getAllExpenses)
handleTopicRequest("getAllIndividualExpenses", getAllIndividualExpenses)
handleTopicRequest("getAllUserExpenses", getAllUserExpenses)
handleTopicRequest("settleUp", settleUp)
handleTopicRequest("updateUserProfile", updateUserProfile)
handleTopicRequest("getAllUserExpensesForRecentActivities", getAllUserExpensesForRecentActivities)
handleTopicRequest("exitGroup", exitGroup)
handleTopicRequest("postComment", postComment)
handleTopicRequest("deleteComment", deleteComment)

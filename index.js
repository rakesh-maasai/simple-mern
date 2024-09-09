const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const routeTasks = require('./src/routes/tasks');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.use('/api/tasks', routeTasks, (req, res) => res.sendStatus(401));

app.use('/api/what are you doing', code)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);


// const uuid = require('uuid');
const uuid = require('uuid');
const teamsService = require('../apps/teams/teams-app-service');

const BotRoutes = require('./bot-routes');
const AppRoutes = require('./app-routes');
const AuthRoutes = require('./auth-routes');
const UserRoutes = require('./user-routes');
const WorkspaceRoutes = require('./workspace-routes');
const ConversationRoutes = require('./conversation-routes');
const BlacklistToken = require('../common/blacklist-token-service');
const ChannelSyncRoutes = require('./channelsync-routes');

module.exports = function (app) {
  // import routers
  app.post('/logout', (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    BlacklistToken.addToBlacklist(token);
    // Add the token to the blacklist
    res.status(200).json({ message: 'Token has been invalidated' });
  });
  app.use(AuthRoutes);
  app.use(WorkspaceRoutes);
  app.use(BotRoutes);
  app.use(AppRoutes);
  app.use(UserRoutes);
  app.use(ConversationRoutes);
  app.use(ChannelSyncRoutes);
  // temp routes for testing??
  app.get('/api/hello', teamsService.hello);
  app.get('/sse', (request, response) => {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    response.writeHead(200, headers);
    const subscriberId = uuid.v4();
    const data = `data: ${JSON.stringify({ id: subscriberId })}\n\n`;
    response.write(data);
  });
};

const val =10843;
console.log("val", val)

//cheonf
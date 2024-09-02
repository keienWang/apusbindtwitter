const express = require('express');
const bodyParser = require('body-parser');
const { handleTweetSubmission } = require('./controllers/tweetcontroller');

const app = express();
app.use(bodyParser.json());

app.post('/submit-tweet', handleTweetSubmission);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

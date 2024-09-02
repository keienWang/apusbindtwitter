const parseTweet = require('../utils/parseTweet');
const { saveTweetData } = require('../models/tweetmodel');
const { executeLuaContract } = require('../services/aoService');

const handleTweetSubmission = async (req, res) => {
  const { tweetLink, arAddress } = req.body;

  console.log(`Received tweetLink: "${tweetLink}", arAddress: "${arAddress}"`);

  try {
    const { username } = parseTweet(tweetLink.trim(), arAddress.trim());

    // 保存推文数据到 SQLite
    const tweetId = await saveTweetData(username, arAddress);

    // 将 Arweave 地址添加到 AO 区块链白名单
    await executeLuaContract("Add_to_whitelist", arAddress);

    res.json({ success: true, username, arAddress });
  } catch (error) {
    console.error('Error in handleTweetSubmission:', error.message);
    
    if (error.message.includes('Username already exists')) {
      res.status(409).json({ success: false, message: 'The provided Twitter username already exists.' });
    } else if (error.message.includes('Arweave address already exists')) {
      res.status(409).json({ success: false, message: 'The provided Arweave address already exists.' });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ success: false, message: error.message });
    } else if (error.message.includes('Error executing Add_to_whitelist on AO blockchain')) {
      res.status(500).json({ success: false, message: 'Failed to add address to whitelist on AO blockchain.' });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};

module.exports = { handleTweetSubmission };

const axios = require('axios');

const validateArAddress = (address) => {
  const arAddressRegex = /^[a-zA-Z0-9\-_]{43}$/;
  const isValid = arAddressRegex.test(address);
  console.log(`Validating Arweave address: ${address}, Result: ${isValid}`);
  return isValid;
};

const validateTweetLink = (link) => {
  const tweetLinkRegex = /^https:\/\/x\.com\/([a-zA-Z0-9_]+)\/status\/\d+\?s=\d+$/;
  return tweetLinkRegex.test(link);
};

const parseTweet = (tweetLink, arAddress) => {
  // 验证输入
  if (!validateTweetLink(tweetLink)) {
    throw new Error('Invalid tweet link format.');
  }

  // 验证 Arweave 地址格式
  const arAddressRegex = /^[a-zA-Z0-9\-_]{43}$/;
  if (!arAddressRegex.test(arAddress)) {
    throw new Error('Invalid Arweave address format.');
  }

  // 提取用户名
  const usernameMatch = tweetLink.match(/^https:\/\/x\.com\/([a-zA-Z0-9_]+)\/status\/\d+\?s=\d+$/);
  if (!usernameMatch || usernameMatch.length < 2) {
    throw new Error('Unable to extract username from tweet link.');
  }

  const username = usernameMatch[1];
  console.log(`Extracted username: ${username}`);
  
  return { username, arAddress };
};

module.exports = parseTweet;

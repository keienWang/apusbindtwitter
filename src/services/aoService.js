const { readFileSync } = require("fs");
const path = require("path");
const { message, createDataItemSigner, result } = require("@permaweb/aoconnect");

const walletPath = path.join(__dirname, "wallet.json");

// 加载钱包文件
const wallet = JSON.parse(readFileSync(walletPath).toString());
// AO 进程 ID
const AO_PROCESS_ID = "mhlw9Awvp8urkWx_-EHzAFez4U-b9LaNeIbaO6_d79Q";

// 通用函数，用于与 Lua 合约交互
const executeLuaContract = async (action, arAddress) => {
  try {
    // 设置标签和数据
    const tags = [
      { name: "Action", value: action }
    ];

    const response = await message({
      process: AO_PROCESS_ID,
      tags: tags,
      signer: createDataItemSigner(wallet),
      data: arAddress,
    });

    const { Messages, Spawns, Output, Error } = await result({
      message: response,
      process: AO_PROCESS_ID,
    });

    if (Error) {
      console.error(`Error executing ${action} on AO blockchain:`, Error);
      throw new Error(`Error executing ${action} on AO blockchain: ${Error}`);
    }

    console.log(`Result of ${action} from AO blockchain:`, { Messages, Spawns, Output });
    return { Messages, Spawns, Output };
  } catch (error) {
    console.error(`Error executing ${action} on AO blockchain:`, error.message);
    throw new Error(`Error interacting with AO blockchain for action ${action}: ${error.message}`);
  }
};

module.exports = { executeLuaContract };

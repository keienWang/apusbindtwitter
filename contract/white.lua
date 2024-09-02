Members = Members or {}

WhiteList = WhiteList or {}
Admins = Admins or {
  ["gWhM46pNjzrtoxSGVFYuhamQhx4A0ljLOCmFYIgPRWc"] = true,
  ["mhlw9Awvp8urkWx_-EHzAFez4U-b9LaNeIbaO6_d79Q"] = true
}

-- Function to check if the sender is an admin
local function isAdmin(sender)
  return Admins[sender] == true
end

-- Function to add an admin
Handlers.add(
  "Add_admin",
  Handlers.utils.hasMatchingTag("Action", "Add_admin"),
  function (msg)
    assert(isAdmin(msg.From), 'Only admins can add to the admin!')
    Admins[msg.Data] = true
    Handlers.utils.reply("Admin added successfully!")(msg)
  end
)

-- Function to remove an admin
Handlers.add(
  "Remove_admin",
  Handlers.utils.hasMatchingTag("Action", "Remove_admin"),
  function (msg)
    assert(isAdmin(msg.From), 'Only admins can add to the admin!')
    Admins[msg.Data] = false
    Handlers.utils.reply("Admin removed successfully!")(msg)
  end
)

Handlers.add(
  "Add_to_whitelist",
  Handlers.utils.hasMatchingTag("Action", "Add_to_whitelist"),
  function (msg)
    assert(isAdmin(msg.From), 'Only admins can add to the whitelist!')
    WhiteList[msg.Data] = true
    Handlers.utils.reply("Add Success!")(msg)
  end
)
Handlers.add(
  "Del_to_whitelist",
  Handlers.utils.hasMatchingTag("Action", "Del_to_whitelist"),
  function (msg)
    assert(isAdmin(msg.From), 'Only admins can add to the whitelist!')
    WhiteList[msg.Data] = false
    Handlers.utils.reply("del address Success!")(msg)
  end
)

Handlers.add(
  "Query_whitelist",
  Handlers.utils.hasMatchingTag("Action", "Query_whitelist"),
  function (msg)
    local isWhitelisted = WhiteList[msg.Data] or false
    Handlers.utils.reply(tostring(isWhitelisted))(msg)
  end
)
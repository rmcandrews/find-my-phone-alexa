"use strict";

let find = require("find-my-iphone");
let users = require("./users");

module.exports.findMyiPhone = async (event) => {
  let user;
  let heardName = event.request.intent.slots.User.value;
  if (users.length === 1) {
    user = users[0];
  } else {
    if (heardName) {
      if (heardName.endsWith("'s")) heardName = heardName.slice(0, -2);
      user = users.find((user) =>
        user.possibleHeardNames.includes(heardName.toLowerCase())
      );
    }
  }

  let responseSpeech;
  if (!user) {
    if (!heardName)
      responseSpeech = `I'm sorry, I didn't hear whose phone I should be finding.`;
    else responseSpeech = `I'm sorry, I did't find a user named ${heardName}.`;
  } else {
    try {
      await new Promise((resolve, reject) =>
        find(user.username, user.password, user.deviceName, (err) => {
          if (err) reject(err);
          resolve();
        })
      );
      responseSpeech = `Pinging ${heardName}'s phone.`;
    } catch (err) {
      responseSpeech = `There was a problem pinging ${heardName}'s phone.`;
    }
  }

  return {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: responseSpeech,
      },
      shouldEndSession: true,
    },
  };
};

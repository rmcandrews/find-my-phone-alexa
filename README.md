# Find My iPhone Alexa

## Instructions

1. Clone the repo and run the following
   ```
   nvm use
   npm install
   ```
2. Follow the [setup section](https://github.com/marcy-terui/serverless-alexa-skills#setup) of the Serverless Alexa Skills Plugin
3. Authente the Alexa Skill Plugin
   ```
   npm run auth
   ```
4. Create the Alexa Skill
   ```
   npm run create-skill
   ```
5. Fill in _users.example.js_ with your information and rename it _users.js_
6. Deploy everything
   ```
   npm run deploy
   ```

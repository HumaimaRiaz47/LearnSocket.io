for server side 
npm init -y //package.json file is created
npm --save--dev nodemon //to restart the server
npm i express socket.io cors
in package.json main: app.js
in package.json -> scripts -> dev: nodemon app.js //to run  //npm run dev
"start": "node app.js"
"type": "module", //so that we can use es6 js


for client side
npm create vite@latest
npm i //add nodemodules in client
npm install @mui/material @emotion/react @emotion/styled
npm i socket.io-client



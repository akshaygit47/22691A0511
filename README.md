# Backend Test Submission – URL Shortener Microservice

**Roll Number:** 22691a0511  
**Name:** P Akshay Kumar

Project Structure

Logging Middleware
- Implements a `log(stack, level, package, message)` function.
- Sends POST request to protected log endpoint with Authorization header.
- Values used: 
  - stack: "backend"
  - level: "info", "error", etc.
  - package: "middleware", etc.
Backend Test Submission (URL Shortener)
- REST API built with Node.js & Express.
- Shortens URLs, tracks clicks & expiry.
- Auto-generates shortcode or accepts custom.
- Uses logging middleware to log important events.
- No external libraries used for logic (only axios for logging, uuid for code generation).



 ✅ How to run
```bash
git clone https://github.com/akshaygit47/22691A0511.git
cd 22691A0511
npm install
node app.js

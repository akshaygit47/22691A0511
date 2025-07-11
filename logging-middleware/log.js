const axios = require('axios');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjY5MWEwNTExQG1pdHMuYWMuaW4iLCJleHAiOjE3NTIyMTEyNzAsImlhdCI6MTc1MjIxMDM3MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFhNGM4N2ZmLTI0MjUtNDI4Yy1hMGFkLTVmMzNlOTQ2ODJjNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InAgYWtzaGF5IGt1bWFyIiwic3ViIjoiZmVjYWUxNDAtZjFjNi00ZDdjLTgzOTAtZjcxODg2Zjk2MmYyIn0sImVtYWlsIjoiMjI2OTFhMDUxMUBtaXRzLmFjLmluIiwibmFtZSI6InAgYWtzaGF5IGt1bWFyIiwicm9sbE5vIjoiMjI2OTFhMDUxMSIsImFjY2Vzc0NvZGUiOiJjYVZ2TkgiLCJjbGllbnRJRCI6ImZlY2FlMTQwLWYxYzYtNGQ3Yy04MzkwLWY3MTg4NmY5NjJmMiIsImNsaWVudFNlY3JldCI6InNWdlNBa2Fwd2tNZFF0dGEifQ.8tG4wfnEnbkIS34RwvbJ5bTAJaeGExkLeF2ImwGw0To";

const Log = async (stack, level, packageName, message) => {
  try {
    await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.error('❌ Logging failed:', err.response?.data || err.message);
  }
};

module.exports = Log;

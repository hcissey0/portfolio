const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/users/hcissey0/repos',
  method: 'GET',
  headers: {
    'User-Agent': 'node.js'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const repos = JSON.parse(data);
    const projects = repos.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language
    }));
    fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2));
    console.log('Projects data saved to projects.json');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();

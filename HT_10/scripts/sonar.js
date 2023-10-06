/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const scanner = require('sonarqube-scanner')

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_dbf56f002c8d5cee50d2fe1b75acd95eec81241e',
    options: {
      'sonar.projectKey': 'sonarqube-ht-10p',
      'sonar.projectName': 'sonarqube-ht-10p',
      'sonar.projectDescription': 'Description for "My App" project...',
      'sonar.sources': 'src',
      'sonar.login': 'admin',
      'sonar.password': '11223344',
    },
  },
  // eslint-disable-next-line no-undef
  () => process.exit(),
)

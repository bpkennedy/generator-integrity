import { fileURLToPath } from 'url'
import path from 'path';
import fs from 'fs'
import { assert } from 'chai'
import helpers from 'yeoman-test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const appGeneratorPath = path.join(__dirname, '../generators/app')

describe('Yeoman Generator Tests', function () {
  let destinationPath; // Store the destination path between each test

  before(function () {
    // Create the temporary directory before all tests
    fs.mkdirSync(path.join(__dirname, 'temp'));

    return helpers
      .run(appGeneratorPath)
      .inTmpDir((dir) => {
        destinationPath = dir;
        return destinationPath;
      })
      .withPrompts({
        name: 'zebra',
        databaseName: 'zebra',
        databaseUser: 'admin',
        databaseUserPassword: 'password',
        databaseLocalContainerName: 'localdb',
        databaseTestContainerName: 'testdb',
      });
  });

  after(function () {
    // Cleanup the temporary directory after all tests
    fs.rmdirSync(path.join(__dirname, 'temp'), { recursive: true });
  });

  describe('General Tests', function () {
    const paths = [
      'zebra',
      'zebra/components/Meta.tsx',
      'zebra/components/Footer.tsx',
      'zebra/cypress/e2e/home.cy.js',
      'zebra/cypress/fixtures/example.json',
      'zebra/cypress/support/commands.ts',
      'zebra/cypress/support/e2e.ts',
      'zebra/database/items.ts',
      'zebra/fonts/Lora',
      'zebra/fonts/Roboto',
      'zebra/lib/constants.ts',
      'zebra/lib/prisma.ts',
      'zebra/pages/_app.tsx',
      'zebra/pages/_document.tsx',
      'zebra/pages/index.tsx',
      'zebra/prisma/data/index.ts',
      'zebra/prisma/data/items.ts',
      'zebra/prisma/migrations',
      'zebra/prisma/schema.prisma',
      'zebra/prisma/seed.ts',
      'zebra/public',
      'zebra/scripts/connect-to-mysql.sh',
      'zebra/scripts/create-migration.sh',
      'zebra/scripts/local-db.sh',
      'zebra/scripts/nuke.sh',
      'zebra/scripts/test-db.sh',
      'zebra/styles',
      'zebra/.babelrc',
      'zebra/.env',
      'zebra/.eslintrc.json',
      'zebra/.gitignore',
      'zebra/.prettierignore',
      'zebra/all-tests.sh',
      'zebra/amplify.yml',
      'zebra/ci.sh',
      'zebra/create-migrations.md',
      'zebra/cypress.config.ts',
      'zebra/docker-compose.test.yml',
      'zebra/docker-compose.yml',
      'zebra/local-start.sh',
      'zebra/next.config.js',
      'zebra/package.json',
      'zebra/postcss.config.js',
      'zebra/prettier.config.js',
      'zebra/README.md',
      'zebra/tailwind.config.js',
      'zebra/tsconfig.json',
      'zebra/yarn.lock',
    ]

    paths.forEach(p => {
      it(`should create ${p}`, function () {
        assert.isTrue(fs.existsSync(path.join(destinationPath, p)));
      });
    });
  });

  describe('Content Tests', function () {
    const assertions = [
      { filePath: 'zebra/components/Meta.tsx', string: `const Meta = ({ title = 'zebra', ` },
      { filePath: 'zebra/cypress/e2e/home.cy.js', string: `cy.title().should('eq', 'zebra')` },
      { filePath: 'zebra/scripts/connect-to-mysql.sh', string: `DOCKER_CONTAINER="testdb"` },
      { filePath: 'zebra/scripts/connect-to-mysql.sh', string: `MYSQL_DATABASE="zebra"` },
      { filePath: 'zebra/.env', string: `DATABASE_URL="mysql://root:password@localhost:3306/zebra"` },
      { filePath: 'zebra/.env', string: `LOCAL_DATABASE_URL="mysql://admin:password@localhost:3306/zebra"` },
      { filePath: 'zebra/.env', string: `TEST_DATABASE_URL="mysql://admin:password@localhost:3306/zebra?connection_limit=0&pool_timeout=0&socket_timeout=5"` },
      { filePath: 'zebra/.env', string: `LOCAL_MYSQL_CONTAINER_NAME='localdb'` },
      { filePath: 'zebra/.env', string: `LOCAL_MYSQL_DATABASE='zebra'` },
      { filePath: 'zebra/.env', string: `LOCAL_MYSQL_USER='admin'` },
      { filePath: 'zebra/.env', string: `LOCAL_MYSQL_USER_PASSWORD='password'` },
      { filePath: 'zebra/.env', string: `TEST_MYSQL_CONTAINER_NAME='testdb'` },
      { filePath: 'zebra/.env', string: `TEST_MYSQL_DATABASE='zebra'` },
      { filePath: 'zebra/.env', string: `TEST_MYSQL_USER='admin'` },
      { filePath: 'zebra/.env', string: `TEST_MYSQL_USER_PASSWORD='password'` },
      { filePath: 'zebra/docker-compose.test.yml', string: `container_name: testdb` },
      { filePath: 'zebra/docker-compose.yml', string: `container_name: localdb` },
      { filePath: 'zebra/README.md', string: `zebra` },
      { filePath: 'zebra/package.json', string: `"name": "zebra",` },
    ];
  
    assertions.forEach(assertion => {
      it(`should find ${assertion.filePath} with the correct content`, function () {
        const content = fs.readFileSync(path.join(destinationPath, assertion.filePath), 'utf-8');
        assert.include(content, assertion.string);
      });
    });
  });
});

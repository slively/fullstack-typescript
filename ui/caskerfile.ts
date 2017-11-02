import {casker} from 'casker';
import {appBuild} from './config/paths';

const {task} = casker({namespace: 'ui', cwd: __dirname});

export const install = task('install', 'yarn install');

export const test = task('test', 'node scripts/test.js --config=jest.config.json --coverage', {dependsOn: install});
task('testWatch', 'node scripts/test.js --env=jsdom --config=jest.config.json --watch');

const startCmd = 'node scripts/start.js';
export const start = task('start', 'node scripts/start.js', {dependsOn: install});
export const startBackground = task('startBackground', `BROWSER=NONE ${startCmd}`, {dependsOn: install, isLongRunning: true});
export const waitForUiServer = task('wait', 'wait-on -t 10000 http://localhost:3000', {dependsOn: startBackground});
export const build = task('build', 'node scripts/build.js', {dependsOn: test});
export const buildOutputPath = appBuild;

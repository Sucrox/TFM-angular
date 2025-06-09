import pkg from '../../../package.json';

export const environment = {
  production: false,
  NAME: pkg.name,
  VERSION: pkg.version,
  backendUrl: 'https://tfm-spring.onrender.com',
  routes: [
  ],
}

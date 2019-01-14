/**
 * Configuration
 * @module config
 */

import NPMPackage from '../package.json';

const selection = [4, 8, 10, 20, 40];

const config = {
  name: NPMPackage.name,
  title: NPMPackage.title,
  description: NPMPackage.description,
  selection,
};

export default config;

const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'lib/imgs/icon/icon.ico'),
  },
  rebuildConfig: {
    arch: 'ia32',
    platform: 'win32',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: path.join(__dirname, 'lib/imgs/icon/icon.ico'),
        arch: ['x64', 'ia32'],
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
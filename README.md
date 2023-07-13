<p align="center">
  <img src="./lib/imgs/icon/icon.png" width="128" height="128" alt="SetMatic">
</p>

# SetMatic
<!-- license -->
![GitHub](https://img.shields.io/github/license/IRedDragonICY/MATDIS-Project?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/IRedDragonICY/MATDIS-Project?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/IRedDragonICY/MATDIS-Project/total?style=flat-square)
[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FIRedDragonICY%2FMATDIS-Project&label=Visitors&countColor=%23263759)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FIRedDragonICY%2FMATDIS-Project)


SetMatic is a set calculator program used to perform set operations such as intersection, union, addition, subtraction, cartesian product, and symmetric difference. This program was developed by Mohammad Farid Hendianto as an assignment for Ahmad Dahlan University. This project is for educational purposes only.
Lecturer: Nur Rochman Dyah P.A, S.T., M.Kom
## Features

- Supported set operations: intersection, union, addition, subtraction, cartesian product, and symmetric difference.
- Handles multi-member sets.
- Supports the use of parentheses to group sets.

## Requirements

- Web browser with JavaScript support.

## Build Instructions

To build SetMatic, you need to have npm and electronjs installed on your system. Follow the steps below to install them:
1. clone this repository to your local machine.  

  ```
  git clone https://github.com/IRedDragonICY/MATDIS-Project.git
  ```

2. Install Node.js from the official website: https://nodejs.org/en/download/
3. Open your terminal and run the following command to install electronjs:

  ```
  npm install --save-dev electron
  ```
4. Add Electron Forge as a dev-dependency by running the following command:

  ```
  npm install --save-dev @electron-forge/cli 
  ```
5. Initialize a new project by running the following command:

  ```
  npx electron-forge import
  ```
6. Run the following command to build the project:

  ```
  npm run make
  ```
7. The built program will be located in the `out` folder.

## Usage
<!-- Jelaskan bahwa ada dua aplikasi yaitu aplikasi web dan aplikasi -->
SetMatic has two versions: web and desktop. The web version can be accessed at https://setmatic.vercel.app The desktop version can be downloaded from the releases page of this repository.

## Contribution

Contributions are open for improving this program. If you find any issues or want to make changes, please submit a pull request in this repository.

## License

SetMatic released under the GPL-3.0 License. Copyright © 2023 Ahmad Dahlan University. Please see the `LICENSE` file for more information.
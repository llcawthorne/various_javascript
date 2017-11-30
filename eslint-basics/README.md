Followed instructions in YouTube video
"Diving into ESLint: Getting Setup (1 of 3)" and it's two companions.
https://www.youtube.com/watch?v=nxxl2H_TOTc


## Getting Started

1. `npm install --save-dev eslint`
2. `npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y`
3. Make an .eslintrc in the project directory with the following:

{
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": "warn",
    "no-unused-vars": [
      "error", 
      {
        "vars": "all", 
        "args": "none",
      }
    ],
    "react/jsx-filename-extension": [
      1, 
      { 
        "extensions": [
          ".js", 
          ".jsx"
        ]
      }
    ],
  }
}


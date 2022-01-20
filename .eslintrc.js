module.exports = {
  extends: [
    require.resolve('@hb/codestyle-linter/rcs/eslintrc.js'),
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/restrict-template-expressions": ["off"],
    "@typescript-eslint/no-unsafe-call": ["off"],
    "@typescript-eslint/no-unsafe-member-access": ["off"],
    "@typescript-eslint/no-unsafe-assignment": ["off"],
    "@typescript-eslint/restrict-template-expressions": ["off"],
    "@typescript-eslint/restrict-plus-operands":["off"],
    "@typescript-eslint/prefer-regexp-exec":["off"],
    "no-use-before-define": ["error", {
      "variables": false
    }],
    "no-unused-expressions": [0, {
      "allowShortCircuit": true,
      "allowTernary": true,
    }],
    "no-useless-escape":"off",
    "eqeqeq": ["off"],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "import/no-unresolved": ["off"],
    "import/no-cycle": ["off"],
    "no-param-reassign": ["off", { "props": false }],
    "import/no-named-as-default": 0,
    "no-underscore-dangle": 0,
    "global-require": 0,
    "import/extensions": ['off', 'never'],
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "class-methods-use-this": 0,
    "no-empty": 0,
    'import/prefer-default-export': 0,
    'camelcase': 0,
    'no-new': 0,
    "max-len":['off'],
    "consistent-return":["off"]
  }
};

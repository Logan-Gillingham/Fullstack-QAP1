#!/usr/bin/env node

const crypto = require('crypto');
const args = process.argv.slice(2);

const helpMessage = `
Password Generator CLI

Usage:
  --help            Show help message
  --length <num>    Specify the password length (default is 8)
  --numbers         Include numbers in the password
  --uppercase       Include uppercase letters in the password
  --symbols         Include symbols in the password

Examples:
  $ password-gen --length 12 --numbers --uppercase
  $ password-gen --symbols --numbers
`;

const charset = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?'
};

function generatePassword(length = 8, useNumbers = false, useUppercase = false, useSymbols = false) {
  let availableChars = charset.lowercase;
  if (useNumbers) availableChars += charset.numbers;
  if (useUppercase) availableChars += charset.uppercase;
  if (useSymbols) availableChars += charset.symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(availableChars.length);
    password += availableChars[randomIndex];
  }
  return password;
}

function parseArgs() {
  let length = 8;
  let useNumbers = false;
  let useUppercase = false;
  let useSymbols = false;

  if (args.includes('--help')) {
    console.log(helpMessage);
    process.exit(0);
  }

  if (args.includes('--length')) {
    const lengthIndex = args.indexOf('--length') + 1;
    length = parseInt(args[lengthIndex], 10);
    if (isNaN(length) || length <= 0) {
      console.error('Error: Invalid length. Please use a positive nunber.');
      process.exit(1);
    }
  }

  if (args.includes('--numbers')) {
    useNumbers = true;
  }

  if (args.includes('--uppercase')) {
    useUppercase = true;
  }

  if (args.includes('--symbols')) {
    useSymbols = true;
  }

  return { length, useNumbers, useUppercase, useSymbols };
}

function main() {
  const { length, useNumbers, useUppercase, useSymbols } = parseArgs();
  const password = generatePassword(length, useNumbers, useUppercase, useSymbols);
  console.log('Generated password:', password);
}

main();
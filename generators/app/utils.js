const isEmpty = (packageName) => packageName === undefined || packageName.trim().length === 0;

const startsWithDotOrUnderscore = (packageName) => packageName.startsWith('.') || packageName.startsWith('_');

const matchesRegex = (packageName, regex) => regex.test(packageName);

export function testValidInputValue(input) {
  const validations = [
    { test: isEmpty, message: 'Project name cannot be empty' },
    { test: (str) => matchesRegex(str, /[A-Z]/), message: 'Project name cannot have uppercase letters' },
    { test: (str) => !matchesRegex(str, /^[a-zA-Z0-9-_]+$/), message: 'Project name can only contain letters, numbers, dashes, and underscores' },
    { test: startsWithDotOrUnderscore, message: 'Project name cannot start with a period or underscore' },
    { test: (str) => matchesRegex(str, /\s/), message: 'Project name cannot contain leading, trailing spaces, or spaces between characters' },
    { test: (str) => matchesRegex(str, /[~)('!*]/), message: 'Project name cannot contain ~ ) ( \' * !' },
    { test: (str) => str.length > 214, message: 'Project name cannot be longer than 214 characters' }
  ];

  for (const { test, message } of validations) {
    if (test(input)) return message;
  }

  return true;
}

export function testValidPasswordValue(input) {
  const validations = [
    { test: isEmpty, message: 'Password cannot be empty' },
    { test: (str) => matchesRegex(str, /\s/), message: 'Password cannot contain spaces' }
  ];

  for (const { test, message } of validations) {
    if (test(input)) return message;
  }

  return true;
}

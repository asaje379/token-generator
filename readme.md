# Token generator

> Simple web token generator

## Usage

### Installation

```bash
npm install @asaje/token-generator
```

or

```bash
yarn add @asaje/token-generator
```

### How it works

```ts
import { sign, verify } from '@asaje/token-generator';

const key = 'my-super-key';
const token = sign({ data: 'Hello world', key }); // Generate token

console.log('token', token);

try {
  const info = verify({ key, token }); // Verify token
  console.log('token-info', info);
} catch (error) {
  console.log(error);
}
```

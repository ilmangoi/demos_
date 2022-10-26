/* eslint-disable */

declare let process: {
  env: {
    NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION'
  }
}

declare namespace MyNamespace {
  export class MyClass {
    public myMethod(): void
  }
}

process = {
  env: {
    NODE_ENV: 'DEVELOPMENT'
  }
}

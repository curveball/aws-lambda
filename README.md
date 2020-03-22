Curveball AWS Lamba Handler
===========================

AWS lambda bindings for curveball. Go 'serverless' with [Curveball][1].

Installation
------------

    npm install @curveball/aws-lambda

If you're using typescript, you will also want the types package for `aws-lambda`:

    npm install -D @types/aws-lambda


Getting started
---------------

After you've constructed your curveball `Application` as usual, you can
simply use the `aws-lambda` package to convert it to a 'handler' that
Lambda supports:

```typescript
import { Application } from '@curveball/core';
import handler from '@curveball/aws-lambda';

const app = new Application();
app.use(ctx => {
  ctx.response.body = 'hello world';
});

exports.handler = handler(app);
```

[1]: https://github.com/curveball

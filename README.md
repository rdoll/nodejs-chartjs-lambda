# nodejs-chartjs-lambda
Simple NodeJS ChartJS AWS Lambda application to generate chart images.

## Status
Does not work because ChartJS and/or ChartJS Canvas relies on native libraries which Lambda fails to read:
```
2022-07-28T03:14:14.886Z	f08b0267-1d19-4883-87f6-de2481182938	ERROR	Invoke Error 	{
    "errorType": "Error",
    "errorMessage": "/var/task/node_modules/canvas/build/Release/canvas.node: invalid ELF header",
    "code": "ERR_DLOPEN_FAILED",
    "stack": [
        "Error: /var/task/node_modules/canvas/build/Release/canvas.node: invalid ELF header",
        "    at Object.Module._extensions..node (internal/modules/cjs/loader.js:1144:18)",
        "    at Module.load (internal/modules/cjs/loader.js:950:32)",
        "    at Function.Module._load (internal/modules/cjs/loader.js:790:12)",
        "    at Module.require (internal/modules/cjs/loader.js:974:19)",
        "    at require (internal/modules/cjs/helpers.js:101:18)",
        "    at Object.<anonymous> (/var/task/node_modules/canvas/lib/bindings.js:3:18)",
        "    at Module._compile (internal/modules/cjs/loader.js:1085:14)",
        "    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)",
        "    at Module.load (internal/modules/cjs/loader.js:950:32)",
        "    at Function.Module._load (internal/modules/cjs/loader.js:790:12)"
    ]
}
```

Presume we have to switch to running inside a container.

## Deploy
- `zip -r nodejs-chartjs-lambda.zip index.js node_modules`
- Upload to Lambda

## Test
- Use [nodejs-chartjs-lambda.http](nodejs-chartjs-lambda.http)
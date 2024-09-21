# How to run the application

1. Install all the dependencies
> npm install

2. Rename `.dev.vars.dist` to `.dev.vars`

3. Run the application
> npm start

Then the app will run in PORT 8787


### Exported SQL

here's the exported [product.sql](product.sql) after running the following API

1. GET http://localhost:8787/api/products
2. POST http://localhost:8787/api/products
3. PUT http://localhost:8787/api/products
4. DELETE http://localhost:8787/api/products/50040694374689

### DB Credentials

Can be found in [.dev.vars.dist](.dev.vars.dist)

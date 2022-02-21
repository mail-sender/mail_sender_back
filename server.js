const port = 3000;
const express = require('express');
const mongoose = require('mongoose');
const server = express();

const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

// graphql 등록
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);


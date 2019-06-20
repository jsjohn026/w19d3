const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID, 
  GraphQLInt } = graphql;
const CategoryType = require("./category_type");
const Category = mongoose.model('categories');

const ProductType = new GraphQLObjectType({
  name: "ProductType",

  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt },
    category: {
      type: CategoryType, 
      resolve(parentValue) {
        return Category.findById(parentValue.category)
        .then(category => category)
        .catch(err => null);
      }
    }
  })
});

module.exports = ProductType;
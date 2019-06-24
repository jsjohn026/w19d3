const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLID,
  GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");
const Category = mongoose.model("categories");
const Product = mongoose.model("products");

const mutation = new GraphQLObjectType({
  name: "Mutation", 
  fields: {
    newCategory: {
      type: CategoryType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      }, 
      resolve(parentValue, { name }) {
        return new Category({ name }).save();
      }
    },
    deleteCategory: {
      type: CategoryType, 
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      }, 
      resolve(parentValue, { id }) {
        return Category.remove({ _id: id } )
      }
    }, 
    newProduct: {
      type: ProductType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }, 
        weight: { type: GraphQLInt }
      }, 
      resolve(parentValue, { name, description, weight }) {
        return new Product({ name, description, weight }).save();
      }
    }, 
    deleteProduct: {
      type: ProductType, 
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      }, 
      resolve(parentValue, { id }) {
        return Product.remove({ _id: id })
      }
    }
    // , 
    // updateProductCategory: {
    //   type: ProductType, 
    //   args: {

    //   }
    // }
  }
});

module.exports = mutation;
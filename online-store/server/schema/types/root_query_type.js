const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLList, 
  GraphQLID, 
  GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const ProductType = require("./product_type");
const CategoryType = require("./category_type");
const User = mongoose.model("users");
const Product = mongoose.model("products");
const Category = mongoose.model("categories");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType", 
  fields: () => ({
    users: {
      type: new GraphQLList(UserType), 
      resolve()  {
        return User.find({});
      }
    }, 
    user: {
      type: UserType, 
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    }, 
    categories: {
      type: new GraphQLList(CategoryType), 
      resolve() {
        return Category.find({});
      }
    },
    category: {
      type: CategoryType, 
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Category.findById(args.id);
      }
    }, 
    products: {
      type: new GraphQLList(ProductType), 
      resolve() {
        return Product.find({});
      }
    }, 
    product: {
      type: ProductType, 
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Product.findById(args.id);
      }
    }
  })
});

module.exports = RootQueryType;
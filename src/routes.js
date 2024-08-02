const routes = {
  root: "/",
  cart: "/cart",
  checkout: "/checkout",
  children: {
    productList: "/products",
    productListItem: "/products/:slug",
  },
};
export default routes;

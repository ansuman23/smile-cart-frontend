import { useState } from "react";

import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product/Product";
import ProductList from "components/ProductList/ProductList";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import CartItemsContext from "./contexts/CartItemsContext";

// eslint-disable-next-line import/extensions

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
      <div className="flex space-x-2">
        <NavLink activeClassName="underline font-semibold" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="underline font-semibold" to="/product">
          Product
        </NavLink>
      </div>
      <Switch>
        <Route
          exact
          component={ProductList}
          path={routes.children.productList}
        />
        {/* <Route exact component={Home} path="/" /> */}
        <Route
          exact
          component={Product}
          path={routes.children.productListItem}
        />
        <Redirect exact from={routes.root} to={routes.children.productList} />
        <Route exact component={Cart} path={routes.cart} />
        <Route exact component={Checkout} path={routes.checkout} />
        <Route exact component={PageNotFound} path="*" />
      </Switch>
    </CartItemsContext.Provider>
  );
};

export default App;

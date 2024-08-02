import React from "react";

import { NoData } from "@bigbinary/neetoui";
import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import ProductCard from "components/commons/ProductCard";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { keys, isEmpty } from "ramda";
import i18n from "src/common/i18n";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";

const Cart = () => {
  const { cartItems } = useCartItemsStore();
  const slugs = keys(cartItems);
  // const [isLoading, setLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  const { data: products = [], isLoading } = useFetchCartProducts(slugs);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);
  // const fetchCartProducts = async () => {
  //   try {
  //     const responses = await Promise.all(
  //       slugs.map(slug => productsApi.show(slug))
  //     );
  //     setProducts(responses);
  //     responses.forEach(({ availableQuantity, name, slug }) => {
  //       if (availableQuantity >= cartItems[slug]) return;
  //       setSelectedQuantity(slug, availableQuantity);
  //       if (availableQuantity === 0) {
  //         Toastr.error(
  //           `${name} is no longer available and has been removed from the cart`
  //         ),
  //           { autoClose: 2000 };
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCartProducts();
  // }, [cartItems]);
  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(products)) {
    return (
      <>
        <Header title="My Cart" />;
        <div className="flex h-screen items-center justify-center">
          <NoData title="Your Cart is Empty" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(prod => (
            <ProductCard key={prod.slug} {...prod} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};
export default withTitle(Cart, i18n.t("cart.title"));

// export default Cart;

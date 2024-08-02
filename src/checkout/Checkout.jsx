import React, { useRef, useState } from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Typography, Checkbox } from "@bigbinary/neetoui";
import PageLoader from "components/commons/PageLoader";
import { CHECKOUT_LOCAL_STORAGE_KEY } from "components/constants";
import { useFetchCountries } from "hooks/reactQuery/useCheckoutApi";
import { useCreateOrder } from "hooks/reactQuery/useCheckoutApis";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { Form as NeetoUIForm } from "neetoui/formik";
import { isEmpty, keys } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import i18n from "src/common/i18n";
import useCartItemsStore from "stores/useCartItemsStore";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";

import {
  CHECKOUT_FORM_INITIAL_VALUES,
  CHECKOUT_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Form from "./Form";
import Items from "./Items";

const Checkout = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const timerRef = useRef(null);
  const { cartItems } = useCartItemsStore.pick();
  const clearCart = useCartItemsStore.pickFrom();
  const [isSubmit, setIsSubmit] = useState(false);

  const { isLoading: isLoadingProducts } = useFetchCartProducts(
    keys(cartItems)
  );

  const { isLoading: isLoadingCountries } = useFetchCountries();

  const { mutate: createOrder } = useCreateOrder();

  const checkboxRef = useRef(null);
  const checkoutFormData = getFromLocalStorage(CHECKOUT_LOCAL_STORAGE_KEY);

  const redirectToHome = () => {
    timerRef.current = setTimeout(() => {
      history.push(routes.root);
      clearCart();
    }, 1500);
  };

  const handleRedirect = () => {
    if (timerRef.current) {
      history.push(routes.root);
      clearCart();
      clearTimeout(timerRef.current);
    } else {
      history.goBack();
    }
  };

  const handleSubmit = values => {
    const dataToPersist = checkboxRef.current.checked ? values : null;
    setIsSubmit(true);
    createOrder(
      { payload: values },
      {
        onSuccess: () => {
          setToLocalStorage(CHECKOUT_LOCAL_STORAGE_KEY, dataToPersist);
          redirectToHome();
        },
      },
      { onError: () => setIsSubmit(false) }
    );
  };
  const isLoadingState = isLoadingProducts || isLoadingCountries;
  if (isLoadingState) return <PageLoader />;

  if (isEmpty(cartItems)) return history.push(routes.root);

  return (
    <NeetoUIForm
      formProps={{ noValidate: true }}
      formikProps={{
        initialValues: checkoutFormData || CHECKOUT_FORM_INITIAL_VALUES,
        validationSchema: CHECKOUT_FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <div className="flex space-x-4">
        <div className="m-10 w-1/2">
          <div className="flex items-center">
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-4"
              onClick={handleRedirect}
            />
            <Typography
              className="text-left"
              component="u"
              style="h3"
              textTransform="uppercase"
              weight="bold"
            >
              {t("checkout")}
            </Typography>
          </div>
          <div className="mt-8 space-y-4">
            <Form />
            <Checkbox
              defaultChecked
              label={t("saveInformationForNextTime")}
              ref={checkboxRef}
            />
          </div>
        </div>
        <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
          <Items {...{ isSubmit }} />
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default withTitle(Checkout, i18n.t("checkout"));

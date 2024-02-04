import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { saveUserOrder } from "../services/user.service";


const OrderPageComponent = () => {
  const [redirectStatus, setRedirectStatus] = useState('');
  const [searchParams] = useSearchParams();
  const cart = useSelector(state => state.cartStore);

  useEffect(() => {
    //console.log(searchParams.get('redirect_status'));
    setRedirectStatus(searchParams.get('redirect_status'));
  }, [searchParams]);

  useEffect(() => {
    //console.log(cart);
    cart?.totalPrice && saveUserOrder({})
      .then((response) => {
        //debugger
      })
      .catch((error) => {
        //debugger
      })
      .finally(() => {
        //debugger
        //console.log('finally');
      })
  }, [cart]);

  const renderMsg = () => {
    if (!redirectStatus || redirectStatus !== 'succeeded') {
      return <p>Something went wrong with payment.</p>
    }
    return <p>Successfully bought products.</p>;
  }

  return (
    <>
      <h2>Order finalized</h2>
      {renderMsg()}
    </>
  )
}

export default OrderPageComponent;
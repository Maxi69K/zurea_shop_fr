import {loadStripe} from '@stripe/stripe-js';// for payments
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ShopService from '../services/shop.service';
import { toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import PaymentElementsComponent from '../components/payment/PaymentElements.Component';
const publicKey = 'pk_test_51NewRxFhcIRDjc4CeSCSVYWZAJat8U436lGyw5ygPekfTjUFg9YlSYaQSL4DizpPnO6bc767OZswFojvAyUnLVqE00iyI8oj9t';
const stripeObj = loadStripe(publicKey);


const PaymentPageComponent = () => {
    const [clientKey, setClientKey] = useState('');
    const totalPrice = useSelector((state) => state.cartStore.totalPrice);
    // TODO: add logic for switching curr in nav component
    let cur = 'usd';
    const stripeOption = {clientSecret: clientKey};

    useEffect(() => {
      console.log(clientKey);
    }, [clientKey]);

    useEffect(() => {
        console.log(totalPrice);
        totalPrice && ShopService.initPayment({amount: totalPrice, currency: cur})
            .then((response) => {
                console.log(response);
                setClientKey(response.data.client_secret);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error on init payment. Please try later.')
            });
    }, [totalPrice]);

  return (
    <>
    {
        clientKey && <Elements stripe = {stripeObj} options={stripeOption}>
            <PaymentElementsComponent clientKey={clientKey} />
        </Elements>
    }
    </>
  )
}

export default PaymentPageComponent;
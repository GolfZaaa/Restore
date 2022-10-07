import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import agent from '../../App/api/agent';
import LoadingComponent from '../../App/layout/LoadingComponent';
import { useAppDispatch } from '../../App/store/configureStore';
import { setBasket } from '../basket/basketSlice';
import CheckoutPage from './CheckoutPage';

//public key from stripe
const stripePromise = loadStripe('pk_test_51Lq9tnHqLDEEmBQ382e2xrcV3uQbL4hBb7fB3m8X0mcE5ks07uJ0K1XPYLRAff5MKGiCEUlVliG92SmN6JNc9LQs00N7zzHUnX')

export default function CheckoutWrapper() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    
    //สร้างหรืออัพเดทใบสั่งซื้อส่งไปยัง Stripe (incomplete)
    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [dispatch]);
    if (loading) return <LoadingComponent message='Loading checkout...' />

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  )
}

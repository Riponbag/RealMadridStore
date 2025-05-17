import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  // ✅ Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .required('Email is required')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter a valid email address'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipcode: Yup.string()
      .required('Zipcode is required')
      .matches(/^\d{4,10}$/, 'Enter a valid zipcode'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^\d{10,15}$/, 'Enter a valid phone number'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = async (formData) => {
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === productId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: { token },
          });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          toast.error('Unsupported payment method');
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t">
      {/* -------- Left -------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input {...register('firstName')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="First name" />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="w-full">
            <input {...register('lastName')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Last name" />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <input {...register('email')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email address" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register('street')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" />
          {errors.street && <p className="text-red-600 text-sm">{errors.street.message}</p>}
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input {...register('city')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" />
            {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
          </div>
          <div className="w-full">
            <input {...register('state')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" />
            {errors.state && <p className="text-red-600 text-sm">{errors.state.message}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input {...register('zipcode')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Zipcode" />
            {errors.zipcode && <p className="text-red-600 text-sm">{errors.zipcode.message}</p>}
          </div>
          <div className="w-full">
            <input {...register('country')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" />
            {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
          </div>
        </div>

        <div>
          <input {...register('phone')} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone" />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>
      </div>

      {/* -------- Right -------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

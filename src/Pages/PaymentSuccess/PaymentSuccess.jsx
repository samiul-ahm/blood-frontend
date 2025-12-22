import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const PaymentSuccess = () => {
    const [serachParam] = useSearchParams();
    const sessionId = serachParam.get('session_id');

    const axiosInstance = useAxios();

    useEffect(()=>{
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data);
        })
    },[axiosInstance, sessionId])

    return (
        <div className='max-w-4xl h-48 rounded-2xl shadow-2xl flex items-center justify-center mx-auto my-16 bg-cyan-600'>
            <h2 className='text-4xl font-bold'>You have successfully donated</h2>
        </div>
    );
};

export default PaymentSuccess;
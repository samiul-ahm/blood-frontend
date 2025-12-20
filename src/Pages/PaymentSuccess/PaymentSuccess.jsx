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
        <div>
            Success
        </div>
    );
};

export default PaymentSuccess;
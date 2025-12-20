import React, { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../provider/AuthProvider";

const Donate = () => {

  const axiosInstance = useAxios();
  const {user} = useContext(AuthContext);

  const handleCheckout = (e)=>{
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donarEmail = user?.email;
    const donarName = user?.name;

    const formData = {
      donarEmail,
      donarName,
      donateAmount,
    }

    axiosInstance.post('/create-payment-checkout', formData)
    .then(res=>{
      console.log(res.data);
    window.location.href = res.data.url;
    })
  }
  return (
    <div>
      <form onSubmit={handleCheckout} className="flex justify-center items-center mt-20 gap-4">
        <input name="donateAmount" type="text" placeholder="Type your amount here" className="input" />
        <button className="btn btn-primary" type="submit">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donate;

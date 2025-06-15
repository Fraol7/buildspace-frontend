import React from 'react'
import PaymentPopup from '@/pages/Common/payment-popup'

const PaymentPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <PaymentPopup 
        campaignTitle="Sample Campaign"
        amount={1000}
        buttonLabel="Make Payment"
      >
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Proceed to Payment
        </button>
      </PaymentPopup>
    </div>
  )
}

export default PaymentPage;
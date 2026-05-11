import { v4 as uuidv4 } from "uuid";

interface MockPaymentResponse {
  paymentRefId: string;
  orderId: string;
  status: string;
  redirectURL: string;
}

export const NagadService = {
  createPayment: async (amount: number, orderId: string, callbackURL: string): Promise<MockPaymentResponse> => {
    // Mocking Nagad create payment response
    const paymentRefId = `NAGAD_${uuidv4()}`;
    
    // Similarly, direct redirect to callback for mocking
    const redirectURL = `${callbackURL}?payment_ref_id=${paymentRefId}&status=Success`;

    return {
      paymentRefId,
      orderId,
      status: "Success",
      redirectURL,
    };
  },

  verifyPayment: async (paymentRefId: string): Promise<{ trxId: string; status: string; amount: number }> => {
    // Mocking Nagad verify payment response
    return {
      trxId: `TRX_${paymentRefId.substring(0, 8)}`,
      status: "Success",
      amount: 100, // mock amount
    };
  },
};

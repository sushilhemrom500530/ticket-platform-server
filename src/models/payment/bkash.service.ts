import { v4 as uuidv4 } from "uuid";

interface MockPaymentResponse {
  paymentID: string;
  createTime: string;
  orgLogo: string;
  orgName: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
  redirectURL: string;
}

export const BkashService = {
  createPayment: async (amount: number, invoiceNumber: string, callbackURL: string): Promise<MockPaymentResponse> => {
    // Mocking bKash create payment response
    const paymentID = `BKASH_${uuidv4()}`;
    
    // In a real implementation, this redirectURL would go to bKash's hosted payment page.
    // For our mock, we will redirect straight to the callbackURL but append some success query params.
    const redirectURL = `${callbackURL}?paymentID=${paymentID}&status=success`;

    return {
      paymentID,
      createTime: new Date().toISOString(),
      orgLogo: "bkash-logo.png",
      orgName: "Ticket Platform",
      transactionStatus: "Initiated",
      amount: amount.toString(),
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: invoiceNumber,
      redirectURL,
    };
  },

  executePayment: async (paymentID: string): Promise<{ trxID: string; status: string; amount: number }> => {
    // Mocking bKash execute payment response
    return {
      trxID: `TRX_${paymentID.substring(0, 8)}`,
      status: "Completed",
      amount: 100, // mock amount
    };
  },
};

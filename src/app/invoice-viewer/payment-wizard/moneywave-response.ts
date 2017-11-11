const ResponseMap: Map<string, string> = new Map();
const responseCodeMessageMap = [
    {
      code: "0",
      message: "Successful"
    },
    {
      code: "00",
      message: "Successful"
    },
    {
      code: "0-M",
      message: "Verification attempted"
    },
    {
      code: "0-Y",
      message: "Verification Successful"
    },
    {
      code: "RR-V",
      message: "Transaction already validated."
    },
    {
      code: "02",
      message: "Needs card Validation"
    },
    {
      code: "RR",
      message: "Transaction Failed. Detailed Message is included in response message"
    },
    {
      code: "2",
      message: "Declined"
    },
    {
      code: "7",
      message: "Card Declined due to invalid card data"
    },
    {
      code: "RR-T2",
      message: "Card not enrolled for safetoken, user should contact their bank"
    },
    {
      code: "XS0",
      message: "Authorization Failed due to connectivity issues with the bank"
    },
    {
      code: "B01",
      message: "Invalid BVN"
    },
    {
      code: "RR-51",
      message: "Insufficient Funds"
    },
    {
      code: "RR-R3",
      message: "CardToken is mandatory!"
    },
    {
      code: "RR-14",
      message: "Invalid Card Number"
    },
    {
      code: "RR-55",
      message: "Incorrect PIN"
    },
    {
      code: "R0",
      message: "Transaction Failed due to connectivity issues with the bank"
    },
    {
      code: "RR-E42",
      message: "Card Declined due to invalid card expiry"
    },
    {
      code: "RR-56",
      message: "No Card Record"
    },
    {
      code: "RR-2",
      message: "Card Declined"
    },
    {
      code: "RR-X04",
      message: "Transaction Amount too low"
    },
    {
      code: "RR-15",
      message: "Transaction error"
    },
    {
      code: "RR-7",
      message: "Card Declined due to invalid card security code"
    },
    {
      code: "RR-57",
      message: "Transaction not Permitted to Cardholder"
    },
    {
      code: "RR-04",
      message: "Pick-up card"
    },
    {
      code: "RR-Z8",
      message: "Payment Gateway currently does not accept your card type"
    },
    {
      code: "RR-91",
      message: "Bank or switch network error"
    },
    {
      code: "EEE",
      message: "An unexpected error occurred!"
    },
    {
      code: "RR-E18",
      message: "The service provider is unreachable at the moment, please try again later."
    },
    {
      code: "RR-E19",
      message: "An invalid response was received from remote host, see provider response code/message for details."
    },
    {
      code: "RR-E19",
      message: "An invalid response was received from remote host, please contact system administrator."
    },
    {
      code: "RR-E32",
      message: "JSON is badly formatted or it contains invalid character."
    },
    {
      code: "RR-E42",
      message: "Expiry Date cannot be empty"
    },
    {
      code: "RR-E57",
      message: "The PIN contains an invalid character"
    },
    {
      code: "RR-EE4",
      message: "Card Details could not be Retrieved!"
    },
    {
      code: "RR-R401",
      message: "Card has been blocked due to too many failed retries."
    },
    {
      code: "N-E",
      message: "Card not enrolled for 3DSecure"
    },
    {
      code: "BR0",
      message: "Timeout on BVN check"
    },
    {
      code: "RN0",
      message: "Invalid Account"
    }
   ];

responseCodeMessageMap.forEach(element => {
    ResponseMap.set(element.code, element.message);
})

export const MoneywaveResponse = ResponseMap;

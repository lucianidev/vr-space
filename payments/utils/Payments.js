const fetch = require("node-fetch");
const sdk = require('node-appwrite')
module.exports = class Payments {
  constructor(clientId, clientSecret, isProduction,) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.isProduction = isProduction;
    this.url = '';
    this.orderId = '';
    this.itemId = '',
    this.baseURL = {
      sandbox: "https://api-m.sandbox.paypal.com",
      production: "https://api-m.paypal.com"
    };
    this.base = this.isProduction ? this.baseURL.production : this.baseURL.sandbox;
    this.paymentId = ""
  };

  async #generateAccessToken() {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    console.log(auth);
    const tokenRequest = await fetch(`${this.baseURL.sandbox}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await tokenRequest.json();
    return data.access_token;
  }

  async #getOrderDetails(id) {
    const accessToken = await this.#generateAccessToken();
    const response = await fetch(`${this.base}/v2/checkout/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json();
    console.log(data);
    return data;
  }

  async CreatePayment() {
    const accessToken = await this.#generateAccessToken();
    console.log(accessToken);
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",

          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: `${this.amount}`,
              },   
          }
          ],
        }),
    });
    const data = await response.json();

    return data;
  }

  async capturePayment() {
    const accessToken = await this.#generateAccessToken();

    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();


    return data;
  }

  async sendPaymentToSeller(sellerEmail,amount) {
    const accessToken = await this.#generateAccessToken();
    console.log(amount);
    console.log(sellerEmail);
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },

      body : JSON.stringify({
        "items": [
        {
        "receiver": sellerEmail,
        "amount": {
        "currency": "USD",
        "value": amount,
        },
        "recipient_type": "EMAIL",
        "note": "Thanks for your patronage!",
        "recipient_wallet": "PAYPAL"
        }
        ],
        "sender_batch_header": {
        "email_subject": "You have a payout!",
        "email_message": "You have received a payout! Thanks for using our service!"
        }
        })
    });

    const data = await response;
    console.log(await data.json());
    return data;
  }

  async createTransactionRecord(client, productDetails) {
    const db = new sdk.Databases(client);
    console.log(this.orderId);
    const amount = (await this.#getOrderDetails(this.orderId)).purchase_units[0].amount.value; // apply platform fee
    console.log(amount); 
    await db.createDocument('649dfdee9174011b6657', '64b0340e88718d24eb1a', sdk.ID.unique(),{
      vendor : productDetails.email,
      amount : amount - 2,
      order_id : this.orderId,
    })
  }


  setUrl(url) {
    this.url = `${this.base}${url}`
    return this;
  }

  setOrderId(id) {
    this.orderId = id;
    return this;
  }

  setAmount(amount) {
    this.amount = amount;
    return this;
  }

  setitemId(id) {
    this.itemId = id;
    return this;
  }
}
var express = require('express');
var router = express.Router();
const sdk = require('node-appwrite');
const Payments = require('../utils/Payments');
const Email = require('../utils/Email');
const client = new sdk.Client();
client.setEndpoint('http://127.0.0.1:81/v1') // Your API Endpoint
  .setProject('648f118e178c4607ca18') // Your project ID
  .setKey('01e1b2e0b82768a977ed3970a891ee71d704ae7c4892b2d9da2aba0e46e27f16daa8125c063ca0b9a0035d4b0582c1aa04a2d798314317b40360876f75e5f8bf5b5918aea6a3eaac8b3bd4ae7f82e58199129b205139aea345c8511339ff9675240ad369f12f24ff422a1d164aa428f915567098e752be46a3748becbece67bc') // Your secret API key
  ;
const getProductdetails = async (id) => {
  try {
    const db = new sdk.Databases(client);
    const details = await db.getDocument("6492fa03477ec93ae650", "649c37a515560d0fd35f", id);
    return details;
  } catch (error) {
    throw new Error(error);
  }
};

const getTransactions = async () => {
  try {
    const db = new sdk.Databases(client);
    const transactions = await db.listDocuments('649dfdee9174011b6657',
      '64b0340e88718d24eb1a')
    return transactions.documents;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTransaction = async (id) => {
  try {
    const db = new sdk.Databases(client);
    await db.deleteDocument('649dfdee9174011b6657',
      '64b0340e88718d24eb1a', id)
  } catch (error) {
    throw new Error(error);
  }
}
const payment = new Payments('AU-sL3infZxD_5xBKmtNPEZDTe5_MKEgAOAe00k3-k0qWjdhfVZwo4AHt428r2gNJIaYlJRVp-9iUC4H', 'EP4TIrUku4mtParjl0s3DIs_pU8FwZIiX7fwAD4kSjTf17a3xKrERR3_l4n1wH5Y6kUqbrOuysLjO_s_', false)
const productEmail = new Email();

/* GET home page. */
router.post('/request', async (req, res,) => {
  const { id } = req.body;

  const price = (await getProductdetails(id)).price;
  const createPayment = await
    payment.
      setUrl('/v2/checkout/orders')
      .setAmount(price)
      .setitemId(id)
      .CreatePayment();

  res.json(createPayment)
});

router.post('/capture', async (req, res) => {
  const storage = new sdk.Storage(client);
  const { orderID, email } = req.body;
  const productDetails = await getProductdetails(payment.itemId);
  const productImages = Promise.all(productDetails.images_id.map((image) => {
     const rawImage = storage.getFileDownload('6499546407c2dc5f2d10', image);
    return Promise.resolve(rawImage)
  })).then(data => data);

  productEmail
    .setSubject(`${new Date()} bought product`)
    .setContent('you bought a product')
    .setReceiver(email)
    .setEmail('lucianidev@gmail.com')
    .setAttachements(await productImages)
    .setPassword('ickypxlashoohmju')
    .init()

  await productEmail.sendEmail();
  const captureData = await
    payment.
      setUrl(`/v2/checkout/orders/${orderID}/capture`)
      .setOrderId(orderID)
      .capturePayment()

  await payment.createTransactionRecord(client, productDetails);
  res.json(captureData);
});

router.post('/pay-sellers', async (req, res) => {
  const transactions = await getTransactions();
  transactions.forEach(async (transaction) => {
    await payment.
      setUrl('/v1/payments/payouts')
      .sendPaymentToSeller(transaction.vendor, transaction.amount);
    await deleteTransaction(transaction.$id);
  });
  res.status(200);
})

module.exports = router;

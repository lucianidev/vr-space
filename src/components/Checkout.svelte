<script>
  import { loadScript } from "@paypal/paypal-js";
  import { onMount } from "svelte";
  import { userState } from "../stores/userStores";
  import { get } from "svelte/store";
  export let id = "";

  const CLIENT_ID =
    "AU-sL3infZxD_5xBKmtNPEZDTe5_MKEgAOAe00k3-k0qWjdhfVZwo4AHt428r2gNJIaYlJRVp-9iUC4H";
  let payload = {
        id: id,
      };
  loadScript({
    clientId:
      "AU-sL3infZxD_5xBKmtNPEZDTe5_MKEgAOAe00k3-k0qWjdhfVZwo4AHt428r2gNJIaYlJRVp-9iUC4H",
  }).then((paypal) => {
    paypal
      .Buttons({
        style: {
          color: "gold",
          shape: "pill",
        },
        createOrder: async () => {
          // Set up the transaction
          console.log(payload);
          const request = await fetch(
            "http://127.0.0.1:3000/payments/request",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          const data = await request.json();
          return data.id;
        },
        onApprove: async (data, actions) => {
          const request = await fetch(
            "http://127.0.0.1:3000/payments/capture",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
                email : $userState.email,
              }),
            }
          );
          const captureData = await request.json();
          return captureData;
        },
        onError: (err) => {
          // Log error if something goes wrong during approval
          console.error(err);
        },
      })
      .render("#paypal-button-container");
  });
</script>

<div
  style="background-color:black; padding:5px; border-radius:5px;"
  id="paypal-button-container"
/>

<style>
  #paypal-button-container {
    margin: 30px 0;
  }
</style>

<script>
    import { onMount } from "svelte";
    import Carousel from "../components/Carousel.svelte";
    import { userState } from "../stores/userStores";
    import { postsStore } from "../stores/postsStore";

    export let params;
    let id = params.id;
    let productDetails = {};
    let images = [];
    onMount(async () => {
      await userState.isLogged();
      productDetails = postsStore.getProductDetail(id).then(data => data);
      images = (await productDetails).images_id;
    });
  </script>
  
  {#if $userState.isLogged}
    {#await productDetails}
    <div class="hero">
      <div class="hero-content flex-col lg:flex-row">
        <div>
          <h1 class="text-5xl font-bold">loading...</h1>
          <p class="py-6">loading...</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    {:then details} 
      <div class="hero">
        <div class="hero-content flex-col lg:flex-col">
          <Carousel images={images}></Carousel>
          <div class="my-5 grid w-full justify-start items-start">
            <h1 class="text-5xl font-bold">{details.title}</h1>
            <p class="mt-6">{details.description}</p>
            <h2 class="text-3xl font-bold mb-6">{details.price}$</h2>
            <button class="btn btn-primary">Buy</button>
          </div>
        </div>
      </div>
    {/await}
  {:else}
    <p>redirecting to signup</p>
  {/if}
  
  <style>
    p {
      white-space: initial;
    }
  </style>
<script>
  import { onMount } from "svelte";
  import Carousel from "../components/Carousel.svelte";
  import Checkout from "../components/Checkout.svelte";
  import { userState } from "../stores/userStores";
  import { postsStore } from "../stores/postsStore";

  export let params;
  let id = params.id;
  let productDetails = {};
  let images = [];

  onMount(async () => {
    await userState.isLogged();
    productDetails = postsStore.getProductDetail(id).then((data) => data);
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
    <section class="text-gray-700 body-font overflow-hidden h-full	">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col lg:flex-wrap">
          <Carousel {images} />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-stone-400 tracking-widest">
              {details.username}
            </h2>
            <h1 class="text-white	 text-3xl title-font font-medium mb-1">
              {details.title}
            </h1>
            <p class="leading-relaxed text-stone-400 my-1">
              {details.description}
            </p>
            <div class="title-font font-medium text-2xl text-slate-200 my-2">${details.price}</div>
            <Checkout id={params.id}></Checkout>
          </div>
        </div>
      </div>
    </section>
  {/await}
{:else}
  <p>redirecting to signup</p>
{/if}

<style>
</style>

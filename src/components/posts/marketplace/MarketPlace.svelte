<script>
  import router from "page"
  import Product from "./Product.svelte";
  import { postsStore } from "../../../stores/postsStore";
  import { userState } from "../../../stores/userStores";
  import { onMount } from "svelte";
  import Search from "../../Search.svelte";
  let username = "";
  let products = [];
  onMount(async () => {
    await userState.isLogged();
    username = await userState.getUserName();
    products = postsStore.listProducts().then(data => data);
  });
</script>

{#if $userState.isLogged}
<Search></Search>
<div class="p-4 sm:ml-64">
  <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-1">
    {#await products}
      <p>loading</p>
    {:then productsInfo}
      {#each productsInfo.filter(product => product.username != username) as product}
        <Product
          title={product.title}
          description={product.description}
          username={product.username}
          price={product.price}
          images={product.images_id}
          avatar={product.avatar}
          id={product.$id}
        />
      {/each}
    {/await}
  </div>
  </div>
</div>
{:else}
<p>rederecting....</p>
{/if}

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
    username = $userState.username;
    console.log(postsStore.listProducts().then(data => data));
    products = postsStore.listProducts().then(data => data);
  });
</script>

{#if $userState.isLogged}
<Search></Search>

    <div class="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-3">
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
{:else}
<p>rederecting....</p>
{/if}

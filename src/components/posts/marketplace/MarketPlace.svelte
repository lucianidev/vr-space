<script>
  import Product from "./Product.svelte";
  import { postsStore } from "../../../stores/postsStore";
  import { userState } from "../../../stores/userStores";
  import { onMount } from "svelte";
  import Search from "../../Search.svelte";
  let username = "";
  onMount(async () => {
    await userState.isLogged();
    username = await userState.getUserName();
  });

  const products = postsStore.listProducts();
</script>

{#if $userState.isLogged}
<Search></Search>
  <div
    class=" flex flex-col lg:grid place-items-center w-full gap-4 grid-cols-3"
  >
    {#await products}
      <p>loading</p>
    {:then productsInfo}
      {#each productsInfo.documents.filter((product) => product.username != username) as product}
        <Product
          title={product.title}
          description={product.description}
          username={product.username}
          price={product.price}
          images={product.images_id}
          avatar={product.avatar}
        />
      {/each}
    {/await}
  </div>
{:else}
  <p>logjn please</p>
{/if}

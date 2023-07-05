<script>
  import { onMount } from "svelte";
  import { searchStore } from "../stores/searchStore";
  import Search from "../components/Search.svelte";
  import User from "../components/User.svelte";
  import Product from "../components/posts/marketplace/Product.svelte";
  import { userState } from "../stores/userStores";
  export let params;
  let what = params.what;
  let where = params.where;
  let searchUsers = [];
  let productsByTitle = []
  let productsByTag = [];
  onMount(() => {
  searchUsers = searchStore.searchUsers(what).then(data => data);
  productsByTitle = searchStore.searchProductsByTitle(what).then(data => data);
  productsByTag = searchStore.searchProductsByTag(what).then(data => data);
  })
</script>
<Search />
<div class=" flex flex-col lg:grid place-items-center w-full gap-3 grid-cols-3" id="search">
  {#if where == "users"}
    {#await searchUsers}
      <p>loading...</p>
    {:then users}
      {#each users as user (user.$id)}
        <User username={user.username} avatardId={user.avatar_id} />
      {/each}
    {/await}
  {:else if where == "store"}
    {#await productsByTitle}
      <p>loading...</p>
    {:then products}
      {#each products.filter((product) => product.username != $userState.username) as product (product.$id)}
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
  {:else if where == "tags"}
    {#await productsByTag}
      <p>loading...</p>
    {:then products}
      {#each products.filter((product) => product.username != $userState.username) as product (product.$id)}
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
  {/if}
</div>

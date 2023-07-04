<script>
  import { searchStore } from "../stores/searchStore";
  import Search from "../components/Search.svelte";
  import User from "../components/User.svelte";
  import Product from "../components/posts/marketplace/Product.svelte";
  import { userState } from "../stores/userStores";
  export let what;
  export let where;
</script>

<Search />
<div class=" flex flex-col lg:grid place-items-center w-full gap-3 grid-cols-3">
  {#if where == "users"}
    {#await searchStore.searchUsers(what)}
      <p>loading...</p>
    {:then users}
      {#each users as user}
        <User username={user.username} avatardId={user.avatar_id} />
      {/each}
    {/await}
  {:else if where == "store"}
    {#await searchStore.searchProductsByTitle(what)}
      <p>loading...</p>
    {:then products}
      {#each products.filter((product) => product.username != $userState.username) as product}
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
    {#await searchStore.searchProductsByTag(what)}
      <p>loading...</p>
    {:then products}
      {#each products.filter((product) => product.username != $userState.username) as product}
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

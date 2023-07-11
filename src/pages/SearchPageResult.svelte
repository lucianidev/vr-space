<script>
  import router from "page"
  import { onMount } from "svelte";
  import { searchStore } from "../stores/searchStore";
  import Search from "../components/Search.svelte";
  import User from "../components/User.svelte";
  import Product from "../components/posts/marketplace/Product.svelte";
  import { userState } from "../stores/userStores";
  export let params;
  let what = params.what;
  let where = params.where;

  onMount(async () => {
    await userState.isLogged();
  });
</script>
{#if $userState.isLogged}
<div class=" flex flex-col lg:grid place-items-center w-full gap-3 grid-cols-3" id="search">
  {#if where == "users"}
    {#await searchStore.searchUsers(what)}
      <p>loading...</p>
    {:then users}
      {#each users as user (user.$id)}
        <User username={user.username} avatardId={user.avatar_id} />
      {/each}
    {/await}
  {:else if where == "store"}
    {#await searchStore.searchProductsByTitle(what)}
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
    {#await searchStore.searchProductsByTag(what)}
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
{:else}
<p>redirecting...</p>
{router.redirect('signup')}
{/if}
<Search />
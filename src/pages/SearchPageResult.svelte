<script>
  import router from "page";
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
<Search />
  <div class="p-4 sm:ml-64">

      <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
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
  </div>
{:else}
  <p>redirecting...</p>
{/if}


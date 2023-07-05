<script>
  import { onMount } from "svelte";
  import Message from "../components/posts/messages/Message.svelte";
  import Product from "../components/posts/marketplace/Product.svelte";
  import Avatar from "../components/Avatar.svelte";
  import { userState } from "../stores/userStores";
  import LoginForm from "../components/form/formVariations/LoginForm.svelte";
  import AvatarChange from "../components/form/formVariations/AvatarChange.svelte";
  let posts = [];
  let products = [];
  $: showPosts = true;
  onMount(async () => {
    await userState.isLogged();
    posts = userState.getCurrentUserPosts().then(data => data);
    products = userState.getCurrentuserProducts().then(data => data);
  });

</script>

{#if $userState.isLogged}
  <div class="grid place-items-center">
    <div class="flex flex-col lg: flex w-3/12 items-center justify-between">
      <Avatar size="48" avatarId={$userState.avatarId}/>
      <h1 class="text-2xl my-9">{$userState.username}</h1>
    </div>
    <div class="flex flex-col,my-9	 lg:grid place-items-center w-6/12 gap-4 grid-cols-2 my-9	">
      <h2 class="cursor-pointer hover:underline" on:click={() => (showPosts = true)}>POSTS</h2>
      <h2 class="cursor-pointer hover:underline" on:click={() => (showPosts = false)}>PRODUCTS</h2>
    </div>
    <div
      class="flex flex-col lg:grid place-items-center w-full gap-4 grid-cols-3"
    >
      {#if showPosts}
        {#await posts}
          <p>loading...</p>
        {:then userPosts}
          {#each userPosts as post}
            <Message
              username={post.username}
              title={post.title}
              message={post.description}
              image={post.image_id}
              avatar={post.avatar_id}
            >
            <div class="flex justify-center align-center">
              <img src="../../assets/heart.svg" alt=""> 
              <p>{post.likes}</p>
            </div>
          </Message>
          {/each}
        {/await}
      {:else}
        {#await products}
          <p>loading...</p>
        {:then userProducts}
          {#each userProducts as product}
            <Product
              title={product.title}
              description={product.description}
              username={product.username}
              price={product.price}
              images={product.images_id}
              avatar={product.avatar_id}
            />
          {/each}
        {/await}
      {/if}
      <div />
    </div>
  </div>
{:else}
  <p>redirecting to signup</p>
{/if}

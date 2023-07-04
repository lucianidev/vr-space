<script>
  import Message from "./messages/Message.svelte";
  import { onMount } from "svelte";
  import { userState } from "../../stores/userStores";
  import MessageOnFocus from "./messages/MessageOnFocus.svelte";
  import { postsStore } from "../../stores/postsStore";
  import Search from "../Search.svelte";

  let username = "";
  onMount(async () => {
    await userState.isLogged();
    username = await userState.getUserName();
  });

  const posts = postsStore.readPosts();
</script>

{#if $userState.isLogged}
<Search></Search>
  <div
    class=" flex flex-col lg:grid place-items-center w-full gap-4 grid-cols-3"
  >
    {#await posts}
      <p>loading</p>
    {:then postsInfo}
      {#each postsInfo.documents.filter(post => post.username != username) as post}
        <Message
          on:click={() => {
            postsStore.OnFocus(
              post.title,
              post.description,
              post.username,
              post.image_id,
              post.avatar_id,
              post.$id,
            );
          }}
          username={post.username}
          title={post.title}
          message={post.description}
          image={post.image_id}
          avatar={post.avatar_id}
        />
      {/each}
    {/await}
  </div>
  <MessageOnFocus />
{:else}
  <p>login my man, remeber router</p>
{/if}

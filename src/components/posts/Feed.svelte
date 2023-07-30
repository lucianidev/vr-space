<script>
  import router from "page";
  import Message from "./messages/Message.svelte";
  import { onMount } from "svelte";
  import { userState } from "../../stores/userStores";
  import MessageOnFocus from "./messages/MessageOnFocus.svelte";
  import Icons from "./Icons.svelte";
  import { postsStore } from "../../stores/postsStore";
  import Search from "../Search.svelte";

  let username = "";
  let posts = [];
  onMount(async () => {
    await userState.isLogged();
    username = $userState.username;
    posts = postsStore.readPosts().then((data) => data);
  });
</script>

{#if $userState.isLogged}
  <Search />

      <div class="grid grid-cols-1 place-items-center gap-4 mb-4 lg:grid-cols-3">
        {#await posts}
          <p>loading</p>
        {:then postsInfo}
          {#each postsInfo.filter((post) => post.username != username) as post}
            <Message
              on:click={() => {
                postsStore.OnFocus(
                  post.title,
                  post.description,
                  post.username,
                  post.image_id,
                  post.avatar_id,
                  post.$id
                );
              }}
              username={post.username}
              title={post.title}
              message={post.description}
              image={post.image_id}
              avatar={post.avatar_id}
            >
            <Icons></Icons>
          </Message>
          {/each}
        {/await}
      </div>
  <MessageOnFocus />
{:else}
  <p>rederecting....</p>
{/if}

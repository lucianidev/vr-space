<script>
  import { postsStore } from "../../../stores/postsStore";
  import { Storage, Client } from "appwrite";
  import Avatar from "../../Avatar.svelte";
  import Icons from "../Icons.svelte";

  const client = new Client();
  const storage = new Storage(client);
  client
    .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
    .setProject("648f118e178c4607ca18"); // Your project ID
  // i valori so reattivis
</script>
{#if $postsStore.image}
  <div class="grid place-items-center z-50">
    <div class="card w-4/12 bg-base-100 shadow-xl fixed">
      <div class="modal" class:modal-open={$postsStore.isOnFocus}>
        <div class="modal-box">
          <div class="card-body">
            <div class="avatar flex items-center justify-start">
              <Avatar avatarId={$postsStore.avatar} username={$postsStore.username} size="10"></Avatar>
              <p class="m-2">{$postsStore.username}</p>
            </div>
            <figure>
              <img
                src={postsStore.preview('6499546407c2dc5f2d10', $postsStore.image)}
                alt="Shoes"
              />
            </figure>
            <h2 class="card-title">{$postsStore.title}</h2>
            <p>{$postsStore.message}</p>
            <Icons></Icons>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="grid place-items-center z-50">
    <div class="card w-2/4 bg-base-100 shadow-xl fixed">
      <div class="modal" class:modal-open={$postsStore.isOnFocus}>
        <div class="modal-box">
          <div class="avatar flex items-center justify-start">
            <div class="w-10 rounded-full">
              <img
                src={
                postsStore.preview("649aee3bd70a6aa2cb34", $postsStore.avatar)}
              />
            </div>
            <p class="m-2">{$postsStore.username}</p>
          </div>
          <h3 class="font-bold text-lg">{$postsStore.title}</h3>
          <p class="py-4">{$postsStore.message}</p>
          <Icons />
        </div>
      </div>
    </div>
  </div>
{/if}


<svelte:window
  on:click={() => {
    postsStore.removeFocus();
  }}
/>


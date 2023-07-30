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

  console.log($postsStore.avatar);
</script>
{#if $postsStore.image}
  <div class="grid place-items-center z-50">
      <div class="modal" class:modal-open={$postsStore.isOnFocus}>
        <div class="card w-2/4 bg-black gradient-border rounded-2xl shadow-xl">
        <div class="modal-box">
          <div class="card-body bg-black gradient-border rounded-2xl shadow-xl">
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
  <div class="modal" class:modal-open={$postsStore.isOnFocus}>
    <div class="card w-full lg:w-2/4 ">
    <div class="modal-box bg-black gradient-border rounded-2xl shadow-xl">
      <div class="card-body">
        <div class="avatar flex items-center justify-start">
          <Avatar avatarId={$postsStore.avatar} username={$postsStore.username} size="10"></Avatar>
          <p class="m-2">{$postsStore.username}</p>
        </div>
        <h2 class="card-title">{$postsStore.title}</h2>
        <p>{$postsStore.message}</p>
        <Icons></Icons>
      </div>
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


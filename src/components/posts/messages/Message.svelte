<script>
      import { Client, Storage } from "appwrite";
      import {cutText} from "../../../utils/cutText"
      import { fade } from "svelte/transition"
  import Avatar from "../../Avatar.svelte";
  import { postsStore } from "../../../stores/postsStore";
  import Icons from "../Icons.svelte";
      export let title;
      export let message;
      export let username;
      export let image;
      export let avatar;
      const client = new Client();
      const storage = new Storage(client);

        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18");
      const imagePreview = storage.getFilePreview('6499546407c2dc5f2d10', image);
// create icons for actions

</script>

<div transition:fade on:click|stopPropagation class="card bg-black gradient-border rounded-2xl w-full shadow-xl">
  {#if image}
    <div class="card-body">
      <div class="flex items-center	justify-center">
        <Avatar avatarId={avatar} username={username} size="10"></Avatar>
        <p class="m-2 ">{username}</p>
      </div>
        <figure><img src={postsStore.preview('6499546407c2dc5f2d10', image)} alt="Shoes" /></figure>
      <h2 class="p-12 card-title gradient-text">{title}</h2>
      <p class="p-12">{message}</p>
      <Icons></Icons>
      <slot></slot>
    </div>

    {:else}
    <div class="card-body">
      <div class="avatar flex items-center	justify-start">
        <div class="w-10 rounded-full">
          <Avatar avatarId={avatar} username={username}></Avatar>
        </div>
        <p class="m-2 ">{username}</p>
      </div>
      <h2 class="card-title gradient-text">{title}</h2>
      <p>{cutText(message)}</p>
      <Icons></Icons>
      <slot></slot>
    </div>
  {/if}

</div>
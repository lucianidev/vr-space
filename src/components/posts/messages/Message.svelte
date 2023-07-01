<script>
      import { Client, Storage } from "appwrite";
      import {cutText} from "../../../utils/cutText"
      import { fade } from "svelte/transition"
  import Avatar from "../../Avatar.svelte";
      export let title;
      export let message;
      export let username;
      export let image;
      export let avatar;
      const client = new Client();
      const storage = new Storage(client);
      console.log(image)
        client
            .setEndpoint("http://127.0.0.1:81/v1") // Your API Endpoint
            .setProject("648f118e178c4607ca18");
      const imagePreview = storage.getFilePreview('6499546407c2dc5f2d10', image);
      const avatarPreview = storage.getFilePreview('649aee3bd70a6aa2cb34', avatar);


// create icons for actions

</script>

<div transition:fade on:click|stopPropagation class="card bg-base-100 w-full shadow-xl">
  {#if image}
    <div class="card-body">
      <div class="flex items-center	justify-start">
        <Avatar size="12" avatarId={avatar} username={username}></Avatar>
        <p class="m-2 ">{username}</p>
      </div>
        <figure><img src={imagePreview} alt="Shoes" /></figure>
      <h2 class="card-title">{title}</h2>
      <p>{cutText(message)}</p>
    </div>

    {:else}
    <div class="card-body">
      <div class="avatar flex items-center	justify-start">
        <div class="w-10 rounded-full">
          <img src={avatarPreview} />
        </div>
        <p class="m-2 ">{username}</p>
      </div>
      <h2 class="card-title">{title}</h2>
      <p>{cutText(message)}</p>
    </div>
  {/if}
</div>
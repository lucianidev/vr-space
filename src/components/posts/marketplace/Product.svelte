<script>
  import { fade } from "svelte/transition";
  import { postsStore } from "../../../stores/postsStore";
  import { cutText } from "../../../utils/cutText";
  import Button from "../../Button.svelte";
  import Carousel from "../../Carousel.svelte";
  import Avatar from "../../Avatar.svelte";

  export let title;
  export let description;
  export let username;
  export let price;
  export let images;
  export let avatar;
  export let id;
  export let showActions;
</script>

<div
  transition:fade
  on:click|stopPropagation
  class="card  gradient-border rounded-2xl w-full shadow-xl"
>
  <div class="card-body justify-between">
    <div class="flex items-center	justify-center">
        <Avatar avatarId={avatar} username={username} size={"small"}></Avatar>
      <p class="m-2">{username}</p>
      {#if showActions}
      <div class="dropdown dropdown-left">
        <label tabindex="0" class="btn m-1 bg-black">Options</label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Delete</a></li>
        </ul>
      </div>
    {/if}
    </div>
    <Carousel images={images}></Carousel>
    <div>
      <h2 class="card-title">{title}</h2>  
      <p>{description}</p>
      <div>{`${price}$`}</div>
    </div>
    <a class="btn btn-primary rounded-full" href={`/product/${id}`}>
      Buy
    </a>
  </div>
</div>

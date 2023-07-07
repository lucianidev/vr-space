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

</script>

<div
  transition:fade
  on:click|stopPropagation
  class="card bg-base-100 w-full shadow-xl"
>
  <div class="card-body">
    <div class="avatar flex items-center justify-start">
      <div class="w-10 rounded-full">
        <Avatar avatarId={avatar} username={username}></Avatar>
      </div>
      <p class="m-2">{username}</p>
    </div>
    <Carousel images={images}></Carousel>
    <h2 class="card-title">{title}</h2>  
    <p>{cutText(description)}</p>
    <p>{`${price}$`}</p>
    <a href={`/product/${id}`}>
      <Button insideText="buy"></Button>
    </a>
  </div>
</div>

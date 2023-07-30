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
  class="card  gradient-border rounded-2xl w-full shadow-xl"
>
  <div class="card-body justify-between">
    <div class="avatar flex items-center justify-start">
      <div class="w-10 rounded-full">
        <Avatar avatarId={avatar} username={username} size="10"></Avatar>
      </div>
      <p class="m-2">{username}</p>
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

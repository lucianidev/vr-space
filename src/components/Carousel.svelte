<script>
    import { postsStore } from "../stores/postsStore";
    export let images;
</script>


    <figure class="relative w-full">
  
      <!-- carousel -->
      <div class="carousel w-full h-full lg:h-full w-8/12">
        {#each images as imageId}
        <div id={`item-${imageId}`} class="carousel-item w-full">
            <img src={postsStore.preview('6499546407c2dc5f2d10', imageId)} class="w-full" />
          </div> 
        {/each}
      </div>
  
    </figure>
  
    <div class="flex justify-center w-full my-2 items-center">
      {#each images as id}
      <a href={`#item-${id}`} class="badge">•</a>
      {/each}
    </div>
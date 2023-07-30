<script>
    import { postsStore } from "../stores/postsStore";
    export let images;
</script>


    <figure class="relative w-full">
  
      <!-- carousel -->
      <div class="carousel w-full h-full lg:h-72 w-9/12">
        {#each images as imageId}
        <div id={`item-${imageId}`} class="carousel-item w-full">
            <img src={postsStore.preview('6499546407c2dc5f2d10', imageId)} class="w-full" />
          </div> 
        {/each}
      </div>
      <div class="flex justify-center w-full py-2 gap-2 absolute bottom-2 items-end">
        {#each images as id}
        <a href={`#item-${id}`} class="badge">•</a>
        {/each}
      </div>
  
    </figure>
  
<script>
    export let inputName = "";
    export let input;
    export let multiple;
</script>

<div class="form-control w-full max-w-xs" on:click>
  {#if multiple}
    <label for={inputName} class="label">
      <span id={inputName} class="label-text text-white">{inputName}:</span>
    </label>
    <input type="file" bind:value={input} on:change={(e) => input = e.target.files}
     class="file-input file-input-bordered file-input-primary w-full max-w-xs bg-black text-white"
     multiple/>
    {:else}
    <label for={inputName} class="label">
      <span id={inputName} class="label-text text-white">{inputName}:</span>
    </label>
    <input type="file" bind:value={input} on:change={(e) => input = e.target.files[0]}
     class="file-input file-input-bordered file-input-primary w-full max-w-xs bg-black text-white"
      />
    {/if}
</div>
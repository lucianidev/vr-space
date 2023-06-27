<script>
    export let input = "";
    export let inputName;
</script>

<div class="form-control w-full">
  <label for={inputName} class="label">
    <span class="label-text text-white">{inputName}:</span>
  </label>
  <input
    id={inputName}
    bind:value={input}
    type="password"
    placeholder="Type here"
    class="placeholder:text-white text-white input input-bordered w-full border-white rounded-lg bg-black"
  />
</div>

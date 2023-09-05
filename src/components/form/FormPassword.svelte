<script>
    export let input = "";
    export let inputName;
</script>

<div class="form-control w-full my-4">
  <label for={inputName} class="label">
    <span class="label-text text-white text-base">{inputName}:</span>
  </label>
  <input
    id={inputName}
    bind:value={input}
    type="password"
    placeholder="{inputName}..."
    class="placeholder:text-white text-white input input-bordered border-white rounded-lg bg-black"
  />
</div>

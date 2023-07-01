<script>
    export let action;
    export let formName = "";
</script>

<form class="grid place-items-center w-full" on:submit|preventDefault={action}>
    <div
      class="flex flex-col space-y-5 space-y-6 border-solid border-2 border-white w-full rounded-t-xl bg-form p-7 sm:w-5/12"
    >
      <h1 class="gradient-text text-2xl text-center">{formName}</h1>

        <slot></slot>
    </div>
  </form>
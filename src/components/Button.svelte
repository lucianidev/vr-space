<script>
    export let insideText;
    export let isContainigLink = false;
    export let link = "";
    export let type = "";
    export let action;
    let isButtonClicked = false;
    let currentVisibility;

    const disable = () => {
        const disabledClass = isButtonClicked ? "btn-disabled" : "";
        isButtonClicked = true;
        currentVisibility =  disabledClass;
};
</script>

<button class="btn btn-primary rounded-full my-3 {currentVisibility}" on:click={disable} on:click|preventDefault={action} type={type}>
    {#if isContainigLink}
        <a href={link}>{insideText}</a>
    {:else}
        {insideText}
    {/if}
</button>
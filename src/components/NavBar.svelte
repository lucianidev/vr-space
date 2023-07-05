<script>
  import { onMount } from "svelte";
  import { userState } from "../stores/userStores";
  import Avatar from "./Avatar.svelte";
  import Notifications from "./Notifications.svelte";


  onMount(async () => {
    await userState.isLogged();
  });
</script>

{#if $userState.isLogged}
  <nav class="navbar bg-black">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
        <li><a href="/">Feed</a></li>
        <li><a href="/marketplace">marketplace</a></li>
        </ul>
      </div>
      <a href="/dashboard" class="flex hover:underline">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">

              <Avatar size="10" avatarId={$userState.avatarId} username={$userState.username}></Avatar>
          </div>
        </label>
        <span class="p-3 normal-case text-xl center">{$userState.username}</span>
      </a>
    </div>
    <div class="navbar-center" />
    <div class="navbar-end">
      <Notifications></Notifications>
      <ul class="menu menu-horizontal px-1 hidden lg:flex">
        <li><a href="/">Feed</a></li>
        <li><a href="/marketplace">marketplace</a></li>
      </ul>
    </div>
  </nav>
{:else}
  <div class="navbar bg-black">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>About</a></li>
          <li><a>Features</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost gradient-text normal-case text-xl">VRSPACE</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a class="text-white">About</a></li>
        <li><a class="text-white">Features</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn rounded-full bg-primary text-white">Get started</a>
    </div>
  </div>
{/if}

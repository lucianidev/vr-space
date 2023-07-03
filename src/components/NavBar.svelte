<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import { userState } from "../stores/userStores";
  import Avatar from "./Avatar.svelte";


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
          <li><a>Feed</a></li>
          <li><a>Markeplace</a></li>
        </ul>
      </div>
      <Link to="/dashboard" class="flex hover:underline">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">

              <Avatar size="10" avatarId={$userState.avatarId} username={$userState.username}></Avatar>
          </div>
        </label>
        <span class="p-3 normal-case text-xl center">{$userState.username}</span>
    </Link>
    </div>
    <div class="navbar-center" />
    <div class="navbar-end">
      <div class="dropdown dropdown-left">
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              /></svg
            >
            <!--add color when notification is present, check daisy nav for info about the color-->
          </div>
        </button>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box"
        >
          <li><a>Sergio follows</a></li>
        </ul>
      </div>
      <ul class="menu menu-horizontal px-1 hidden lg:flex">
        <li><Link to="/">Feed</Link></li>
        <li><Link to="/marketplace">marketplace</Link></li>
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

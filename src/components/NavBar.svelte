<script>
  import { onMount } from "svelte";
  import { userState } from "../stores/userStores";
  import Avatar from "./Avatar.svelte";
  import Notifications from "./Notifications.svelte";

  let showNav = false;
  let translateX = '-translate-x-full';
  onMount(async () => {
    await userState.isLogged();
  });

  const interacttNav = () => {
    showNav = showNav ? false : true;
    translateX = showNav ? '-translate-x-full' : '';
  }

  let pages = [
    {
      title : 'links',
      link : 'http://127.0.0.1/markeplace',
      icon : '././assets/cart.svg',
    }
  ]

  // implements loop with links
</script>

{#if $userState.isLogged}

  <nav class="flex justify-end items-center bg-gray-50 dark:bg-gray-800">
    <aside id="default-sidebar" class="{translateX} fixed top-16 left-0 z-40 w-64 h-screen transition-transform lg:translate-x-0" on:click={() => interacttNav()} aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
         <ul class="space-y-2 font-medium">
          {#each pages as page}
            <li>
              <a href={page.link} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={page.icon} alt="">
                <span class="ml-3">{page.title}</span>
              </a>
          </li>
          {/each}
         </ul>
      </div>
    </aside>

    <div class="p-4">
      <Notifications></Notifications>
      <Avatar size={10} avatarId={$userState.avatarId} username={$userState.username}>
        <span class="m-1 text-xl">{$userState.username}</span>
      </Avatar>


      <button data-drawer-target="default-sidebar" on:click={() => interacttNav()} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
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
      <a href="/signup" class="btn rounded-full bg-primary text-white">Get started</a>
    </div>
  </div>
{/if}

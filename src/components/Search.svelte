<script>
    import { Link ,navigate } from "svelte-routing";
let searchSubject = "";
$ : show = false;
</script>

<div class="w-full flex justify-center items-center flex-col my-5">
    <div class="form-control items-center justify-center w-full lg:w-6/12">
        <div class="input-group justify-center items-center">
          <input type="text" placeholder="Search…" bind:value={searchSubject} on:click={show = true} class="input input-bordered w-full" />
          <button class="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
    
      {#if searchSubject.length >= 1 && show == true}

      <ul class="flex flex-col justify-center items-center w-full">
          <li class="flex justfiy-start items-center cursor-pointer p-5 bg-base-100 w-full lg:w-6/12 hover:bg-slate-800" on:click={() => searchSubject = ""}>
            <Link class="flex" to={`/search/users/${searchSubject}`}>
                <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span class="hover:underline">search {searchSubject} in users</span>
            </Link>
          </li>

          <li class="flex justfiy-start items-cente cursor-pointer p-5 bg-base-100 w-full lg:w-6/12 hover:bg-slate-800" on:click={() => searchSubject = ""}>
            <Link class="flex" to={`/search/store/${searchSubject}`}>
                <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>
                <span class="hover:underline">search {searchSubject} in marketplace</span>
            </Link>
        </li>   
        
        <li class="flex justfiy-start items-cente cursor-pointer p-5 bg-base-100 w-full lg:w-6/12 hover:bg-slate-800" on:click={() => searchSubject = ""}>
          <Link class="flex" to={`/search/tags/${searchSubject}`}>
            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            <span class="hover:underline">search {searchSubject} by category</span>
          </Link>
      </li>   
    </ul>
      {/if}
</div>


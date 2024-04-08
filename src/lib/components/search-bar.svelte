<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const engines: SearchEngine[] = [
    { id: 'DuckDuckGo', icon: 'icons/duckduckgo-4.svg', url: 'https://duckduckgo.com/?q='},
    { id: 'Google', icon: 'icons/google.svg', url: 'https://www.google.com/search?q=' },
    { id: 'Brave', icon: 'icons/brave.png', url: 'https://brave.com/search?q=' },];
  const dispatch = createEventDispatcher();

  interface SearchEngine {
    id: string;
    icon?: string;
    url: string;
  }
  $: selectedEngine = engines[0];


  function selectEngine(engine: SearchEngine): void 
  {
    selectedEngine = engine;
  }

  function handleSearch(): void {
    const searchBar = document.getElementById('sb') as HTMLInputElement;
    if(searchBar === null || searchBar === undefined) return;
    const searchText = searchBar.value;
    window.open(selectedEngine.url + searchText, '_blank');
  }

  onMount(() => {
    document.querySelector('.search-bar').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  });
</script>

<div class="search-container">
  <button class="dropdown-btn"><img src="{selectedEngine.icon}" width="16px" height="16px" alt="search"></button>
  <div class="dropdown-content">
    {#each engines as engine}
        <button class="dropdown-item" on:mousedown={() => selectEngine(engine)}>
          <img src="{engine.icon}" width="16px" height="16px" alt="{engine.id}"> - {engine.id}
        </button>
    {/each}
  </div>
  <input class="search-bar" id="sb" type="text" placeholder="Search...">
  <button type="submit" on:click={handleSearch}><img src="icons/mag-glass.svg" width="20px" height="20px" alt="search"></button>
</div>

<style>
  .search-bar{
    min-width: 400px;
  }

  .search-container {
    display: flex;
    position: relative;
  }

  .dropdown-btn {
    background-color: #f1f1f1;
    color: black;
    padding: 10px;
    font-size: 8px;
    border: none;
    cursor: pointer;
  }

  .dropdown-btn:hover {
    background-color: #ddd;
  }

  .dropdown-content {
    display: grid;
    position: absolute;
    background-color: #181818;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    scale: 0;
    transition: scale 0.3s ease
  }

  .dropdown-content button {
    cursor: pointer;
    padding: 5px;
    background-color: #181818;
    color: wheat;
  }

  .dropdown-content button:hover {
    background-color: rgb(63, 63, 63);
  }

  .dropdown-btn:focus + .dropdown-content {
    scale: 1;
    transition: scale 0.3s ease;
  }
</style>
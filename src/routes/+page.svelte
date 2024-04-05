<script>
    import SearchBar from '$lib/components/search-bar.svelte';
    import ImageAscii from '$lib/components/image-ascii.svelte';
    import Timezones from '$lib/components/timezones.svelte';
    import WeatherCard from '$lib/components/weather-card.svelte';
</script>


<div class="grid-container">
    <div class="image grid-item"><ImageAscii /></div>
    <div class="search-bar grid-item"><SearchBar /></div>
    <div class="grid-item item-border"><WeatherCard /></div>
    <div class="grid-item item-border"><Timezones /></div>
</div>


<style>
    :global(body) {
    background-color: black;
    color: white;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr; /* Two equal-width columns */
      grid-template-rows: auto auto; /* Two auto-height rows */
      justify-items: center; /* Center content horizontally */
      align-content: center; /* Center content vertically */
      gap: 1rem; /* Gap between grid items */
    }

    .image {
      grid-column: 1 / span 2; /* Span two columns */
    }

    .search-bar {
      grid-column: 1 / span 2; /* Span two columns */
    }

    .grid-item {
      /* Your item styles here */
      text-align: center;
    }

    .item-border{
        border: 1px solid white;
        padding: 1rem;
    }
</style>
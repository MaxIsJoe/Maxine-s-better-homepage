<script lang="ts">
    import SearchBar from '$lib/components/search-bar.svelte';
    import ImageAscii from '$lib/components/image-ascii.svelte';
    import Timezones from '$lib/components/timezones.svelte';
    import WeatherCard from '$lib/components/weather-card.svelte';
    import Settings from '$lib/components/settings.svelte';
    import { rainbowMode, backgroundImg, textColor, fontType, blurryCardMode, blurryCardBgColorTop, blurryCardBgColorBot } from '$lib/stores.js';
    let img = '';
    let txtColor = 'white';

    backgroundImg.subscribe((value) => {
      img = value;
      console.log(img)
    })
    textColor.subscribe((value) => {
      txtColor = value;
      console.log(txtColor)
    })
</script>

<head>
  <meta name="title" content="Maxine's Better Homepage">
  <meta name="description" content="A homepage created after I got bored of my current one on firefox, and me not finding a better alternative.">
  <meta name="keywords" content="homepage, search, world-clock, weather">
  <meta name="robots" content="index, follow">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="language" content="English">
  <meta name="author" content="MaxIsJoe">
  <title>Maxine's Better Homepage</title>
</head>

<Settings />
<div class="grid-container" style="background-image: url({$backgroundImg}); color: {txtColor}; font-family: {$fontType};" class:rainbow-mode={$rainbowMode} class:rainbow-text={$rainbowMode}>
    <div class="image grid-item"><ImageAscii /></div>
    <div class="search-bar grid-item"><SearchBar /></div>
    <div class="grid-item item-border" style="--card-background-color: linear-gradient({$blurryCardBgColorTop}, {$blurryCardBgColorBot})" class:blurrycard={$blurryCardMode}><WeatherCard /></div>
    <div class="grid-item item-border" style="--card-background-color: linear-gradient({$blurryCardBgColorTop}, {$blurryCardBgColorBot})" class:blurrycard={$blurryCardMode}><Timezones /></div>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Reddit+Mono:wght@200..900&display=swap');
    :global(body) {
    background-color: black;
    color: white;
    }
    

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      justify-items: center;
      align-content: center;
      gap: 1rem;
    }

    .image {
      grid-column: 1 / span 2;
    }

    .search-bar {
      grid-column: 1 / span 2;
    }

    .grid-item {
      text-align: center;
    }

    .item-border{
        border: 1px solid white;
        padding: 1rem;
    }
    @keyframes rainbow {
        0% { color: rgb(0, 174, 255); }
        20% { color: white; }
        60% { color: pink; }
        100% { color: rgb(0, 174, 255); }
    }

    .rainbow-text {
        animation: rainbow 12s infinite;
    }

    .rainbow-mode .rainbow-text {
        animation: rainbow 12s infinite;
    }

    .blurrycard {
        background: var(--card-background-color);
    }
</style>
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment'
    
    let location: string = '';
    let apiKey: string = '';
    let weatherData: any = null;
    let errorMessage: string = 'cow';
  
    async function fetchWeather() 
    {
      try 
      {
        console.log(`Fetching weather data for ${location} with API key ${apiKey}`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) 
        {
          throw new Error('Unable to fetch weather data:\n' + response.statusText);
        }
        const data = await response.json();
        console.log(data)
        weatherData = data;
        errorMessage = '';
      } catch (error) {
        errorMessage = error.message;
        weatherData = null;
      }
    }
  
    async function submitForm(event: Event) 
    {
      event.preventDefault();
      await fetchWeather();
      if (weatherData) 
      {
        localStorage.setItem('selectedLocation', location);
        localStorage.setItem('apiKey', apiKey);
      }
    }
  
    onMount( ()=> 
    {
        location = browser && localStorage.getItem('selectedLocation') || 'Cairo';
        apiKey = browser && localStorage.getItem('apiKey') || '';
        fetchWeather();
    });
  
    onDestroy(() => {
        browser && localStorage.setItem('selectedLocation', location);
        browser && localStorage.setItem('apiKey', apiKey);
    });
</script>

<div class="weather-card">
    <div class="weather-data">
        {#if weatherData}
            <div>
            <h2>Weather in {weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            ----
            <p>Temperature: {weatherData.main.temp}°C - FL: {weatherData.main.feels_like}°C</p>
            <p>Humidity: {weatherData.main.humidity}</p>
            <p>Wind: {weatherData.wind.speed}m/h -- {weatherData.wind.deg}°</p>
            <p>Visibility: {weatherData.visibility} meters</p>
            <p>Clouds: {weatherData.clouds.all}%</p>
            </div>
        {:else if errorMessage}
            <p>{errorMessage}</p>
        {/if}
    </div>
    
    <form on:submit={submitForm}>
        <input type="text" bind:value={location} placeholder="Enter location" />
        <input type="text" bind:value={apiKey} placeholder="Enter API key" />
        <button type="submit">Get Weather</button>
    </form>
    <p style="font-size: 12px;" class="hover-opacity-half">Powered by <a href="https://openweathermap.org/">OpenWeatherMap</a></p>
</div>

  
<style>
    .weather-data {
        display: flex;
        justify-content: center;
        margin: auto 0px;
    }

    .weather-card{
        justify-content: center;
        margin: auto 0px;
    }

    .hover-opacity-half {
        opacity: 0.1;
        transition: opacity 0.3s ease;
    }

    .hover-opacity-half:hover {
        opacity: 1;
    }
</style>
<script lang="ts">
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import moment from 'moment-timezone';

    let selected: Timezone;
    interface Timezone {
      name: string;
      offset: number;
    }
    const timezones: Timezone[] = moment.tz.names().map(name => ({ name, offset: moment.tz.zone(name)!.utcOffset(Date.now()) / 60 }));
    const selectedTimezones: Writable<Timezone[]> = writable([
    { name: 'Cairo', offset: -2, time: getTimeInZone(-2) }, // Default timezone for Cairo
    { name: 'New York', offset: 4, time: getTimeInZone(4) }, // Default timezone for California
    { name: 'Tokyo', offset: -9, time: getTimeInZone(-9) }, // Default timezone for Japan
    { name: 'Singapore', offset: -8, time: getTimeInZone(-8) } // Default timezone for Spain
  ]);
    function addTimezone(timezone: Timezone): void 
    {
      selectedTimezones.update(timezones => [...timezones, timezone]);
      console.log(timezone.offset)
    }

    function removeTimezone(index: number): void 
    {
      selectedTimezones.update(timezones => timezones.filter((_, i) => i !== index));
    }

    function getTimeInZone(offset: number): string 
    {
        const now = new Date();
        const localOffset = now.getTimezoneOffset() * 60000;
        const targetOffset = offset * 3600000;
        const timeZoneDifference = targetOffset - localOffset;
        const targetTime = now.getTime() + timeZoneDifference;
        const targetDate = new Date(targetTime);
        return targetDate.toLocaleTimeString();
    }

    setInterval(() => 
    {
        const updatedTimezones = $selectedTimezones.map(timezone => ({ ...timezone, time: getTimeInZone(timezone.offset) }));
        selectedTimezones.set(updatedTimezones);
    }, 1000)
</script>
  
<div>
    <h2>Timezones</h2>
    <div class="timezone-cards">
      {#each $selectedTimezones as timezone, index}
        <div class="card">
            <h2>{timezone.name}</h2>
            <p>{getTimeInZone(timezone.offset)}</p>
            <button on:click={() => removeTimezone(index)}>Remove</button>
        </div>
      {/each}
    </div>
    <select bind:value="{selected}">
      {#each timezones as tz}
        <option value="{tz}">{tz.name}</option>
      {/each}
    </select>
    <button on:click={() => addTimezone(selected)}>Add Timezone</button>
</div>
  

<style>
    .card {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
  }

  .timezone-cards
  {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two items in each row */
    gap: 1rem;
    justify-items: center; 
  }
</style>
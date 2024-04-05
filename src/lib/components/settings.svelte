<script>
    import { rainbowMode, toggleRainbowMode, 
        measurementMode, toggleMeasurementMode, setBackgroundImg, setTextColor, setFontType } from '$lib/stores.js';
    let sidebarOpen = false;

    const fonts = [
        'Arial',
        'Times New Roman',
        'Helvetica',
        'Times',
        'Verdana',
        'Comic Sans MS',
        'Trebuchet MS',
        'Impact',
        'Georgia',
        'Sitka',
        'Reddit Mono',
        'Quicksand',
    ]
  
    function toggleSidebar() 
    {
      sidebarOpen = !sidebarOpen;
    }

    function settingsRainbowMode() 
    {
        toggleRainbowMode();
        console.log($rainbowMode)
    }

    function updateMeasurementMode(event) 
    {
        toggleMeasurementMode(event.target.value);
        console.log("settings change" + $measurementMode)
    }

    function handleImageUpload(event) 
    {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file) 
        {
            reader.readAsDataURL(file);
        }
        reader.onload = () => 
        {
            setBackgroundImg(reader.result);
        };
    }

    function clearBackgroundImg()
    {
        setBackgroundImg('');
    }

    function selectColor(color)
    {
        setTextColor(color.target.value);
    }

    function selectFont(font)
    {
        setFontType(font.target.value);
    }
</script>

<div class="settings-container">
    <div class="{`sidebar ${sidebarOpen ? 'open' : ''}`}">
        <button on:click={settingsRainbowMode}>
            {$rainbowMode ? "Disable Rainbow Mode" : "Enable Rainbow Mode"}
        </button>
        <div>
            <label for="temperatureUnit">Temperature Unit:</label>
            <select id="temperatureUnit" on:change={updateMeasurementMode}>
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
                <option value="kelvin">Kelvin</option>
            </select>
        </div>
        <div>
            <label for="background-image-set">Background Image:</label>
            <input type="file" accept="image/*" on:change={handleImageUpload}>
            <button on:click={clearBackgroundImg}>Clear Background Image</button>
        </div>
        <div>
            <label for="select-color">Select Text Color:</label>
            <input type="color" on:input={change => selectColor(change)}>
        </div>
        <div>
            <label for="select-font">Select Font:</label>
            <select id="select-font" on:change={selectFont}>
                {#each fonts as font}
                    <option value="{font}"><div style="font-family: {font};">{font}</div></option>
                {/each}
            </select>
        </div>
    </div>
    <div class="{`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}">
        <button class="toggle-button" on:click={toggleSidebar}>
        <img src="icons/settings-cog.svg" width="20px" height="20px" alt="settings">
        </button>
    </div>
</div>

<style>
    .settings-container {
        position: absolute;
    }
    .sidebar {
        width: 200px;
        height: 100%;
        background-color: rgb(26, 26, 26);
        position: fixed;
        top: 0;
        left: -200px;
        transition: left 0.3s ease-in-out;
    }
  
    .sidebar.open {
        left: 0;
    }
  
    .main-content {
        margin-left: 0;
        transition: margin-left 0.3s ease-in-out;
    }
  
    .main-content.sidebar-open {
        margin-left: 200px;
    }
  
    .toggle-button {
        top: 10px;
        right: -40px;
        cursor: pointer;
        z-index: 999;
    }
</style>

  
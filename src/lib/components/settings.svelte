<script>
    import { rainbowMode, toggleRainbowMode, toggleMeasurementMode, setBackgroundImg,
        setTextColor, setFontType, toggleCardBlurMode, textColor, 
        blurryCardMode, setblurryCardBgColorBottom, setblurryCardBgColorTop, blurryCardBgColorTop, blurryCardBgColorBot, 
        backgroundCoverSetting, setbackgroundCoverSetting, disableAsciiArt } from '$lib/stores.js';
    import { onMount } from 'svelte';
    import ColorPicker, { A11yVariant } from 'svelte-awesome-color-picker';

    let sidebarOpen = false;
	let hexFont
	let hexTop
	let hexBot

    onMount(() => 
    {
        hexFont = $textColor
        hexTop = $blurryCardBgColorTop
        hexBot = $blurryCardBgColorBot
    });

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
    }

    function updateMeasurementMode(event) 
    {
        toggleMeasurementMode(event.target.value);
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

    function selectFontColor(color)
    {
        setTextColor(color.detail.hex);
    }

    function selectFont(font)
    {
        setFontType(font.target.value);
    }

    function changeBlurryCardMode(mode)
    {
        toggleCardBlurMode()
    }

    function setBackgroundBlurColor(color, top)
    {
        if(top)
        {
            setblurryCardBgColorTop(color.detail.hex)
        }
        else
        {
            setblurryCardBgColorBottom(color.detail.hex)
        }
    }

    function selectBackgroundSizeSetting(setting)
    {
        setbackgroundCoverSetting(setting.target.value);
    }
</script>

<div class="settings-container">
    <div class="{`sidebar ${sidebarOpen ? 'open' : ''}`}">
        <div>
            <h3>Background Settings</h3>
            <div>
                <label for="background-image-set">Background Image:</label>
                <input type="file" accept="image/*" on:change={handleImageUpload}>
                <button on:click={clearBackgroundImg}>Clear Background Image</button>
            </div>
            <div>
                <label for="bg-size-control">Background Size:</label>
                <select id="bg-size-control" bind:value={$backgroundCoverSetting} on:change={selectBackgroundSizeSetting}>
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="100% 100%">100%</option>
                </select>
            </div>
            <div>
                <label for="blurry-card-setting">Blur background for cards:</label>
                <input type="checkbox" id="blurry-card-setting" on:change={changeBlurryCardMode} bind:checked={$blurryCardMode}>
            </div>
            {#if $blurryCardMode}
            <div>
                <ColorPicker components={A11yVariant} label="Choose Top Background Color" bind:hex={hexTop} isDark={true} on:input={(change) => {setBackgroundBlurColor(change, true)}} a11yColors={[
                    { textHex: '#FFF', reverse: true, placeholder: 'background' },
                    { textHex: '#FFF', bgHex: '#FF0000', reverse: true, placeholder: 'background' },
                    { bgHex: '#FFF', placeholder: 'title', size: 'large' },
                    { bgHex: '#7F7F7F', placeholder: 'button' }
                ]} />
                <ColorPicker components={A11yVariant} label="Choose Bottom Background Color" bind:hex={hexBot} isDark={true} on:input={(change) => {setBackgroundBlurColor(change, false)}} a11yColors={[
                    { textHex: '#FFF', reverse: true, placeholder: 'background' },
                    { textHex: '#FFF', bgHex: '#FF0000', reverse: true, placeholder: 'background' },
                    { bgHex: '#FFF', placeholder: 'title', size: 'large' },
                    { bgHex: '#7F7F7F', placeholder: 'button' }
                ]} />
            </div>
            {/if}
        </div>
        <hr>
        <div>
            <h3>Text Settings</h3>
            <div>
                <label for="select-font">Select Font:</label>
                <select id="select-font" on:change={selectFont}>
                    {#each fonts as font}
                        <option value="{font}"><div style="font-family: {font};">{font}</div></option>
                    {/each}
                </select>
            </div>
            <div>
                <ColorPicker components={A11yVariant} label="Choose Font Color" bind:hex={hexFont} isDark={true} on:input={(change) => {selectFontColor(change)}} a11yColors={[
                    { textHex: '#FFF', reverse: true, placeholder: 'background' },
                    { textHex: '#FFF', bgHex: '#FF0000', reverse: true, placeholder: 'background' },
                    { bgHex: '#FFF', placeholder: 'title', size: 'large' },
                    { bgHex: '#7F7F7F', placeholder: 'button' }
                ]} />
            </div>
        </div>
        <hr>
        <div>
            <h3>Preferences</h3>
            <div>
                <label for="temperatureUnit">Temperature Unit:</label>
                <select id="temperatureUnit" on:change={updateMeasurementMode}>
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                    <option value="kelvin">Kelvin</option>
                </select>
            </div>
            <div>
                <label for="disable-asscii">Disable ASCII:</label>
                <input type="checkbox" id="disable-asscii" on:change={change => disableAsciiArt.update(u => !u)} bind:checked={$disableAsciiArt}>
            </div>
        </div>
        <hr>
        <div>
            <h3>Misc Settings</h3>
            <button on:click={settingsRainbowMode}>
                {$rainbowMode ? "Disable Rainbow Mode" : "Enable Rainbow Mode"}
            </button>
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
        position: relative;
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
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;
        margin-left: 0px;
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

    .dark {
		--cp-bg-color: #333;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
    }
</style>

  
<!-- ImageToAscii.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import { browser } from "$app/environment"

  let asciiArt: string = "";
  const lastUploadedImage = writable<string | null>(browser && localStorage.getItem("lastUploadedImage") || "/icons/mij-icon.svg");
  $: maxAsciiSize = 35;

  onMount(() => 
  {
    lastUploadedImage.subscribe((savedImage) => 
    {
      if (savedImage) 
      {
        console.log("Saved image found. Generating ASCII art...");
        generateAscii(savedImage);
      }
    });

    const savedImage = $lastUploadedImage;
    if (savedImage) 
    {
      generateAscii(savedImage);
    }
    else
    {
      console.log("No saved image found.");
    }
  });

  function generateAscii(savedImage: string | null) 
  {
    if(savedImage == null) return;
    const img: HTMLImageElement = new Image();
    img.onload = () => 
    {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData: Uint8ClampedArray | null = ctx.getImageData(0, 0, img.width, img.height).data;
        if (imageData) 
        {
          asciiArt = convertToAscii(imageData, img, maxAsciiSize, maxAsciiSize);
        }
      }
    };
    img.src = savedImage;
  }

  const handleImageUpload = (): void => 
  {
    const fileReader: FileReader = new FileReader();
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    fileReader.onload = () => 
    {
      const img: HTMLImageElement = new Image();
      img.onload = () => 
      {
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData: Uint8ClampedArray | null = ctx.getImageData(0, 0, img.width, img.height).data;
          if (imageData) 
          {
            asciiArt = convertToAscii(imageData, img, 125, 125);
            lastUploadedImage.set(fileReader.result as string);
          }
        }
      };

      img.src = fileReader.result as string;
      localStorage.setItem("lastUploadedImage", img.src);
      lastUploadedImage.set(img.src);
    };

    const file: File | null = document.getElementById("imageInput")?.files?.[0];
    if (file) 
    {
      fileReader.readAsDataURL(file);
    }
  };

  function convertToAscii(imageData: Uint8ClampedArray, img: HTMLImageElement, maxWidth: number, maxHeight: number): string 
  {
    const asciiChars: string[] = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."];
    let asciiStr: string = "";

    const aspectRatio: number = img.height / img.width;
    const newHeight: number = Math.min(maxHeight, Math.round(maxWidth * aspectRatio));
    const stepX: number = Math.ceil(img.width / maxWidth);
    const stepY: number = Math.ceil(img.height / newHeight);

    for (let y = 0; y < newHeight; y++) 
    {
      for (let x = 0; x < maxWidth; x++) 
      {
        const pixelIndex: number = (y * stepY * img.width + x * stepX) * 4;
        if (pixelIndex < imageData.length) {
          const avg: number = (imageData[pixelIndex] + imageData[pixelIndex + 1] + imageData[pixelIndex + 2]) / 3;
          const index: number = Math.floor(avg / 25.5);
          asciiStr += asciiChars[index];
        } else {
          //asciiStr += " ";
        }
      }
      asciiStr += "\n";
    }
    return asciiStr;
  };
</script>

<style>
  pre {
    white-space: pre-wrap;
  }
  input{
    overflow: hidden;
  }

  .ascii-controls {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .ascii-controls:hover {
    opacity: 1;
  }
</style>


<pre>{asciiArt}</pre>
<div class="ascii-controls">
  <input type="file" id="imageInput" accept="image/*" on:change={handleImageUpload}>
  <button on:click={() => {maxAsciiSize++; ; generateAscii($lastUploadedImage)}}>+</button>
  <button on:click={() => {maxAsciiSize--; generateAscii($lastUploadedImage)}}>-</button>
  <div style="font-size: 12px;">{maxAsciiSize}px</div>
</div>

<script lang="ts">
  import { enhance } from "$app/forms"
  import { writable } from "svelte/store"
  import { calculateShipping } from "$lib/components/shared/shipping/shipping-calc"

  let { data, form } = $props()
  let apiResponse = writable("")
  let shippingResult = writable("")

  let zip = "90038"
  let weight = 10

  let messages = $state([])
  let inputMessage = $state("")
  let chatContainer
  let selectedImage = $state(null)

  $effect(() => {
    if (chatContainer && messages.length) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  })

  async function addToCart() {
    try {
      const response = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalCost: form.result.totalCost,
          formData: data.formData,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      apiResponse.set(JSON.stringify(result, null, 2)) // Use store's set method
      console.log("Add to Cart Result:", result)
    } catch (error) {
      apiResponse.set(`Error: ${error.message}`)
      console.error("Error:", error)

      // Log the response text for debugging
      if (error instanceof SyntaxError) {
        const responseText = await response.text()
        console.error("Response Text:", responseText)
      }
    }
  }

  function handleShippingCalculation() {
    const result = calculateShipping(zip, weight)
    shippingResult.set(result)
  }

  async function handleChatSubmit() {
    if (!inputMessage.trim() && !selectedImage) return

    console.log("Submitting chat with image:", !!selectedImage)

    const userMessage = inputMessage
    messages = [
      ...messages,
      {
        text: selectedImage
          ? `<div>${userMessage}<br><img src="${selectedImage}" class="max-w-xs rounded-lg mt-2" /></div>`
          : userMessage,
        isUser: true,
      },
    ]
    inputMessage = ""
    const imageToSend = selectedImage
    selectedImage = null

    try {
      messages = [...messages, { text: "Thinking...", isUser: false }]

      console.log("Sending request with payload:", {
        message: userMessage,
        hasImage: !!imageToSend,
        quoteData: {
          formData: data.formData,
          quoteResult: form?.result,
        },
      })

      const response = await fetch("/quoteChat/api/chatGPT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          image: imageToSend,
          quoteData: {
            formData: data.formData,
            quoteResult: form?.result,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const result = await response.json()

      // Replace thinking message with actual response
      messages = messages.slice(0, -1)
      messages = [...messages, { text: result.response, isUser: false }]
    } catch (error) {
      console.error("Chat error:", error)
      messages = messages.slice(0, -1)
      messages = [
        ...messages,
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
        },
      ]
    }
  }

  async function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file) {
      console.log("File selected:", file.name, file.type)

      const reader = new FileReader()
      reader.onload = (e) => {
        selectedImage = e.target?.result as string
        console.log(
          "Image converted to base64:",
          selectedImage?.substring(0, 50) + "...",
        )
      }
      reader.readAsDataURL(file)
    }
  }
</script>

<div class="container mx-auto p-4">
  <form
    method="POST"
    use:enhance
    class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto"
  >
    <div class="form-group">
      <label for="quantity" class="label">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={data.formData.quantity}
        required
        class="input input-bordered"
      />
    </div>

    <div class="form-group">
      <label for="width" class="label">Width (inches):</label>
      <input
        type="number"
        id="width"
        name="width"
        value={data.formData.width}
        step="0.125"
        required
        class="input input-bordered"
      />
    </div>

    <div class="form-group">
      <label for="height" class="label">Height (inches):</label>
      <input
        type="number"
        id="height"
        name="height"
        value={data.formData.height}
        step="0.125"
        required
        class="input input-bordered"
      />
    </div>

    <div class="form-group">
      <label for="paperType" class="label">Paper Type:</label>
      <select
        id="paperType"
        name="paperType"
        value={data.formData.paperType}
        required
        class="select select-bordered"
      >
        <option value="Satin">Satin</option>
        <option value="Satin AQ">Satin AQ</option>
        <option value="Uncoated Textured">Uncoated Textured</option>
        <option value="Uncoated">Uncoated</option>
      </select>
    </div>

    <div class="form-group">
      <label for="paperWeight" class="label">Paper Weight:</label>
      <select
        id="paperWeight"
        name="paperWeight"
        value={data.formData.paperWeight}
        required
        class="select select-bordered"
      >
        <option value="100lb Text">100lb Text</option>
        <option value="80lb Cover">80lb Cover</option>
        <option value="100lb Cover">100lb Cover</option>
        <option value="120lb Cover">120lb Cover</option>
      </select>
    </div>

    <div class="form-group">
      <label for="frontPrinting" class="label">Front Printing:</label>
      <select
        id="frontPrinting"
        name="frontPrinting"
        value={data.formData.frontPrinting}
        required
        class="select select-bordered"
      >
        <option value="Color">Color</option>
        <option value="Grayscale">Grayscale</option>
      </select>
    </div>

    <div class="form-group">
      <label for="backPrinting" class="label">Back Printing:</label>
      <select
        id="backPrinting"
        name="backPrinting"
        value={data.formData.backPrinting}
        class="select select-bordered"
      >
        <option value="None">None</option>
        <option value="Color">Color</option>
        <option value="Grayscale">Grayscale</option>
      </select>
    </div>

    <div class="form-group">
      <label for="zip" class="label">ZIP Code:</label>
      <input
        type="text"
        id="zip"
        bind:value={zip}
        required
        class="input input-bordered"
      />
    </div>

    <div class="form-group">
      <label for="weight" class="label">Weight (lbs):</label>
      <input
        type="number"
        id="weight"
        bind:value={weight}
        required
        class="input input-bordered"
      />
    </div>

    <div class="col-span-1 md:col-span-2">
      <button type="submit" class="btn btn-primary w-full"
        >Calculate Quote</button
      >
      <button
        type="button"
        onclick={addToCart}
        class="btn btn-secondary w-full mt-2">Add to Cart</button
      >
      <button
        type="button"
        onclick={handleShippingCalculation}
        class="btn btn-secondary w-full mt-2">Calculate Shipping</button
      >
    </div>
  </form>

  {#if form?.success}
    <div class="alert alert-success mt-4">
      <h2 class="font-bold">Quote Results</h2>
      <p>Total Cost: ${form.result.totalCost}</p>
      <p>Sheets Needed: {form.result.sheetsNeeded}</p>
      <p>Cost Per Sheet: ${form.result.costPerSheet}</p>
      <p>Paper Cost: ${form.result.paperCost}</p>
      <p>Printing Cost: ${form.result.printingCost}</p>
      <p>Setup Cost: ${form.result.setupCost}</p>
      <p>Slots Per Sheet: {form.result.slotsPerSheet}</p>
    </div>
  {/if}

  {#if $apiResponse}
    <div class="alert alert-info mt-4">
      <h3 class="font-bold">API Response</h3>
      <pre>{$apiResponse}</pre>
    </div>
  {/if}

  {#if $shippingResult}
    <div class="alert alert-info mt-4">
      <h3 class="font-bold">Shipping Calculation Result</h3>
      <pre>{$shippingResult}</pre>
    </div>
  {/if}

  <pre class="mt-4">
    Current form values:
    Quantity: {data.formData.quantity}
    Width: {data.formData.width}
    Height: {data.formData.height}
    Paper Type: {data.formData.paperType}
    Paper Weight: {data.formData.paperWeight}
    Front Printing: {data.formData.frontPrinting}
    Back Printing: {data.formData.backPrinting}
  </pre>

  <!-- Chat Interface -->
  <div class="mb-8 bg-base-100 rounded-lg shadow-xl p-4 max-w-2xl mx-auto mt-8">
    <h2 class="text-2xl font-bold mb-4">Chat with our Quote Assistant</h2>

    <!-- Chat messages -->
    <div
      bind:this={chatContainer}
      class="h-[400px] overflow-y-auto mb-4 p-4 bg-purple-50 rounded-lg"
    >
      {#each messages as message}
        <div class="mb-4 {message.isUser ? 'text-right' : 'text-left'}">
          <div
            class="inline-block p-3 rounded-lg {message.isUser
              ? 'bg-purple-700 text-white'
              : 'bg-white text-purple-900 border border-purple-100'}"
          >
            {@html message.text}
          </div>
        </div>
      {/each}
    </div>

    <!-- Chat input -->
    <form
      onsubmit={(e) => {
        e.preventDefault()
        handleChatSubmit()
      }}
      class="flex flex-col gap-2"
    >
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={inputMessage}
          placeholder="Ask about your quote..."
          class="input input-bordered flex-1"
        />

        <!-- Add image upload button -->
        <label class="btn btn-circle btn-ghost">
          <input
            type="file"
            accept="image/*"
            onchange={handleImageUpload}
            class="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </label>

        <button
          type="submit"
          class="btn btn-primary"
          disabled={!inputMessage.trim() && !selectedImage}
        >
          Send
        </button>
      </div>

      <!-- Preview selected image -->
      {#if selectedImage}
        <div class="relative inline-block mt-2">
          <img src={selectedImage} alt="Selected" class="max-h-32 rounded-lg" />
          <button
            type="button"
            class="absolute top-1 right-1 btn btn-circle btn-xs btn-error"
            onclick={() => (selectedImage = null)}
          >
            ×
          </button>
        </div>
      {/if}
    </form>
  </div>
</div>

<style>
  /* Additional custom styles if needed */
  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>

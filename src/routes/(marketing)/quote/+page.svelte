<script lang="ts">
  import { enhance } from "$app/forms"
  import { writable } from "svelte/store"
  import { calculateShipping } from "$lib/shipping/shipping-calc"

  let { data, form } = $props()
  let apiResponse = writable("")
  let shippingResult = writable("")

  let zip = ""
  let weight = 0

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
</div>

<style>
  /* Additional custom styles if needed */
</style>

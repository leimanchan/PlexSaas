<script lang="ts">
  import { enhance } from "$app/forms"
  let { data, form } = $props()

  // Helper function for getting custom attributes
  function getAttributeValue(
    attributes: any[],
    key: string,
    defaultValue = "",
  ) {
    if (!Array.isArray(attributes)) return defaultValue
    const attribute = attributes.find((attr) => attr.key === key)
    return attribute ? attribute.value : defaultValue
  }
</script>

<div class="container mx-auto p-4">
  <form method="POST" action="?/getOrder" use:enhance class="mb-8">
    <div class="mb-4">
      <label for="orderId" class="block text-sm font-medium text-gray-700">
        Order ID
      </label>
      <input
        type="text"
        id="orderId"
        name="orderId"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter order number"
      />
    </div>

    <button type="submit" class="btn btn-primary"> Look up Order </button>
  </form>

  {#if form?.success && form.orderData}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Original Order Details -->
      <div class="bg-base-200 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">
          Original Order #{form.orderData.name}
        </h2>
        <div class="space-y-2">
          <p>
            <span class="font-medium">Order Date:</span>
            {new Date(form.orderData.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span class="font-medium">Total Cost:</span>
            {getAttributeValue(
              form.orderData.lineItems.edges[0].node.customAttributes,
              "Expected production cost (not including tax or shipping):",
              "$0.00",
            )}
          </p>
          <p>
            <span class="font-medium">Deposit Paid:</span>
            ${form.orderData.lineItems.edges[0].node.originalUnitPrice}
          </p>
          <p>
            <span class="font-medium">Quantity:</span>
            {form.formData.quantity}
          </p>
          <p>
            <span class="font-medium">Size:</span>
            {form.formData.width}" × {form.formData.height}"
          </p>
          <p>
            <span class="font-medium">Paper Type:</span>
            {form.formData.paperType}
          </p>
          <p>
            <span class="font-medium">Paper Weight:</span>
            {form.formData.paperWeight}
          </p>
          <p>
            <span class="font-medium">Front Printing:</span>
            {form.formData.frontPrinting}
          </p>
          <p>
            <span class="font-medium">Back Printing:</span>
            {form.formData.backPrinting}
          </p>
        </div>
      </div>

      <!-- Quote Form -->
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Calculate New Quote</h2>
        <form
          method="POST"
          action="?/calculateQuote"
          use:enhance
          class="space-y-4"
        >
          <div class="form-control">
            <label class="label" for="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={form.formData.quantity}
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label" for="width">Width (inches)</label>
            <input
              type="number"
              id="width"
              name="width"
              value={form.formData.width}
              step="0.125"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label" for="height">Height (inches)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={form.formData.height}
              step="0.125"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label" for="paperType">Paper Type</label>
            <select
              id="paperType"
              name="paperType"
              value={form.formData.paperType}
              class="select select-bordered"
              required
            >
              <option value="Satin">Satin</option>
              <option value="Satin AQ">Satin AQ</option>
              <option value="Uncoated Textured">Uncoated Textured</option>
              <option value="Uncoated">Uncoated</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="paperWeight">Paper Weight</label>
            <select
              id="paperWeight"
              name="paperWeight"
              value={form.formData.paperWeight}
              class="select select-bordered"
              required
            >
              <option value="100lb Text">100lb Text</option>
              <option value="80lb Cover">80lb Cover</option>
              <option value="100lb Cover">100lb Cover</option>
              <option value="120lb Cover">120lb Cover</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="frontPrinting">Front Printing</label>
            <select
              id="frontPrinting"
              name="frontPrinting"
              value={form.formData.frontPrinting}
              class="select select-bordered"
              required
            >
              <option value="Color">Color</option>
              <option value="Grayscale">Grayscale</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="backPrinting">Back Printing</label>
            <select
              id="backPrinting"
              name="backPrinting"
              value={form.formData.backPrinting}
              class="select select-bordered"
            >
              <option value="None">None</option>
              <option value="Color">Color</option>
              <option value="Grayscale">Grayscale</option>
            </select>
          </div>

          <div class="space-y-2">
            <button type="submit" class="btn btn-primary w-full">
              Calculate Quote
            </button>
            {#if form?.quoteResult}
              <button
                type="button"
                class="btn btn-secondary w-full"
                on:click={() => createDraftOrder()}
              >
                Create Draft Order
              </button>
            {/if}
          </div>
        </form>
      </div>
    </div>

    {#if form?.quoteResult}
      <div class="alert alert-success">
        <h3 class="font-bold">Quote Results</h3>
        <p>Total Cost: ${form.quoteResult.totalCost}</p>
        <p>Sheets Needed: {form.quoteResult.sheetsNeeded}</p>
        <p>Cost Per Sheet: ${form.quoteResult.costPerSheet}</p>
        <p>Paper Cost: ${form.quoteResult.paperCost}</p>
        <p>Printing Cost: ${form.quoteResult.printingCost}</p>
        <p>Setup Cost: ${form.quoteResult.setupCost}</p>
        <p>Slots Per Sheet: {form.quoteResult.slotsPerSheet}</p>
      </div>
    {/if}
  {:else if form?.error}
    <div class="alert alert-error">
      <p>{form.error}</p>
    </div>
  {/if}
</div>

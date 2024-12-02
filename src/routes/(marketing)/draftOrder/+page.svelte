<script lang="ts">
  import { enhance } from "$app/forms"
  let { form } = $props()

  // Change const to let since we'll be reassigning the value
  let originalFormData = $state(null)

  $effect(() => {
    if (form?.success && form.orderData && !originalFormData) {
      originalFormData = { ...form.formData }
    }
  })

  // Helper function for getting custom attributes
  function getAttributeValue(
    attributes: unknown[],
    key: string,
    defaultValue = "",
  ) {
    if (!Array.isArray(attributes)) return defaultValue
    const attribute = attributes.find((attr) => attr.key === key)
    return attribute ? attribute.value : defaultValue
  }

  // Add this state variable to control the display
  let showComparison = $state(false)

  // Client-side handler instead of form submission
  function handleCompare(e: Event) {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)

    // Update form.formData with the current values
    form.formData = {
      quantity: formData.get("quantity"),
      width: formData.get("width"),
      height: formData.get("height"),
      paperType: formData.get("paperType"),
      paperWeight: formData.get("paperWeight"),
      frontPrinting: formData.get("frontPrinting"),
      backPrinting: formData.get("backPrinting"),
    }

    showComparison = true
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
            {originalFormData?.quantity}
          </p>
          <p>
            <span class="font-medium">Size:</span>
            {originalFormData?.width}" × {originalFormData?.height}"
          </p>
          <p>
            <span class="font-medium">Paper Type:</span>
            {originalFormData?.paperType}
          </p>
          <p>
            <span class="font-medium">Paper Weight:</span>
            {originalFormData?.paperWeight}
          </p>
          <p>
            <span class="font-medium">Front Printing:</span>
            {originalFormData?.frontPrinting}
          </p>
          <p>
            <span class="font-medium">Back Printing:</span>
            {originalFormData?.backPrinting}
          </p>
          <p>
            <span class="font-medium">Customer ID:</span>
            {form.orderData.customer.id}
          </p>
          <p>
            <span class="font-medium">Customer Name:</span>
            {form.orderData.customer.displayName}
          </p>
          <p>
            <span class="font-medium">Customer Email:</span>
            {form.orderData.customer.email}
          </p>
        </div>
      </div>

      <!-- Quote Form -->
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Calculate New Quote</h2>
        <form on:submit={handleCompare} class="space-y-4">
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
              Compare Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    {#if showComparison}
      <div class="grid grid-cols-2 gap-8">
        <!-- Original Data -->
        <div class="alert alert-info">
          <h3 class="font-bold">Original Order Data</h3>
          <p>Quantity: {originalFormData?.quantity}</p>
          <p>Size: {originalFormData?.width}" × {originalFormData?.height}"</p>
          <p>Paper Type: {originalFormData?.paperType}</p>
          <p>Paper Weight: {originalFormData?.paperWeight}</p>
          <p>Front Printing: {originalFormData?.frontPrinting}</p>
          <p>Back Printing: {originalFormData?.backPrinting}</p>
        </div>

        <!-- New Form Data -->
        <div class="alert alert-success">
          <h3 class="font-bold">New Form Data</h3>
          <p>Quantity: {form.formData.quantity}</p>
          <p>Size: {form.formData.width}" × {form.formData.height}"</p>
          <p>Paper Type: {form.formData.paperType}</p>
          <p>Paper Weight: {form.formData.paperWeight}</p>
          <p>Front Printing: {form.formData.frontPrinting}</p>
          <p>Back Printing: {form.formData.backPrinting}</p>
        </div>
      </div>
    {/if}
  {:else if form?.error}
    <div class="alert alert-error">
      <p>{form.error}</p>
    </div>
  {/if}
</div>

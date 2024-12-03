<script lang="ts">
  import { enhance } from "$app/forms"
  let { form } = $props()

  // Initialize state variables with proper structure
  let originalFormData = $state(null)
  let quoteResult = $state(null)
  let newFormData = $state({
    quantity: "",
    width: "",
    height: "",
    paperType: "",
    paperWeight: "",
    frontPrinting: { method: "" },
    backPrinting: { method: "" },
  })

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
  async function handleCompare(e: Event) {
    e.preventDefault()
    const formElement = e.target as HTMLFormElement
    const formData = new FormData(formElement)

    try {
      const response = await fetch("?/calculateQuote", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      console.log("Response data:", data)

      if (data.success) {
        // Update newFormData with proper structure
        newFormData = {
          quantity: formData.get("quantity"),
          width: formData.get("width"),
          height: formData.get("height"),
          paperType: formData.get("paperType"),
          paperWeight: formData.get("paperWeight"),
          frontPrinting: { method: formData.get("frontPrinting") },
          backPrinting: { method: formData.get("backPrinting") },
        }

        // Force a new object creation for reactivity
        quoteResult = {
          totalCost: data.result.totalCost,
          sheetsNeeded: data.result.sheetsNeeded,
          costPerSheet: data.result.costPerSheet,
          paperCost: data.result.paperCost,
          printingCost: data.result.printingCost,
          frontPrintingCost: data.result.frontPrintingCost,
          backPrintingCost: data.result.backPrintingCost,
          setupCost: data.result.setupCost,
          slotsPerSheet: data.result.slotsPerSheet,
        }

        console.log("Updated state:", {
          newFormData,
          quoteResult,
        })
      }
    } catch (error) {
      console.error("Error calculating quote:", error)
    }
  }

  // Debug effect to monitor state changes
  $effect(() => {
    console.log("State changed:", {
      newFormData,
      quoteResult,
    })
  })
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
          Original Order {form.orderData.name}
        </h2>
        <div class="space-y-2">
          <p>
            <span class="font-medium">Order Date:</span>
            {new Date(form.orderData.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span class="font-medium">Original Estimated Total Cost:</span>
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
        <form
          method="POST"
          action="?/calculateQuote"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === "success") {
                newFormData = result.data.formData
                quoteResult = result.data.result
              }
            }
          }}
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
              Compare Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <div class="grid grid-cols-2 gap-8 mt-8">
    <!-- Debug Section -->
    <div class="col-span-2 mb-4 p-4 bg-base-200 rounded">
      <h3 class="font-bold mb-2">Debug Data:</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h4 class="font-semibold">Quote Data:</h4>
          <pre class="text-sm whitespace-pre-wrap bg-base-300 p-2 rounded">
            {JSON.stringify(newFormData, null, 2) || "No form data yet"}
          </pre>
        </div>
        <div>
          <h4 class="font-semibold">Quote Result:</h4>
          <pre class="text-sm whitespace-pre-wrap bg-base-300 p-2 rounded">
            {JSON.stringify(quoteResult, null, 2) || "No quote result yet"}
          </pre>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="font-semibold">Raw State:</h4>
        <pre class="text-sm whitespace-pre-wrap bg-base-300 p-2 rounded">
          newFormData: {newFormData ? "exists" : "null"}
          quoteResult: {quoteResult ? "exists" : "null"}
        </pre>
      </div>
    </div>

    <!-- Original Data -->
    <div class="alert alert-info">
      <h3 class="font-bold">Original Order Data</h3>
      <p>Quantity: {originalFormData?.quantity || ""}</p>
      <p>
        Size: {originalFormData?.width || ""}" × {originalFormData?.height ||
          ""}"
      </p>
      <p>Paper Type: {originalFormData?.paperType || ""}</p>
      <p>Paper Weight: {originalFormData?.paperWeight || ""}</p>
      <p>Front Printing: {originalFormData?.frontPrinting || ""}</p>
      <p>Back Printing: {originalFormData?.backPrinting || ""}</p>
    </div>

    <!-- New Quote Data -->
    <div class="alert alert-success">
      <h3 class="font-bold">New Quote</h3>
      <div class="space-y-2">
        <p>Quantity: {newFormData?.quantity || ""}</p>
        <p>Size: {newFormData?.width || ""}" × {newFormData?.height || ""}"</p>
        <p>Paper Type: {newFormData?.paperType || ""}</p>
        <p>Paper Weight: {newFormData?.paperWeight || ""}</p>
        <p>Front Printing: {newFormData?.frontPrinting || ""}</p>
        <p>Back Printing: {newFormData?.backPrinting || ""}</p>

        <div class="mt-4 border-t pt-4">
          <h4 class="font-bold">Quote Details:</h4>
          <p class="text-lg font-bold">
            Total Cost: ${quoteResult?.totalCost || "0.00"}
          </p>
          {#if form?.orderData?.lineItems?.edges[0]?.node?.originalUnitPrice}
            <p class="text-lg font-bold text-primary">
              Original Deposit: ${form.orderData.lineItems.edges[0].node
                .originalUnitPrice}
            </p>
            <p class="text-lg font-bold">
              Remaining Balance: ${(
                quoteResult?.totalCost -
                form.orderData.lineItems.edges[0].node.originalUnitPrice
              ).toFixed(2) || "0.00"}
            </p>
          {/if}
          <div class="text-sm mt-2 space-y-1">
            <p>Sheets Needed: {quoteResult?.sheetsNeeded || "0"}</p>
            <p>Cost Per Sheet: ${quoteResult?.costPerSheet || "0.00"}</p>
            <p>Paper Cost: ${quoteResult?.paperCost || "0.00"}</p>
            <p>Printing Cost: ${quoteResult?.printingCost || "0.00"}</p>
            <p>Setup Cost: ${quoteResult?.setupCost || "0.00"}</p>
            <p>Slots Per Sheet: {quoteResult?.slotsPerSheet || "0"}</p>
          </div>
          {#if quoteResult && form?.orderData}
            <button
              class="btn btn-primary mt-4"
              on:click={async () => {
                try {
                  const remainingBalance =
                    quoteResult.totalCost -
                    form.orderData.lineItems.edges[0].node.originalUnitPrice
                  const payload = {
                    customerId: form.orderData.customer.id,
                    remainingBalance,
                    formData: newFormData,
                    originalOrderData: form.orderData,
                  }

                  console.log("Sending payload:", payload)

                  const response = await fetch(
                    "/draftOrder/api/createDraftOrder",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(payload),
                    },
                  )

                  if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(JSON.stringify(errorData))
                  }

                  const result = await response.json()
                  console.log("Draft order created:", result)
                } catch (error) {
                  console.error("Error creating draft order:", error)
                }
              }}
            >
              Create Draft Order
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

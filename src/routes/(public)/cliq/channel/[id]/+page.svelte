<script lang="ts">
  import type { PageData } from "./$types"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  export let data: PageData

  // Date range options
  let selectedRange = $page.url.searchParams.get("range") || "5days"
  let customStartDate = $page.url.searchParams.get("start") || ""
  let customEndDate = $page.url.searchParams.get("end") || ""

  // Handle filter submission
  function applyFilters() {
    const url = new URL(window.location.href)
    url.searchParams.set("range", selectedRange)
    if (selectedRange === "custom") {
      if (customStartDate) url.searchParams.set("start", customStartDate)
      if (customEndDate) url.searchParams.set("end", customEndDate)
    } else {
      url.searchParams.delete("start")
      url.searchParams.delete("end")
    }
    goto(url.toString())
  }

  async function downloadFile(url: string, filename: string) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Download failed")

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      a.remove()
    } catch (error) {
      console.error("Error downloading file:", error)
      alert("Failed to download file")
    }
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex items-center gap-4 mb-6">
    <a href="/cliq" class="btn btn-ghost">← Back to Channels</a>
    <h1 class="text-2xl font-bold">{data.channel?.name || "Channel"}</h1>
  </div>

  <!-- Date Range Filters -->
  <div
    class="flex flex-wrap items-center gap-4 mb-6 bg-base-200 p-4 rounded-lg"
  >
    <select bind:value={selectedRange} class="select select-bordered">
      <option value="all">All Time</option>
      <option value="5days">Last 5 Days</option>
      <option value="month">Last Month</option>
      <option value="custom">Custom Range</option>
    </select>

    {#if selectedRange === "custom"}
      <div class="flex flex-wrap items-center gap-4">
        <input
          type="date"
          bind:value={customStartDate}
          class="input input-bordered"
          placeholder="Start Date"
        />
        <span>to</span>
        <input
          type="date"
          bind:value={customEndDate}
          class="input input-bordered"
          placeholder="End Date"
        />
      </div>
    {/if}

    <!-- Apply Filters Button -->
    <button class="btn btn-primary" on:click={applyFilters}>
      Apply Filters
    </button>

    <!-- Show count of messages -->
    <div class="ml-auto text-sm">
      Showing {data.messages.length} messages
    </div>
  </div>

  {#if data.error}
    <div class="alert alert-error">
      {data.error}
    </div>
  {/if}

  {#if data.messages.length > 0}
    <div class="space-y-4">
      {#each data.messages as message}
        <div class="card bg-base-200">
          <div class="card-body">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <p class="font-semibold">{message.sender.name}</p>
                <p class="whitespace-pre-wrap">{message.content}</p>

                <!-- Display Image -->
                {#if message.image}
                  <div class="mt-2">
                    <img
                      src={message.image.url}
                      alt={message.image.name}
                      class="rounded-lg max-h-96 object-contain cursor-pointer"
                      on:click={() =>
                        downloadFile(message.image.url, message.image.name)}
                    />
                  </div>
                {/if}

                <!-- Display Other Attachments -->
                {#if message.attachments && message.attachments.length > 0}
                  <div class="mt-2 space-y-2">
                    {#each message.attachments as attachment}
                      <button
                        class="btn btn-sm btn-outline gap-2"
                        on:click={() =>
                          downloadFile(attachment.url, attachment.name)}
                      >
                        📎 {attachment.name}
                      </button>
                    {/each}
                  </div>
                {/if}

                <p class="text-sm text-gray-500 mt-1">
                  {new Date(message.time).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-8">
      <p class="text-lg">No messages found in selected date range</p>
    </div>
  {/if}
</div>

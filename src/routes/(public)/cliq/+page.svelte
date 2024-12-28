<script lang="ts">
  import { PUBLIC_ZOHO_CLIENT_ID } from "$env/static/public"
  import type { PageData } from "./$types"
  export let data: PageData

  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?response_type=code&access_type=offline&client_id=${PUBLIC_ZOHO_CLIENT_ID}&scope=ZohoCliq.Messages.READ,ZohoCliq.Attachments.READ,ZohoCliq.Channels.READ&redirect_uri=${encodeURIComponent("http://localhost:5173/cliq/callback")}`
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Zoho Cliq Integration</h1>

  <!-- Auth Button -->
  <a href={authUrl} class="btn btn-primary mb-4"> Connect Zoho Cliq </a>

  {#if data.error}
    <div class="alert alert-error">
      {data.error}
      <a href="/cliq/auth" class="btn btn-primary ml-4">
        Reconnect Zoho Cliq
      </a>
    </div>
  {/if}

  {#if data.channels && data.channels.length > 0}
    <div class="grid gap-4">
      <h2 class="text-xl font-semibold">Your Channels:</h2>
      {#each data.channels as channel}
        <a
          href={`/cliq/channel/${channel.id}`}
          class="card bg-base-200 hover:bg-base-300 transition-colors"
          data-channel-id={channel.id}
        >
          <div class="card-body">
            <h3 class="card-title">{channel.name}</h3>
            {#if channel.description}
              <p>{channel.description}</p>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <p>No channels found.</p>
  {/if}
</div>

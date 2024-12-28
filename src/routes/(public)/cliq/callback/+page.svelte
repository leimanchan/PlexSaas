<script lang="ts">
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"

  onMount(() => {
    // Redirect to main cliq page after a short delay
    setTimeout(() => {
      goto("/cliq")
    }, 2000)
  })
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Processing...</h1>
  <p>Completing authentication with Zoho Cliq...</p>
</div>

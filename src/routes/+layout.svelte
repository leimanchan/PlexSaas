<script lang="ts">
  import "../app.css"
  import { navigating, page } from "$app/stores"
  import { expoOut } from "svelte/easing"
  import { slide } from "svelte/transition"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()

  // Get user and role info
  let user = $derived.by(() => $page.data.user)
</script>

<!-- App Shell -->
<div class="min-h-screen flex flex-col">
  {#if $navigating}
    <div
      class="fixed w-full top-0 right-0 left-0 h-1 z-50 bg-primary"
      in:slide={{ delay: 100, duration: 12000, axis: "x", easing: expoOut }}
    />
  {/if}

  <!-- Main Content -->
  <main class="flex-1">
    {@render children?.()}
  </main>
</div>

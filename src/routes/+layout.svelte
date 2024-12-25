<script lang="ts">
  import "../app.css"
  import { navigating, page } from "$app/stores"
  import { invalidate } from "$app/navigation"
  import { slide } from "svelte/transition"
  import { expoOut } from "svelte/easing"
  import Navbar from "$lib/components/shared/NavBar/Navbar.svelte"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
  let user = $derived.by(() => $page.data.user)
  let role = $derived.by(() => $page.data.role || null)

  // Don't show footer on auth pages or create_profile
  let hideFooter = $derived.by(
    () =>
      $page.url.pathname.startsWith("/login/") ||
      $page.url.pathname === "/account/create_profile",
  )
</script>

<!-- App Shell -->
<div class="min-h-screen flex flex-col">
  {#if $navigating}
    <div
      class="fixed w-full top-0 right-0 left-0 h-1 z-50 bg-primary"
      in:slide={{ delay: 100, duration: 12000, axis: "x", easing: expoOut }}
    />
  {/if}

  <!-- Navigation -->
  <Navbar {role} {user} currentPath={$page.url.pathname} />

  <!-- Main Content -->
  <main class="flex-1">
    {@render children?.()}
  </main>

  <!-- Footer - hidden on auth pages -->
  {#if !hideFooter}
    <div class="border-t max-w-[1000px] mx-auto" />
    <footer
      class="footer p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base"
    >
      <nav>
        <span class="footer-title opacity-80">Explore</span>
        <a class="link link-hover mb-1" href="/">Overview</a>
        <a class="link link-hover my-1" href="/pricing">Pricing</a>
        <a class="link link-hover my-1" href="/blog">Blog</a>
        <a class="link link-hover my-1" href="/contact_us">Contact Us</a>
        <a
          class="link link-hover my-1"
          href="https://github.com/CriticalMoments/CMSaasStarter">Github</a
        >
      </nav>
      <aside>
        <span class="footer-title opacity-80">Sponsor</span>
        <a class="max-w-[260px]" href="https://getkiln.ai">
          <div class="font-bold text-3xl mb-1">Kiln AI</div>
          <div class="font-medium mb-3">Build High Quality AI Products</div>
          <div class="font-light">
            Use advanced AI tactics, and collaborate with your team. Free apps
            for Mac and Windows.
          </div>
          <div class="link text-sm font-bold mt-2">Learn More</div>
        </a>
      </aside>
    </footer>
  {/if}
</div>

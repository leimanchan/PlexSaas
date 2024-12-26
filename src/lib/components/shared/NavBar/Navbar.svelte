<script lang="ts">
  let { role = "", user = null, currentPath = "" } = $props()

  // Explicit path checks
  let hideLoginLink = $derived.by(() =>
    ["/login/sign_in", "/login/sign_up"].includes(currentPath),
  )

  let hideAllNavigation = $derived.by(
    () => currentPath === "/account/create_profile",
  )

  let isAdmin = $derived.by(() => role?.toUpperCase() === "CSR")

  let menuItems = $derived.by(() => {
    console.log("Navbar - Current path:", currentPath)
    console.log("Navbar - Current role:", role, typeof role)

    // If on create_profile, return empty array
    if (hideAllNavigation) {
      return []
    }

    // Different menu items based on role
    if (isAdmin) {
      // CSR only sees admin items and account
      return [
        { href: "/admin/draftOrder", label: "Draft Order" },
        { href: "/admin/knowledge-base/new-article", label: "Knowledge Base" },
        { href: "/account", label: "Account" },
      ]
    }

    // Regular user menu items
    const baseItems = [
      { href: "/blog", label: "Blog" },
      { href: "/quote", label: "Quote" },
      { href: "/pricing", label: "Pricing" },
    ]

    // Only add Login/Account link if not in specified paths
    if (!hideLoginLink) {
      baseItems.push({
        href: user ? "/account" : "/login/sign_in",
        label: user ? "Account" : "Login",
      })
    }

    return baseItems
  })
</script>

<div class="navbar {isAdmin ? 'bg-base-300' : 'bg-base-100'} container mx-auto">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">
      {#if isAdmin}
        <span class="text-primary">Admin</span> - SaaS Starter
      {:else}
        SaaS Starter
      {/if}
    </a>
  </div>
  <div class="flex-none">
    <!-- Only show navigation if not on create_profile -->
    {#if !hideAllNavigation}
      <ul class="menu menu-horizontal px-1 hidden sm:flex font-bold text-lg">
        {#each menuItems as item}
          <li class="md:mx-2">
            <a
              href={item.href}
              class={isAdmin && item.href.startsWith("/admin")
                ? "text-primary"
                : ""}
            >
              {item.label}
            </a>
          </li>
        {/each}

        <li class="md:mx-0">
          <a href="/search" aria-label="Search">
            <svg
              fill="#000000"
              class="w-6 h-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z"
                fill="currentColor"
              /></svg
            >
          </a>
        </li>
      </ul>

      <!-- Mobile menu -->
      <div class="dropdown dropdown-end sm:hidden">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            /></svg
          >
        </label>
        <ul
          tabindex="0"
          class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow {isAdmin
            ? 'bg-base-300'
            : 'bg-base-100'} rounded-box w-52 font-bold"
        >
          {#each menuItems as item}
            <li>
              <a
                href={item.href}
                class={isAdmin && item.href.startsWith("/admin")
                  ? "text-primary"
                  : ""}
              >
                {item.label}
              </a>
            </li>
          {/each}
          <li><a href="/search">Search</a></li>
        </ul>
      </div>
    {/if}
  </div>
</div>

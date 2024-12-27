<!-- src/routes/knowledge-base/+page.svelte -->
<script>
  import { enhance } from "$app/forms"

  let { data } = $props()

  let currentArticle = $state({
    content: [],
    title: "",
  })

  let articles = $state(data?.articles || [])
  let isLoading = $state(true)
  let hasError = $state(false)
  let debugInfo = $state(null)

  let selectedArticle = $state(null)
  let selectedArticles = $state(new Set())

  // Add error state
  let error = $state(null)

  let showPreview = $state(false)

  let isUploading = $state(false)
  let imageUrl = $state(
    "https://cqcnbvrnyoquwplayjap.supabase.co/storage/v1/object/public/KB-storage/knowledge-base/9a308367-b1ae-45ba-a81c-4369310b9bbf.jpg",
  )

  // Add these state variables
  let linkEditor = $state({
    show: false,
    url: "https://",
    position: { x: 0, y: 0 },
    selection: null,
    targetSection: null,
    editableDiv: null,
    range: null,
    selectedText: "",
  })

  // Add effect to monitor state changes
  $effect(() => {
    console.log("Current articles:", articles)
  })

  // Update the initialization effect with better error handling
  $effect(() => {
    const initializeArticles = async () => {
      console.group("Fetching Articles")
      try {
        const response = await fetch(
          "/admin/knowledge-base/new-article?/getArticles",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        )

        // Debug response information
        debugInfo = {
          status: response.status,
          contentType: response.headers.get("content-type"),
          url: response.url,
        }
        console.log("📥 Response debug info:", debugInfo)

        // Check if response is ok and is JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response but got " + contentType)
        }

        const result = await response.json()
        console.log("🟪 Server response:", result)

        if (result.type === "success") {
          // Use immutable update pattern
          articles = [...(result.data || [])]
          console.log("✅ Articles loaded:", articles)
        } else {
          console.error("⚠️ Failed to load articles:", result)
          hasError = true
        }
      } catch (error) {
        console.error("❌ Error loading articles:", error)
        hasError = true
      } finally {
        isLoading = false
        console.groupEnd()
      }
    }

    initializeArticles()
  })

  function addContentSection(type) {
    const newSection = {
      type,
      children: [],
    }

    switch (type) {
      case "heading":
        newSection.level = 2
        newSection.id = ""
        newSection.class = "toc_anchors"
        newSection.children = ["New Heading"]
        break
      case "paragraph":
        newSection.style = {
          "line-height": "1.55em",
          margin: "0px 0px 1.5em",
        }
        newSection.children = ["New paragraph"]
        break
      case "list":
        newSection.style = {
          margin: "1em 0",
        }
        newSection.ordered = true
        newSection.children = ["First item", "Second item", "Third item"]
        break
      case "image":
        newSection.src = ""
        newSection.alt = ""
        newSection.style = {
          widthValue: 100,
          width: "100%",
          margin: "1em 0",
        }
        break
      case "code":
        newSection.language = "javascript"
        newSection.filename = ""
        newSection.children = ["// Code example"]
        break
      case "note":
        newSection.style = {
          background: "#f9f9f9",
          padding: "1em",
          margin: "1em 0",
          "border-left": "4px solid #ff3e00",
        }
        newSection.children = ["Note: Important information here"]
        break
    }

    currentArticle.content = [...currentArticle.content, newSection]
  }

  function addFormatting(element, type) {
    return {
      type: "formatting",
      typeDetail: type,
      style:
        type === "bold"
          ? { "font-weight": "bold" }
          : type === "italic"
            ? { "font-style": "italic" }
            : {},
      children: [element],
    }
  }

  async function saveArticle() {
    console.group(`Save Article Attempt`)
    console.log("🟦 Attempting to save article:", currentArticle)

    const form = new FormData()
    form.append(
      "article",
      JSON.stringify({
        title: currentArticle.title,
        content: currentArticle.content,
        seo: currentArticle.seo,
        permission: currentArticle.permission,
      }),
    )

    try {
      const response = await fetch("?/saveArticle", {
        method: "POST",
        body: form,
      })

      const result = await response.json()
      console.log("🟪 Supabase Response:", result)

      if (result.type === "success" && result.status === 200) {
        console.log("✅ Article saved successfully")

        // Parse the response data to get the ID
        const parsedData = JSON.parse(result.data)
        const articleId = parsedData[3] // The UUID is at index 3 in your response

        // Create new article object with the ID
        const newArticle = {
          id: articleId, // Store the Supabase UUID
          title: currentArticle.title,
          content: currentArticle.content,
          seo: currentArticle.seo,
          permission: currentArticle.permission,
          viewCount: "0",
          likeCount: "0",
          commentCount: "0",
          attachmentCount: "0",
          feedbackCount: "0",
        }

        console.log("📝 New article with ID:", newArticle)
        articles = [...articles, newArticle]

        // Reset the form
        currentArticle = {
          title: "",
          content: [],
          seo: {
            keywords: null,
            isEnabled: true,
            description: null,
            title: null,
          },
          permission: "ALL",
          viewCount: "0",
          likeCount: "0",
          commentCount: "0",
          attachmentCount: "0",
          feedbackCount: "0",
        }
        error = null
      } else {
        console.warn("⚠️ Unexpected response:", result)
        error = "Unexpected response from server. Please refresh the page."
      }
    } catch (error) {
      console.error("❌ Error saving article:", error)
      error = "An unexpected error occurred while saving the article"
    } finally {
      console.groupEnd()
    }
  }

  function viewArticle(article) {
    console.log("Viewing article:", article)
    selectedArticle = article
  }

  function toggleSelection(article) {
    if (selectedArticles.has(article)) {
      selectedArticles.delete(article)
    } else {
      selectedArticles.add(article)
    }
  }

  async function deleteSelected() {
    console.group("Delete Selected Articles Attempt")
    console.log("🗑️ Attempting to delete selected articles:", selectedArticles)

    if (!confirm("Are you sure you want to delete selected articles?")) return

    const articleIds = [...selectedArticles].map((article) => article.id)
    const form = new FormData()
    form.append("ids", JSON.stringify(articleIds))

    try {
      const response = await fetch("?/deleteSelected", {
        method: "POST",
        body: form,
      })

      const result = await response.json()
      console.log("🟪 Bulk Delete Response:", result)

      if (result.type === "success" && result.status === 200) {
        console.log("✅ Articles deleted successfully")

        // Add a small delay to ensure Supabase has processed the deletion
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Update the local articles array
        articles = articles.filter((article) => !selectedArticles.has(article))
        selectedArticles.clear()
        console.log("📝 Updated articles list:", articles)
      } else {
        console.warn("⚠️ Unexpected response:", result)
        alert("Failed to delete articles. Please try again.")
      }
    } catch (error) {
      console.error("❌ Error deleting articles:", error)
      alert("An error occurred while deleting the articles")
    } finally {
      console.groupEnd()
    }
  }

  async function deleteArticle(article) {
    console.group("Delete Article Attempt")
    console.log("🗑️ Attempting to delete article:", article)
    console.log("🔑 Article ID:", article.id)

    if (!confirm(`Are you sure you want to delete "${article.title}"?`)) return

    const form = new FormData()
    form.append("id", article.id)

    try {
      console.log("📤 Sending delete request...")
      const response = await fetch("?/deleteArticle", {
        method: "POST",
        body: form,
      })

      console.log("📥 Raw response:", response)
      const result = await response.json()
      console.log("🟪 Parsed delete response:", result)

      // Only update UI if we can confirm the deletion
      if (
        result.type === "success" &&
        result.status === 200 &&
        result.verificationCheck === "Article no longer exists"
      ) {
        console.log("✅ Article confirmed deleted")
        articles = articles.filter((a) => a.id !== article.id)
        console.log("📝 Updated articles list:", articles)
      } else {
        console.warn("⚠️ Delete operation may not have completed:", result)
        alert(
          "The delete operation may not have completed successfully. Please refresh the page to verify.",
        )
      }
    } catch (error) {
      console.error("❌ Error in delete operation:", error)
      alert("An error occurred while deleting the article")
    } finally {
      console.groupEnd()
    }
  }

  // Add this function to handle file uploads
  async function handleImageUpload(event, section) {
    const file = event.target.files[0]
    if (!file) {
      console.log("❌ No file selected")
      return
    }

    console.log("📁 File selected:", file.name)
    console.log("📋 Initial section state:", section)

    try {
      const form = new FormData()
      form.append("file", file)

      console.log("🚀 Sending upload request...")
      const response = await fetch("?/uploadImage", {
        method: "POST",
        body: form,
      })

      const result = await response.json()
      console.log("📥 Raw server response:", result)

      // Extract URL using regex since we can see it in the response
      const imageUrl = result.data?.match(/https:\/\/[^"]+/)?.[0]
      console.log("🔗 Extracted URL:", imageUrl)

      if (imageUrl) {
        // Create a new section object
        const updatedSection = {
          ...section,
          src: imageUrl,
          alt: file.name || "Uploaded image",
          children: section.children || [],
        }

        console.log("📝 Updated section data:", updatedSection)

        // Find the index of the current section
        const index = currentArticle.content.findIndex((s) => s === section)
        console.log("📍 Section index:", index)

        if (index !== -1) {
          // Create a new content array with the updated section
          const newContent = [...currentArticle.content]
          newContent[index] = updatedSection

          // Update the state
          currentArticle.content = newContent

          console.log("✅ Content updated:", currentArticle.content)
        } else {
          console.error("❌ Could not find section in content array")
        }
      } else {
        console.error("❌ No URL found in response:", result)
      }
    } catch (error) {
      console.error("❌ Upload error:", error)
    }
  }

  // Add an effect to monitor content changes
  $effect(() => {
    console.log("🔄 Content changed:", currentArticle.content)
  })

  function showLinkEditor(e, section) {
    e.preventDefault() // Prevent losing focus

    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (!selectedText) {
      console.log("⚠️ No text selected")
      return
    }

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const editableDiv = e.target.closest("[contenteditable]")

    console.log("🎯 Opening link editor", {
      selectedText,
      section,
      editableDiv,
    })

    // Store all the necessary information
    linkEditor = {
      show: true,
      url: "https://",
      position: {
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 5,
      },
      selection: selection,
      targetSection: section,
      editableDiv: editableDiv,
      range: range.cloneRange(),
      selectedText: selectedText,
    }
  }

  function insertLink() {
    console.log("🔗 Starting link insertion...", linkEditor)

    if (
      !linkEditor.url ||
      !linkEditor.targetSection ||
      !linkEditor.editableDiv ||
      !linkEditor.selectedText
    ) {
      console.error("❌ Missing required data:", {
        url: linkEditor.url,
        hasSection: !!linkEditor.targetSection,
        hasDiv: !!linkEditor.editableDiv,
        selectedText: linkEditor.selectedText,
      })
      return
    }

    try {
      // Create the link element
      const linkElement = document.createElement("a")
      linkElement.href = linkEditor.url
      linkElement.textContent = linkEditor.selectedText
      linkElement.target = "_blank"
      linkElement.rel = "noopener noreferrer"

      // Restore the selection
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(linkEditor.range)

      // Insert the link
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(linkElement)

      // Update the state
      const newSections = [...currentArticle.content]
      const sectionIndex = newSections.indexOf(linkEditor.targetSection)

      if (sectionIndex !== -1) {
        newSections[sectionIndex] = {
          ...linkEditor.targetSection,
          children: [linkEditor.editableDiv.innerHTML],
        }

        currentArticle.content = newSections
        console.log("✅ Link inserted successfully")
      }
    } catch (error) {
      console.error("❌ Error inserting link:", error)
    }

    // Reset link editor
    linkEditor = {
      show: false,
      url: "https://",
      position: { x: 0, y: 0 },
      selection: null,
      targetSection: null,
      editableDiv: null,
      range: null,
      selectedText: "",
    }
  }
</script>

<!-- Main Layout -->
<div class="flex flex-col gap-8 p-4">
  <!-- Article List Table -->
  <div class="overflow-x-auto w-full">
    <div class="flex justify-between items-center p-4">
      <h2 class="text-xl font-bold">Knowledge Base Articles</h2>
      <div class="actions">
        {#if selectedArticles.size > 0}
          <form
            method="POST"
            action="?/deleteSelected"
            use:enhance={() => {
              return {
                success: () => {
                  articles = articles.filter(
                    (article) => !selectedArticles.has(article),
                  )
                  selectedArticles.clear()
                },
              }
            }}
          >
            <input
              type="hidden"
              name="ids"
              value={JSON.stringify(
                [...selectedArticles].map((article) => article.id),
              )}
            />
            <button type="submit" class="btn btn-error btn-sm">
              Delete Selected ({selectedArticles.size})
            </button>
          </form>
        {/if}
      </div>
    </div>

    {#if isLoading}
      <div class="text-center p-4">
        <span class="loading loading-spinner loading-lg"></span>
        <p>Loading articles...</p>
      </div>
    {:else if articles.length === 0}
      <div class="text-center p-4">
        <p>No articles found. Create your first article!</p>
      </div>
    {:else}
      <table class="table table-zebra">
        <thead>
          <tr>
            <th class="w-12">
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  onclick={(e) => {
                    if (e.target.checked) {
                      selectedArticles = new Set(articles)
                    } else {
                      selectedArticles.clear()
                    }
                  }}
                />
              </label>
            </th>
            <th>Title</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each articles as article}
            <tr class="hover">
              <td>
                <label>
                  <input
                    type="checkbox"
                    class="checkbox"
                    checked={selectedArticles.has(article)}
                    onclick={() => toggleSelection(article)}
                  />
                </label>
              </td>
              <td>
                <div
                  class="font-bold cursor-pointer hover:text-primary"
                  onclick={() => viewArticle(article)}
                >
                  {article.title}
                </div>
              </td>
              <td>{article.viewCount}</td>
              <td>{article.likeCount}</td>
              <td>
                <button
                  class="btn btn-ghost btn-xs"
                  onclick={() => deleteArticle(article)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>

  <!-- Editor/Viewer Flexbox -->
  <div class="flex gap-8">
    <!-- Left Panel: Editor when creating, Article details when viewing -->
    <div class="flex-1">
      {#if selectedArticle}
        <!-- Article View -->
        <div class="bg-base-100 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">{selectedArticle.title}</h2>
            <button
              class="btn btn-ghost btn-sm"
              onclick={() => (selectedArticle = null)}
            >
              Back to List
            </button>
          </div>

          <div class="article-content">
            {#each selectedArticle.content as section}
              {#if section.type === "heading"}
                <h3
                  class="text-xl font-bold my-4 {section.class}"
                  id={section.id}
                >
                  {section.children[0]}
                </h3>
              {:else if section.type === "paragraph"}
                <div class="formatting-toolbar join gap-1 mb-2">
                  <button
                    class="btn btn-xs"
                    onmousedown={(e) => {
                      e.preventDefault() // Prevent losing focus
                      document.execCommand("bold", false, null)
                    }}
                    title="Bold">B</button
                  >
                  <button
                    class="btn btn-xs italic"
                    onmousedown={(e) => {
                      e.preventDefault() // Prevent losing focus
                      document.execCommand("italic", false, null)
                    }}
                    title="Italic">I</button
                  >
                  <button
                    class="btn btn-xs underline"
                    onmousedown={(e) => {
                      e.preventDefault() // Prevent losing focus
                      document.execCommand("underline", false, null)
                    }}
                    title="Underline">U</button
                  >
                  <button
                    class="btn btn-xs line-through"
                    onmousedown={(e) => {
                      e.preventDefault() // Prevent losing focus
                      document.execCommand("strikeThrough", false, null)
                    }}
                    title="Strike Through">S</button
                  >
                  <button
                    class="btn btn-xs"
                    onmousedown={(e) => showLinkEditor(e, section)}
                    title="Create Link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  contenteditable="true"
                  class="min-h-[100px] p-2 border rounded prose max-w-none"
                  data-section
                  onblur={(e) => {
                    if (!linkEditor.show) {
                      // Create new array with updated section
                      const newContent = [...currentArticle.content]
                      const sectionIndex = newContent.indexOf(section)
                      newContent[sectionIndex] = {
                        ...section,
                        children: [e.target.innerHTML],
                      }
                      currentArticle.content = newContent
                    }
                  }}
                >
                  {@html section.children[0]}
                </div>
              {:else if section.type === "list"}
                {#if section.ordered}
                  <ol class="list-decimal list-inside my-4">
                    {#each section.children as item}
                      <li class="my-2">{item}</li>
                    {/each}
                  </ol>
                {:else}
                  <ul class="list-disc list-inside my-4">
                    {#each section.children as item}
                      <li class="my-2">{item}</li>
                    {/each}
                  </ul>
                {/if}
              {:else if section.type === "image"}
                <div class="my-4">
                  <div class="image-container">
                    <img
                      src={section.src}
                      alt={section.alt || ""}
                      style={Object.entries(section.style || {})
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(";")}
                      class="rounded-lg shadow-lg mx-auto"
                      onload={() =>
                        console.log(
                          "✅ Image loaded successfully:",
                          section.src,
                        )}
                      onerror={(e) => {
                        console.error("❌ Image failed to load:", section.src)
                        console.log("📋 Section data:", section)
                      }}
                    />
                  </div>
                </div>
              {:else if section.type === "code"}
                <div class="my-4">
                  {#if section.filename}
                    <div class="text-sm text-base-content/70 mb-1">
                      {section.filename}
                    </div>
                  {/if}
                  <pre class="mockup-code bg-base-300">
                    <code class="language-{section.language}"
                      >{section.children[0]}</code
                    >
                  </pre>
                </div>
              {:else if section.type === "note"}
                <div class="alert my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="stroke-info shrink-0 w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{section.children[0]}</span>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {:else}
        <!-- Article Editor -->
        <div class="editor">
          <input
            type="text"
            bind:value={currentArticle.title}
            placeholder="Article Title"
            class="input input-bordered w-full mb-4"
          />

          <div class="toolbar join gap-2 mb-4">
            <button
              class="btn btn-sm"
              onclick={() => addContentSection("heading")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
              Heading
            </button>
            <button
              class="btn btn-sm"
              onclick={() => addContentSection("paragraph")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                  clip-rule="evenodd"
                />
              </svg>
              Paragraph
            </button>
            <button
              class="btn btn-sm"
              onclick={() => addContentSection("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              List
            </button>
            <button
              class="btn btn-sm"
              onclick={() => addContentSection("image")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                />
              </svg>
              Image
            </button>
            <button
              class="btn btn-sm"
              onclick={() => addContentSection("code")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Code
            </button>
            <button
              class="btn btn-sm"
              onclick={() => addContentSection("note")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Note
            </button>
          </div>

          <div class="content-editor">
            {#each currentArticle.content as section, i}
              <div class="content-section mb-4 p-4 bg-base-200 rounded-lg">
                {#if section.type === "heading"}
                  <div class="flex items-center gap-2">
                    <select
                      class="select select-sm select-bordered"
                      bind:value={section.level}
                    >
                      <option value={1}>H1</option>
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                    </select>
                    <div
                      class="flex-1"
                      contenteditable="true"
                      onblur={(e) =>
                        (section.children = [e.target.textContent])}
                    >
                      {section.children[0]}
                    </div>
                  </div>
                {:else if section.type === "paragraph"}
                  <div class="formatting-toolbar join gap-1 mb-2">
                    <button
                      class="btn btn-xs"
                      onmousedown={(e) => {
                        e.preventDefault() // Prevent losing focus
                        document.execCommand("bold", false, null)
                      }}
                      title="Bold">B</button
                    >
                    <button
                      class="btn btn-xs italic"
                      onmousedown={(e) => {
                        e.preventDefault() // Prevent losing focus
                        document.execCommand("italic", false, null)
                      }}
                      title="Italic">I</button
                    >
                    <button
                      class="btn btn-xs underline"
                      onmousedown={(e) => {
                        e.preventDefault() // Prevent losing focus
                        document.execCommand("underline", false, null)
                      }}
                      title="Underline">U</button
                    >
                    <button
                      class="btn btn-xs line-through"
                      onmousedown={(e) => {
                        e.preventDefault() // Prevent losing focus
                        document.execCommand("strikeThrough", false, null)
                      }}
                      title="Strike Through">S</button
                    >
                    <button
                      class="btn btn-xs"
                      onmousedown={(e) => showLinkEditor(e, section)}
                      title="Create Link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    contenteditable="true"
                    class="min-h-[100px] p-2 border rounded prose max-w-none"
                    data-section
                    onblur={(e) => {
                      if (!linkEditor.show) {
                        // Create new array with updated section
                        const newContent = [...currentArticle.content]
                        const sectionIndex = newContent.indexOf(section)
                        newContent[sectionIndex] = {
                          ...section,
                          children: [e.target.innerHTML],
                        }
                        currentArticle.content = newContent
                      }
                    }}
                  >
                    {@html section.children[0]}
                  </div>
                {:else if section.type === "list"}
                  <div class="flex items-center gap-2 mb-2">
                    <select
                      class="select select-sm select-bordered"
                      bind:value={section.ordered}
                    >
                      <option value={true}>Numbered</option>
                      <option value={false}>Bullets</option>
                    </select>
                  </div>
                  {#if section.ordered}
                    <ol class="list-decimal list-inside">
                      {#each section.children as item, index}
                        <li>
                          <input
                            type="text"
                            class="input input-bordered input-sm w-full my-1"
                            value={item}
                            onchange={(e) =>
                              (section.children[index] = e.target.value)}
                          />
                        </li>
                      {/each}
                    </ol>
                  {:else}
                    <ul class="list-disc list-inside">
                      {#each section.children as item, index}
                        <li>
                          <input
                            type="text"
                            class="input input-bordered input-sm w-full my-1"
                            value={item}
                            onchange={(e) =>
                              (section.children[index] = e.target.value)}
                          />
                        </li>
                      {/each}
                    </ul>
                  {/if}
                  <button
                    class="btn btn-sm mt-2"
                    onclick={() =>
                      (section.children = [...section.children, ""])}
                  >
                    Add Item
                  </button>
                {:else if section.type === "image"}
                  <div class="flex flex-col gap-4 p-4 border rounded-lg">
                    <!-- Image controls with smoother slider -->
                    <div class="flex flex-col gap-4">
                      <div class="form-control w-full">
                        <label class="label">
                          <span class="label-text">Width (%)</span>
                          <span class="label-text-alt"
                            >{section.style.width}</span
                          >
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={section.style.widthValue}
                          class="range range-primary"
                          step="1"
                          oninput={(e) => {
                            const value = Number(e.target.value)
                            section.style = {
                              ...section.style,
                              widthValue: value,
                              width: `${value}%`,
                            }
                          }}
                        />
                        <div
                          class="w-full flex justify-between text-xs px-2 mt-1"
                        >
                          <span>10%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>

                    <!-- Image upload -->
                    <div
                      class="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-base-200"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        class="file-input file-input-bordered w-full max-w-xs"
                        onchange={(e) => handleImageUpload(e, section)}
                      />
                      {#if section.src}
                        <p class="text-sm text-success mt-2">
                          ✓ Image uploaded
                        </p>
                      {:else}
                        <p class="text-sm text-base-content/70 mt-2">
                          Upload an image from your computer
                        </p>
                      {/if}
                    </div>

                    <!-- Alt text input -->
                    <div class="form-control w-full">
                      <label class="label">
                        <span class="label-text">Alt Text</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Describe the image for accessibility"
                        class="input input-bordered input-sm w-full"
                        bind:value={section.alt}
                      />
                    </div>
                  </div>
                {:else if section.type === "code"}
                  <div class="flex flex-col gap-2">
                    <input
                      type="text"
                      class="input input-bordered input-sm"
                      placeholder="Filename (optional)"
                      bind:value={section.filename}
                    />
                    <select
                      class="select select-sm select-bordered"
                      bind:value={section.language}
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="sql">SQL</option>
                    </select>
                    <textarea
                      class="textarea textarea-bordered font-mono"
                      rows="5"
                      onblur={(e) => (section.children = [e.target.value])}
                      >{section.children[0]}</textarea
                    >
                  </div>
                {:else if section.type === "note"}
                  <div
                    class="bg-base-200 p-4 rounded-lg"
                    contenteditable="true"
                    onblur={(e) => (section.children = [e.target.textContent])}
                  >
                    {section.children[0]}
                  </div>
                {/if}
                <button
                  class="btn btn-sm btn-error mt-2"
                  onclick={() =>
                    (currentArticle.content = currentArticle.content.filter(
                      (_, idx) => idx !== i,
                    ))}
                >
                  Remove
                </button>
              </div>
            {/each}
          </div>

          <button class="btn btn-primary mt-4" onclick={saveArticle}
            >Save Article</button
          >
          {#if error}
            <div class="alert alert-error mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>{error}</span>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Right Panel: Live Preview when editing -->
    {#if !selectedArticle}
      <div class="preview flex-1 p-6 bg-base-100 rounded-lg border">
        <h2 class="text-2xl font-bold mb-6">
          {currentArticle.title || "Untitled Article"}
        </h2>

        <div class="preview-content">
          {#each currentArticle.content as section}
            {#if section.type === "heading"}
              <h3
                class="text-xl font-bold my-4 {section.class}"
                id={section.id}
              >
                {section.children[0]}
              </h3>
            {:else if section.type === "paragraph"}
              <div class="my-4 text-base-content prose max-w-none">
                {@html section.children[0]}
              </div>
            {:else if section.type === "list"}
              {#if section.ordered}
                <ol class="list-decimal list-inside my-4">
                  {#each section.children as item}
                    <li class="my-2">{item}</li>
                  {/each}
                </ol>
              {:else}
                <ul class="list-disc list-inside my-4">
                  {#each section.children as item}
                    <li class="my-2">{item}</li>
                  {/each}
                </ul>
              {/if}
            {:else if section.type === "image" && section.src}
              <div class="my-4">
                <div class="image-container">
                  <img
                    src={section.src}
                    alt={section.alt || ""}
                    style={Object.entries(section.style || {})
                      .map(([k, v]) => `${k}:${v}`)
                      .join(";")}
                    class="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            {:else if section.type === "code"}
              <div class="my-4">
                {#if section.filename}
                  <div class="text-sm text-base-content/70 mb-1">
                    {section.filename}
                  </div>
                {/if}
                <pre class="mockup-code bg-base-300">
                  <code class="language-{section.language}"
                    >{section.children[0]}</code
                  >
                </pre>
              </div>
            {:else if section.type === "note"}
              <div class="alert my-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{section.children[0]}</span>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Add loading indicator -->
{#if isUploading}
  <div class="loading-indicator" role="status">
    <span class="loading loading-spinner"></span>
    <span>Uploading image...</span>
  </div>
{/if}

<!-- Add the link editor popup -->
{#if linkEditor.show}
  <div
    class="link-editor"
    style="position: fixed; left: {linkEditor.position.x}px; top: {linkEditor
      .position.y}px;"
  >
    <input type="text" bind:value={linkEditor.url} placeholder="Enter URL..." />
    <button onclick={insertLink}>Add</button>
  </div>
{/if}

<style>
  .content-editor {
    max-height: calc(100vh - 300px);
    overflow-y: auto;
  }

  .preview {
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }

  .article-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .image-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-placeholder {
    padding: 2rem;
    text-align: center;
  }

  .error-message {
    padding: 2rem;
    text-align: center;
    color: red;
  }

  .formatting-toolbar button {
    min-width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .formatting-toolbar button:hover {
    background-color: hsl(var(--b2));
  }

  /* Style links in the editor */
  [contenteditable] a {
    color: hsl(var(--p));
    text-decoration: underline;
  }

  .link-editor {
    z-index: 100;
    position: fixed;
  }

  /* Prevent blur when clicking link editor */
  .link-editor * {
    pointer-events: auto;
  }
</style>

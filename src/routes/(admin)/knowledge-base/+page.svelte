<!-- src/routes/knowledge-base/+page.svelte -->
<script>
  let articles = $state([])
  let currentArticle = $state({
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
  })

  let selectedArticle = $state(null)
  let selectedArticles = $state(new Set())

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
          "max-width": "100%",
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
    try {
      const response = await fetch("/knowledge-base/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentArticle),
      })

      if (!response.ok) {
        throw new Error("Failed to save article")
      }

      const savedArticle = await response.json()
      articles = [...articles, savedArticle]

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
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Failed to save article. Please try again.")
    }
  }

  // Load saved articles
  $effect(async () => {
    try {
      const response = await fetch("/knowledge-base/api")
      if (response.ok) {
        const data = await response.json()
        articles = data
      }
    } catch (error) {
      console.error("Error loading articles:", error)
    }
  })

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
    if (!confirm("Are you sure you want to delete selected articles?")) return

    try {
      const articleIds = [...selectedArticles].map((article) => article.id)

      const response = await fetch("/knowledge-base/api", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleIds),
      })

      if (!response.ok) {
        throw new Error("Failed to delete articles")
      }

      // Remove deleted articles from the local state
      articles = articles.filter((article) => !selectedArticles.has(article))
      selectedArticles.clear()
    } catch (error) {
      console.error("Error deleting articles:", error)
      alert("Failed to delete articles. Please try again.")
    }
  }

  async function deleteArticle(article) {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const response = await fetch(`/knowledge-base/api/${article.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete article")
      }

      // Remove deleted article from the local state
      articles = articles.filter((a) => a.id !== article.id)
    } catch (error) {
      console.error("Error deleting article:", error)
      alert("Failed to delete article. Please try again.")
    }
  }
</script>

<!-- Main Layout -->
<div class="flex flex-col gap-8 p-4">
  <!-- Article List Table -->
  <div class="overflow-x-auto w-full">
    <div class="flex justify-between items-center p-4">
      <h2 class="text-xl font-bold">Knowledge Base Articles</h2>
      {#if selectedArticles.size > 0}
        <button class="btn btn-error btn-sm" onclick={deleteSelected}>
          Delete Selected ({selectedArticles.size})
        </button>
      {/if}
    </div>

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
                <p class="my-4 text-base-content">
                  {#if section.children[0]?.type === "formatting"}
                    <span
                      style={Object.entries(section.children[0].style)
                        .map(([k, v]) => `${k}:${v}`)
                        .join(";")}
                    >
                      {section.children[0].children[0]}
                    </span>
                  {:else}
                    {section.children[0]}
                  {/if}
                </p>
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
                  {#if section.src}
                    <img
                      src={section.src}
                      alt={section.alt}
                      class="max-w-full h-auto rounded-lg shadow-lg"
                    />
                    {#if section.alt}
                      <p class="text-sm text-base-content/70 mt-2 text-center">
                        {section.alt}
                      </p>
                    {/if}
                  {/if}
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
                      onclick={() =>
                        (section.children = [
                          addFormatting(section.children[0], "bold"),
                        ])}>B</button
                    >
                    <button
                      class="btn btn-xs italic"
                      onclick={() =>
                        (section.children = [
                          addFormatting(section.children[0], "italic"),
                        ])}>I</button
                    >
                  </div>
                  <div
                    contenteditable="true"
                    class="min-h-[100px] p-2 border rounded"
                    onblur={(e) => (section.children = [e.target.textContent])}
                  >
                    {section.children[0]}
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
                  <div class="flex flex-col gap-2">
                    <input
                      type="text"
                      class="input input-bordered input-sm"
                      placeholder="Image URL"
                      bind:value={section.src}
                    />
                    <input
                      type="text"
                      class="input input-bordered input-sm"
                      placeholder="Alt text"
                      bind:value={section.alt}
                    />
                    {#if section.src}
                      <img
                        src={section.src}
                        alt={section.alt}
                        class="max-w-full h-auto"
                      />
                    {/if}
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
              <p class="my-4 text-base-content">
                {#if section.children[0]?.type === "formatting"}
                  <span
                    style={Object.entries(section.children[0].style)
                      .map(([k, v]) => `${k}:${v}`)
                      .join(";")}
                  >
                    {section.children[0].children[0]}
                  </span>
                {:else}
                  {section.children[0]}
                {/if}
              </p>
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
                {#if section.src}
                  <img
                    src={section.src}
                    alt={section.alt}
                    class="max-w-full h-auto rounded-lg shadow-lg"
                  />
                  {#if section.alt}
                    <p class="text-sm text-base-content/70 mt-2 text-center">
                      {section.alt}
                    </p>
                  {/if}
                {/if}
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
</style>

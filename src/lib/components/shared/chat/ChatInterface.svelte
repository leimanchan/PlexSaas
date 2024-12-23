<script>
  import ChatMessage from "./ChatMessage.svelte"

  // Chat messages state
  let messages = $state([])
  let inputMessage = $state("")

  // Derived state for auto-scrolling
  let chatContainer = $state(null)

  // Auto scroll effect
  $effect(() => {
    if (chatContainer && messages.length) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  })

  // Handle message submission
  async function handleSubmit() {
    if (!inputMessage.trim()) return

    // Add user message
    messages = [...messages, { text: inputMessage, isUser: true }]

    // Clear input
    const userMessage = inputMessage
    inputMessage = ""

    try {
      // Add AI thinking message
      messages = [
        ...messages,
        { text: "Thinking...", isUser: false, isLoading: true },
      ]

      // TODO: Replace with your actual API call
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      // Replace thinking message with actual response
      messages = messages.slice(0, -1)
      messages = [...messages, { text: data.message, isUser: false }]
    } catch (error) {
      // Handle error state
      messages = messages.slice(0, -1)
      messages = [
        ...messages,
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
        },
      ]
    }
  }
</script>

<div
  class="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-base-100 rounded-lg shadow-xl"
>
  <!-- Chat messages -->
  <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-2">
    {#each messages as message}
      <ChatMessage message={message.text} isUser={message.isUser} />
    {/each}
  </div>

  <!-- Input form -->
  <form
    on:submit|preventDefault={handleSubmit}
    class="border-t border-base-200 p-4 bg-base-100 rounded-b-lg"
  >
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={inputMessage}
        placeholder="Type your message..."
        class="input input-bordered flex-1"
      />
      <button
        type="submit"
        class="btn btn-primary"
        disabled={!inputMessage.trim()}
      >
        Send
      </button>
    </div>
  </form>
</div>

<script>
  let { message, isUser } = $props()
</script>

<div class="chat {isUser ? 'chat-end' : 'chat-start'} mb-4">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        src={isUser ? "/user-avatar.png" : "/ai-avatar.png"}
        alt={isUser ? "User" : "AI"}
      />
    </div>
  </div>
  <div
    class="chat-bubble {isUser
      ? 'bg-primary text-primary-content'
      : 'bg-base-200'}"
  >
    {message}
  </div>
</div>

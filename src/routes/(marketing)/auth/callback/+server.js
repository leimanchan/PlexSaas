// src/routes/auth/callback/+server.js
import { redirect } from "@sveltejs/kit"
import { isAuthApiError } from "@supabase/supabase-js"

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code")
  
  if (!code) {
    throw redirect(303, "/login/sign_in")
  }

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) throw error

    // Successfully authenticated, now redirect
    const next = url.searchParams.get("next")
    return redirect(303, next || "/account")

  } catch (error) {
    console.error("Auth callback error:", error)
    if (isAuthApiError(error)) {
      return redirect(303, "/login/sign_in?verified=true")
    }
    throw error
  }
} 

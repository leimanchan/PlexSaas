import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const { data: articles, error } = await locals.supabase
      .from('knowledge_base_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      articles
    };
  } catch (error) {
    console.error('Error loading articles:', error);
    return {
      articles: []
    };
  }
};

export const actions = {
  saveArticle: async ({ request, locals }) => {
    const formData = await request.formData();
    const articleData = JSON.parse(formData.get('article') as string);

    try {
      // First perform the insert
      const { error: insertError } = await locals.supabase
        .from('knowledge_base_articles')
        .insert(articleData);

      if (insertError) throw insertError;

      // Then fetch the newly created article
      const { data, error: selectError } = await locals.supabase
        .from('knowledge_base_articles')
        .select('*')
        .eq('title', articleData.title)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (selectError) throw selectError;

      return { 
        success: true, 
        article: data 
      };
    } catch (error) {
      console.error('Error saving article:', error);
      return { 
        success: false, 
        error: 'Failed to save article' 
      };
    }
  },

  deleteArticle: async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get('id');
    console.group('🗑️ Server-side Delete Operation');
    console.log("📝 Raw ID received:", id);

    try {
      // Exactly matching the Supabase docs example
      const response = await locals.supabase
        .from('knowledge_base_articles')
        .delete()
        .eq('id', id);

      console.log("✅ Delete response:", response);

      // Check specifically for null error (Supabase returns 204 No Content on success)
      if (response.error === null) {
        return {
          type: "success",
          status: 204, // Match Supabase's status code
          message: "Article deleted successfully",
          originalId: id
        };
      } else {
        console.error("❌ Delete operation failed:", response.error);
        throw response.error;
      }

    } catch (error) {
      console.error("❌ Server error deleting article:", error);
      console.groupEnd();
      return {
        type: "error",
        status: 500,
        error: error.message,
        originalId: id
      };
    }
    console.groupEnd();
  },

  deleteSelected: async ({ request, locals }) => {
    const form = await request.formData();
    const ids = JSON.parse(form.get('ids') as string);

    try {
      const { error } = await locals.supabase
        .from('knowledge_base_articles')
        .delete()
        .in('id', ids);

      if (error) throw error;

      return {
        type: "success",
        status: 200,
        message: "Articles deleted successfully"
      };
    } catch (error) {
      console.error("Server error deleting articles:", error);
      return {
        type: "error",
        status: 500,
        error: error.message
      };
    }
  },

  uploadImage: async ({ request, locals }) => {
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File
      if (!file) throw new Error('No file uploaded')

      console.group('Server Upload Process')
      console.log('📝 Received file:', file.name)

      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const filePath = `knowledge-base/${fileName}`

      console.log('🗂️ File path:', filePath)

      // Store the upload response
      const uploadResponse = await locals.supabase.storage
        .from('KB-storage')
        .upload(filePath, file)

      if (uploadResponse.error) throw uploadResponse.error

      // Get public URL and store full response
      const urlResponse = locals.supabase.storage
        .from('KB-storage')
        .getPublicUrl(filePath)

      console.log('🔍 Full Supabase upload response:', uploadResponse)
      console.log('🔍 Full URL response:', urlResponse)

      // Return all the data for debugging
      return {
        success: true,
        debug: {
          uploadResponse,
          urlResponse,
          filePath,
          fileName
        },
        imageUrl: urlResponse.data.publicUrl
      }
    } catch (error) {
      console.error('❌ Server error:', error)
      return {
        success: false,
        error: error.message,
        debug: { error }
      }
    } finally {
      console.groupEnd()
    }
  }
} satisfies Actions;
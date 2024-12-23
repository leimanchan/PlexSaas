import { json } from '@sveltejs/kit';

// In-memory storage for development
let articles = [];

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const article = await request.json();
        
        // Generate a unique ID for the article
        article.id = crypto.randomUUID();
        
        // Add the new article
        articles.push(article);
        
        // Return the saved article
        return json(article, { status: 201 });
    } catch (error) {
        console.error('Error saving article:', error);
        return json({ error: 'Failed to save article' }, { status: 500 });
    }
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        return json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
    const articleIds = await request.json();
    
    // Remove the articles with matching IDs
    articles = articles.filter(article => !articleIds.includes(article.id));
    
    return json({ success: true });
}

// Add single article deletion endpoint
export async function DELETE({ params }) {
    const { id } = params;
    articles = articles.filter(article => article.id !== id);
    return json({ success: true });
}

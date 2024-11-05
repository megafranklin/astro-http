
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const posts = await getCollection('blog');
    // console.log(posts); // En archivo index.ts será ejecutado y mostrado -console.log()- en el Servidor
                        // index.astro ejecutado en cliente

    // console.log(request); Seguidamente: Cómo ver todas la propiedades del 'request' que eventualmente
    // podrá ser utilizado para 'response' y/o 'paramas'

    // ------------------
    // const symbols = Object.getOwnPropertySymbols(request);
    // symbols.forEach(symbol => {

    //     console.log(symbol.toString(), (request as any)[symbol]);

    // });
     // ------------------

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    // console.log(slug);

    if (slug) {

        const post = posts.filter(post => post.slug === slug);

        if (post.length === 0) {

            return new Response(JSON.stringify({ msg: `Post ${ slug } not found` }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },                
            });
            
        } else {
            
            return new Response(JSON.stringify(post), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        }

        
    } else {
        
        return new Response(JSON.stringify(posts), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    }
        
};


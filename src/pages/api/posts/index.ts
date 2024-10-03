import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = false; // Estamos en modo Hybrid y la respuesta se generará de forma dinámica desde el Servidor

export const GET: APIRoute = async ({ params, request }) => {

    const posts = await getCollection('blog');

    // console.log(posts); // Son los Posts guardados en nuestra carpeta blog

    // console.log(request); // La solicitud del Cliente

    // --------------------- Mostrar todos las valores en la propiedades del request
    
    // const symbols = Object.getOwnPropertySymbols(request);
    
    // symbols.forEach(symbol => {
        
    //     console.log(symbol.toString(), (request as any)[symbol]);
    
    // });
    
    // ---------------------

    // return new Response('Hello !!!', { status: 200 });

    // return new Response(
    //     JSON.stringify(posts), {
    //         status: 200,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    // Sacar el slug del request del Cliente

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    // console.log(slug);

    if (slug) {

        const postExist = posts.filter( post => post.slug === slug );
    
        if (postExist.length === 0) {
    
            // return new Response('Post no existe', { status: 404 });
            return new Response(
                JSON.stringify({ msg: `Post ${ slug } not found` }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

    
        } else {
            
            return new Response(
                JSON.stringify(postExist), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            };
                
            } else {
                
                return new Response(
                    JSON.stringify(posts), {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            
            };

};
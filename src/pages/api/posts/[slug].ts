import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const prerender = false; // Estamos en modo Hybrid y la respuesta se generará de forma dinámica desde el Servidor

export const GET: APIRoute = async ({ params, request }) => {

    const {slug} = params;

    const post = await getEntry('blog', slug as any);

    if(!post) {
        return new Response(
            JSON.stringify({ msg: `Post ${ slug } not found` }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });        
    };

    return new Response(
        JSON.stringify(post), {
            status: 200,
            headers: {
                    'Content-Type': 'application/json'
            }
        });
};

// Restantes Métodos del RESTful API y son independientes del slug,
// sólo que no debe estar vacío para que pueda ejecutar estos Métodos
// por la corrida de este archivo

export const POST: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(
        JSON.stringify({
            method: 'POST',
            ...body,
        }), {
            status: 200,
            headers: {
                    'Content-Type': 'application/json'
            }
        });
};

export const PUT: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(
        JSON.stringify({
            method: 'PUT',
            ...body,
        }), {
            status: 200,
            headers: {
                    'Content-Type': 'application/json'
            }
        });
};

export const PATCH: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(
        JSON.stringify({
            method: 'PATH',
            ...body,
        }), {
            status: 200,
            headers: {
                    'Content-Type': 'application/json'
            }
        });
};

export const DELETE: APIRoute = async ({ params, request }) => {

    const {slug} = params;

    return new Response(
        JSON.stringify({
            method: 'PATH',
            slug: slug,
        }), {
            status: 200,
            headers: {
                    'Content-Type': 'application/json'
            }
        });
};




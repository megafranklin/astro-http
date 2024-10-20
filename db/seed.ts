import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { name: 'Karenis', age: 50, isActive: true },
    { name: 'Esther', age: 50, isActive: false },
    { name: 'Franny', age: 31, isActive: true },
    { name: 'Daniela', age: 31, isActive: false },
    { name: 'Franklin', age: 60, isActive: true },
    { name: 'José', age: 60, isActive: false },
  ]);

  const posts = await getCollection('blog');

  await db.insert(Posts).values(
    posts.map(p => ({
      id: p.id,
      title: p.data.title,
      likes: Math.round( Math.random() * 100 ),
    }))
  );

  console.log('Seed executed');
}

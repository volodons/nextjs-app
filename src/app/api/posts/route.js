import { NextResponse } from 'next/server';

export async function GET() {
    const posts = await getPosts();
    return NextResponse.json(posts);
}

export async function POST(request) {
    const data = await request.json();
    const newPost = {
        id: Date.now(),
        ...data,
        date: new Date().toISOString()
    };
    return NextResponse.json(newPost, { status: 201 });
}

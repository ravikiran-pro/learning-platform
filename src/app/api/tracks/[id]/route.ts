import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: trackId } = await params;

    const track = await prisma.track.findUnique({
      where: { id: trackId }, // change to { slug: params.slug } if using slug
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            chapters: {
              orderBy: { order: 'asc' },
              include: {
                sections: {
                  orderBy: { order: 'asc' }
                }
              }
            }
          }
        }
      }
    });

    if (!track) {
      return NextResponse.json(
        { error: 'Track not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(track, {status: 200});
  } catch (error) {
    console.error('Error fetching track:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";

export const revalidate = 86400;

type Props = {
    params: {
        postId: string;
    };
};

export async function generateMetadata({ params: { postId } }: Props) {
    const post = await getPostByName(`${postId}.mdx`);

    if (!post) {
        title: "post not found";
    }

    return {
        title: post?.meta.title,
    };
}

export default async function Post({ params: { postId } }: Props) {
    const post = await getPostByName(`${postId}.mdx`);

    if (!post) notFound();

    const {
        meta: { title, date },
        content,
    } = post;

    const pubDate = getFormattedDate(date);

    const tags = post.meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>
            {tag}
        </Link>
    ));

    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">{title}</h2>
            <p className="mt-0 text-sm">{pubDate}</p>
            <article>{content}</article>
            <section>
                <h3>Related:</h3>
                <div className="flex flex-row gap-4">{tags}</div>
            </section>
            <p className="mb-10">
                <Link href="/">← Back to home</Link>
            </p>
        </>
    );
}

export async function generateStaticParams() {
    const posts = await getPostsMeta();

    if (!posts) return [];

    return posts.map((post) => ({
        postId: post.id,
    }));
}

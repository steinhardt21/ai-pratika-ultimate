import { ViewTransition } from "react"
import Image from "next/image"

export function ImageViewTransition({ url, articleId }: { url: string | null, articleId: string }) {
    
    console.log('image view transition: ', articleId);
    if (!url) {
        return null;
    }
    return (
        <ViewTransition name="image-view-transition">
            <Image src={url} alt="Image" width={1000} height={1000} />
        </ViewTransition>
    )
}
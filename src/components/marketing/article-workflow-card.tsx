// import Link from "next/link"
import { Link } from "next-view-transitions";

import Image from "next/image"
import { Clock } from 'lucide-react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Badge } from "../ui/badge"
import { Doc } from "@/../convex/_generated/dataModel";

const getAuthorSticker = (authorId: string): string => {
  if (authorId === 'kh76knm1qqzvsg6gxhg27f0fe17temge') {
    return '/founders/Silvio_sticker.webp';
  }
  return '/founders/Silvio_sticker.webp';
};

export function ArticleWorkflowCard({ articleWorkflow }: { articleWorkflow: Doc<"article"> & { 
  targetProfessionNames: string[];
  targetAiInstrumentNames: string[];
  authorId: string;
  content: Doc<"workflow"> 
} }) {

  const markdownComponents = {
    a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <span
        className="text-aipratika-violet dark:text-aipratika-violet-light underline cursor-pointer"
        title={href}
        {...props}
      >
        {children}
      </span>
    ),
  };

  const stickerUrl = getAuthorSticker(articleWorkflow.authorId);

  // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);
  
  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

    
  return (
    
    <Link
      prefetch={true}
      href={`/workflows/${articleWorkflow._id}`}
      key={articleWorkflow._id}
      className="bg-white dark:bg-aipratika-purple-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-aipratika-purple/10 dark:border-aipratika-cream/10 cursor-pointer relative group flex flex-col h-[420px]"
    >


      {/* Media Section - Fixed height */}
      {(articleWorkflow.videoUrl || articleWorkflow.imageUrl) && (
        <div className="relative shrink-0 w-full h-48">
          {articleWorkflow.videoUrl ? (
            // <VideoPlayer
            //   videoUrl={workflow.video_url}
            //   posterUrl={workflow.image_url}
            //   className="w-full h-full"
            // />
            <div />
          ) : articleWorkflow.imageUrl ? (
            <Image placeholder="blur"       blurDataURL={rgbDataURL(237, 181, 6)} loading="eager" decoding="sync"
            className="w-full h-full object-cover" style={{ viewTransitionName: `image-${articleWorkflow._id}`}} src={articleWorkflow.imageUrl || ""} alt={articleWorkflow.title || ""} width={1000} height={1000} />

          ) : null}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-aipratika-violet/80 via-aipratika-violet/40 to-aipratika-violet-light/10 z-10"></div>

          {/* Author Sticker */}
        
              <div className="absolute bottom-[-3%] right-1 z-30">
                <Image
                  
                  width={100}
                  height={100}
                  src={stickerUrl}
                  alt={`sticker`}
                  className="object-contain drop-shadow-lg"
                />
              </div>

          {/* Remove Button - Always show BookmarkCheck since all workflows here are saved */}
          {/* {isSignedIn && (
                    <Button
                      onClick={(e) => handleRemoveWorkflow(e, workflow.id)}
                      disabled={workflowLoadingStates[workflow.id]}
                      className="absolute cursor-pointer top-3 right-3 p-2.5 bg-white/95 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 group disabled:opacity-50 disabled:cursor-not-allowed z-25"
                    >
                      {workflowLoadingStates[workflow.id] ? (
                        <div className="w-4 h-4 border-2 border-aipratika-purple/30 border-t-aipratika-purple rounded-full animate-spin" />
                      ) : (
                        <BookmarkCheck className="w-4 h-4 text-aipratika-violet" />
                      )}
                    </Button>
                  )} */}
        </div>
      )}

      {/* Content Section - Flex grow to fill remaining space */}
      <div className={`flex flex-col ${(articleWorkflow.videoUrl || articleWorkflow.imageUrl)
        ? 'flex-1 p-4 sm:p-5 md:p-6' // Fill remaining space after media
        : 'flex-1 p-4 sm:p-5 md:p-6 min-h-[420px]' // Full height for cards without media
        }`}>
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3">
          <h3 style={{ viewTransitionName: `title-${articleWorkflow._id}` }} className="font-semibold text-aipratika-purple dark:text-aipratika-cream leading-tight text-base md:text-lg line-clamp-2">
            {articleWorkflow.title}
          </h3>
          {/* Remove Button for cards without media */}
          {/* {!(workflow.video_url || workflow.image_url) && isSignedIn && (
            <button
              onClick={(e) => handleRemoveWorkflow(e, workflow.id)}
              disabled={workflowLoadingStates[workflow.id]}
              className="ml-3 p-1.5 hover:bg-aipratika-purple/5 dark:hover:bg-aipratika-cream/5 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {workflowLoadingStates[workflow.id] ? (
                <div className="w-5 h-5 border-2 border-aipratika-purple/30 border-t-aipratika-purple rounded-full animate-spin" />
              ) : (
                <BookmarkCheck className="w-5 h-5 text-aipratika-violet" />
              )}
            </button>
          )} */}
        </div>

        {/* Description Section - Fixed height with overflow handling */}
        <div className="prose-aipratika text-aipratika-purple/70 dark:text-aipratika-cream/70 leading-relaxed mb-4 flex-shrink-0 text-sm line-clamp-2 overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {articleWorkflow.description}
          </ReactMarkdown>
        </div>

        {/* Footer Section - Push to bottom */}
        <div className="mt-auto space-y-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {articleWorkflow.targetProfessionNames.slice(0, 3).map((category) => {
              // const categoryType = getCategoryType(category);
              const categoryType = "role";

              return (
                <Badge
                  key={category}
                  variant="secondary"
                  className={`text-xs font-medium transition-colors ${categoryType === 'role'
                      ? 'bg-aipratika-violet/10 text-aipratika-violet border-aipratika-violet/20 hover:bg-aipratika-violet/20'
                      : categoryType === 'tool'
                        ? 'bg-aipratika-blue/10 text-aipratika-blue border-aipratika-blue/20 hover:bg-aipratika-blue/20'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }`}
                >
                  {category}
                </Badge>
              );
            })}
            {/* {workflow.categories.length > 3 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="text-xs text-aipratika-purple/60 dark:text-aipratika-cream/60 bg-aipratika-purple/5 dark:bg-aipratika-cream/5 hover:bg-aipratika-purple/10 dark:hover:bg-aipratika-cream/10 transition-colors"
                  >
                    +{workflow.categories.length - 3}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs bg-white dark:bg-aipratika-purple-dark border border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-lg"
                >
                 <div className="flex flex-wrap gap-1">
                    {workflow.categories.slice(3).map((category) => {
                      const categoryType = getCategoryType(category);
                      return (
                        <Badge
                          key={category}
                          variant="secondary"
                          className={`text-xs font-medium transition-colors ${categoryType === 'role'
                              ? 'bg-aipratika-violet/10 text-aipratika-violet border-aipratika-violet/20 hover:bg-aipratika-violet/20'
                              : categoryType === 'tool'
                                ? 'bg-aipratika-blue/10 text-aipratika-blue border-aipratika-blue/20 hover:bg-aipratika-blue/20'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                            }`}
                        >
                          {category}
                        </Badge>
                      );
                    })}
                  </div> 
                </TooltipContent>
              </Tooltip>
            )} */}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between pt-2 border-t border-aipratika-purple/5 dark:border-aipratika-cream/5">
            <div className="flex items-center gap-4 text-xs text-aipratika-purple/60 dark:text-aipratika-cream/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">{articleWorkflow.timing}</span>
              </div>
              {articleWorkflow.difficulty && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${articleWorkflow.difficulty === 'beginner' ? 'bg-green-500' :
                      articleWorkflow.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  <span className="font-medium">{articleWorkflow.difficulty}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


import Link from "next/link"
import Image from "next/image"
import { Star, Clock, BookmarkCheck } from 'lucide-react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ViewTransition } from 'react'

import { Badge } from "../ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { Doc } from "@/../convex/_generated/dataModel";
import { ImageViewTransition } from "./image-view-tranisition"

// Author sticker mapping function
const getAuthorSticker = (authorName: string): string | null => {
  const name = authorName.toLowerCase();
  if (name.includes('silvio')) {
    return '/founders/Silvio_sticker.png';
  }
  if (name.includes('alex')) {
    return '/founders/Alex_sticker.png';
  }
  return null;
};

export function ArticleWorkflowCard({ articleWorkflow }: { articleWorkflow: Doc<"article"> & { content: Doc<"workflow"> } }) {

  const markdownComponents = {
    a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <span
        className="text-aipratika-orange dark:text-aipratika-orange-light underline cursor-pointer"
        title={href}
        {...props}
      >
        {children}
      </span>
    ),
  };

  
  return (
    <Link
      prefetch={true}
      href={`/workflows/${articleWorkflow._id}`}
      key={articleWorkflow._id}
      className="bg-white dark:bg-aipratika-green-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-aipratika-green/10 dark:border-aipratika-cream/10 cursor-pointer relative group flex flex-col h-[420px]"
    >
      {/* Media Section - Fixed height */}

      <ImageViewTransition url={articleWorkflow.imageUrl ?? null} articleId={articleWorkflow._id} />

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
          
            <Image
              src={articleWorkflow.imageUrl}
              alt={articleWorkflow.title ?? ""}
              className="w-full h-full object-cover"
              fill={true}
            />
          ) : null}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-aipratika-orange/80 via-aipratika-orange/40 to-aipratika-orange-light/10 z-10"></div>

          {/* Author Sticker */}
          {/* {(() => {
            const stickerUrl = getAuthorSticker(articleWorkflow.content.authorId);
            return stickerUrl ? (
              <div className="absolute bottom-0 right-1 z-30">
                <Image
                  src={stickerUrl}
                  alt={`${articleWorkflow.content.authorId} sticker`}
                  className="w-33 h-33 object-contain drop-shadow-lg"
                />
              </div>
            ) : null;
          })()} */}

          {/* Remove Button - Always show BookmarkCheck since all workflows here are saved */}
          {/* {isSignedIn && (
                    <Button
                      onClick={(e) => handleRemoveWorkflow(e, workflow.id)}
                      disabled={workflowLoadingStates[workflow.id]}
                      className="absolute cursor-pointer top-3 right-3 p-2.5 bg-white/95 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 group disabled:opacity-50 disabled:cursor-not-allowed z-25"
                    >
                      {workflowLoadingStates[workflow.id] ? (
                        <div className="w-4 h-4 border-2 border-aipratika-green/30 border-t-aipratika-green rounded-full animate-spin" />
                      ) : (
                        <BookmarkCheck className="w-4 h-4 text-aipratika-orange" />
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
          <h3 className="font-semibold text-aipratika-green dark:text-aipratika-cream leading-tight text-base md:text-lg line-clamp-2">
            {articleWorkflow.title}
          </h3>
          {/* Remove Button for cards without media */}
          {/* {!(workflow.video_url || workflow.image_url) && isSignedIn && (
            <button
              onClick={(e) => handleRemoveWorkflow(e, workflow.id)}
              disabled={workflowLoadingStates[workflow.id]}
              className="ml-3 p-1.5 hover:bg-aipratika-green/5 dark:hover:bg-aipratika-cream/5 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {workflowLoadingStates[workflow.id] ? (
                <div className="w-5 h-5 border-2 border-aipratika-green/30 border-t-aipratika-green rounded-full animate-spin" />
              ) : (
                <BookmarkCheck className="w-5 h-5 text-aipratika-orange" />
              )}
            </button>
          )} */}
        </div>

        {/* Description Section - Fixed height with overflow handling */}
        <div className="prose-aipratika text-aipratika-green/70 dark:text-aipratika-cream/70 leading-relaxed mb-4 flex-shrink-0 text-sm line-clamp-2 overflow-hidden">
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
            {/* {workflow.categories.slice(0, 3).map((category) => {
              // const categoryType = getCategoryType(category);
              const categoryType = "role";

              return (
                <Badge
                  key={category}
                  variant="secondary"
                  className={`text-xs font-medium transition-colors ${categoryType === 'role'
                      ? 'bg-aipratika-orange/10 text-aipratika-orange border-aipratika-orange/20 hover:bg-aipratika-orange/20'
                      : categoryType === 'tool'
                        ? 'bg-aipratika-blue/10 text-aipratika-blue border-aipratika-blue/20 hover:bg-aipratika-blue/20'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }`}
                >
                  {category}
                </Badge>
              );
            })} */}
            {/* {workflow.categories.length > 3 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="text-xs text-aipratika-green/60 dark:text-aipratika-cream/60 bg-aipratika-green/5 dark:bg-aipratika-cream/5 hover:bg-aipratika-green/10 dark:hover:bg-aipratika-cream/10 transition-colors"
                  >
                    +{workflow.categories.length - 3}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs bg-white dark:bg-aipratika-green-dark border border-aipratika-green/10 dark:border-aipratika-cream/10 shadow-lg"
                >
                 <div className="flex flex-wrap gap-1">
                    {workflow.categories.slice(3).map((category) => {
                      const categoryType = getCategoryType(category);
                      return (
                        <Badge
                          key={category}
                          variant="secondary"
                          className={`text-xs font-medium transition-colors ${categoryType === 'role'
                              ? 'bg-aipratika-orange/10 text-aipratika-orange border-aipratika-orange/20 hover:bg-aipratika-orange/20'
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
          <div className="flex items-center justify-between pt-2 border-t border-aipratika-green/5 dark:border-aipratika-cream/5">
            <div className="flex items-center gap-4 text-xs text-aipratika-green/60 dark:text-aipratika-cream/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium"></span>
              </div>
              {/* {articleWorkflow.content.difficulty && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${articleWorkflow.content.difficulty === 'beginner' ? 'bg-green-500' :
                      articleWorkflow.content.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  <span className="font-medium">{articleWorkflow.content.difficulty}</span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


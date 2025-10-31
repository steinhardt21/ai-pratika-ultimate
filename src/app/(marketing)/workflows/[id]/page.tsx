import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type WorkflowPageProps = {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: WorkflowPageProps): Promise<Metadata> {
  const params = await props.params;
  const article = await fetchQuery(api.article.getWorkflowArticleById, { id: params.id as Id<"article"> });

  if (!article) {
    return notFound();
  }

  const title = `${article.title} | AI Pratika`;

  return {
    title,
    openGraph: {
      title,
      images: [article.imageUrl || ""],
    },
  };
}

export async function generateStaticParams() {
  const workflows = await fetchQuery(api.article.getArticlesByType, { type: "workflow" });
  return workflows.map((workflow) => ({
    id: workflow._id,
  }));
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { id } = await params;
  const articleWorkflow = await fetchQuery(api.article.getWorkflowArticleById, { id: id as Id<"article"> });

  if (!articleWorkflow) {
    return notFound();
  }

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-500/15 to-green-400/10 dark:from-green-400/20 dark:to-green-300/10 text-green-600 dark:text-green-400 border-green-500/20 dark:border-green-400/30';
      case 'intermediate':
        return 'bg-gradient-to-r from-yellow-500/15 to-yellow-400/10 dark:from-yellow-400/20 dark:to-yellow-300/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 dark:border-yellow-400/30';
      case 'advanced':
        return 'bg-gradient-to-r from-red-500/15 to-red-400/10 dark:from-red-400/20 dark:to-red-300/10 text-red-600 dark:text-red-400 border-red-500/20 dark:border-red-400/30';
      default:
        return 'bg-gradient-to-r from-aipratika-blue/15 to-aipratika-blue/10 dark:from-aipratika-blue-light/20 dark:to-aipratika-blue-light/10 text-aipratika-blue dark:text-aipratika-blue-light border-aipratika-blue/20 dark:border-aipratika-blue-light/30';
    }
  };

  const instructor = {
    name: `${articleWorkflow.workflow?.authorFirstName} ${articleWorkflow.workflow?.authorLastName}`,
    title: 'Founder',
    avatar: articleWorkflow.workflow?.authorFirstName === 'Silvio' ? '/founders/Silvio_sticker.webp' : '/founders/Alex_sticker.webp'
  };

  return (
    // <div>
    //     <h1>{id}</h1>
    //     <Image src={articleWorkflow.imageUrl || ""} style={{ viewTransitionName: `image-${id}`}} alt={articleWorkflow.title || ""} width={1000} height={1000} />
    // </div>

    <div className="bg-aipratika-cream dark:bg-aipratika-purple-dark bg-texture font-wotfard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link href="/workflows" className="text-aipratika-purple dark:text-aipratika-cream hover:text-aipratika-violet dark:hover:text-aipratika-violet-light transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Title and Brand */}
        <div className="mb-6 sm:mb-8">
          <h1 style={{ viewTransitionName: `title-${articleWorkflow._id}` }} className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-aipratika-purple dark:text-aipratika-cream mb-4 sm:mb-6 leading-tight">
            {articleWorkflow.title}
          </h1>
        </div>

        {/* Mobile Instructor and Categories - Above content on mobile */}
        <div className="lg:hidden mb-6">
          <Card className="bg-white dark:bg-aipratika-purple/20 border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-lg">
            <CardContent className="p-3 sm:p-4">
              {/* Instructor */}
              {instructor && (
                <>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border ${getDifficultyStyle(articleWorkflow.difficulty!)}`}
                  >
                    {articleWorkflow.difficulty!}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      fill
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-aipratika-purple dark:text-aipratika-cream">{instructor.name}</h4>
                      <p className="text-xs sm:text-sm text-aipratika-purple/70 dark:text-aipratika-cream/70">{instructor.title}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Personas Section */}
              {/* {professions.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {professions.map((profession) => (
                      <span
                        key={profession}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-gradient-to-r from-aipratika-blue/15 to-aipratika-blue/10 dark:from-aipratika-blue-light/20 dark:to-aipratika-blue-light/10 text-blue-700 dark:text-blue-300 border border-aipratika-blue/20 dark:border-aipratika-blue-light/30"
                      >
                        {profession}
                      </span>
                    ))}
                  </div>
                </>
              )} */}

              {/* AI Tools Section */}
              {/* {aiInstruments.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {aiInstruments.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-gradient-to-r from-aipratika-violet/15 to-aipratika-violet/10 dark:from-aipratika-violet-light/20 dark:to-aipratika-violet-light/10 text-aipratika-violet dark:text-aipratika-violet-light border border-aipratika-violet/20 dark:border-aipratika-violet-light/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </>
              )} */}

              {/* Action Buttons */}
              <div className="space-y-2.5 sm:space-y-3">
                {/* <SaveButton 
                  workflowId={workflow.id} // This is actually the article ID
                  className="w-full h-10 sm:h-11 text-xs sm:text-sm font-medium border-2 border-aipratika-violet dark:border-aipratika-violet-light text-aipratika-violet dark:text-aipratika-violet-light hover:bg-aipratika-violet dark:hover:bg-aipratika-violet-light hover:text-white dark:hover:text-aipratika-purple transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] rounded-lg" 
                />
                <ShareButton 
                  title={title}
                  description={description}
                  className="w-full h-10 sm:h-11 text-xs sm:text-sm font-medium border-2 border-aipratika-purple/30 dark:border-aipratika-cream/40 text-aipratika-purple dark:text-aipratika-cream hover:bg-aipratika-purple/10 dark:hover:bg-aipratika-cream/20 hover:border-aipratika-purple/50 dark:hover:border-aipratika-cream/60 hover:text-aipratika-purple dark:hover:text-aipratika-purple-dark transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] rounded-lg"
                /> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-[calc(100%-21rem)]">
            {/* Video/Image Section */}
            {(articleWorkflow.videoUrl || articleWorkflow.imageUrl) && (
              <div className="mb-6 sm:mb-8">
                {articleWorkflow.videoUrl ? (
                  // <VideoPlayer
                  //   videoUrl={video_url}
                  //   posterUrl={image_url}
                  //   className=""
                  // />
                  <div />
                ) : articleWorkflow.imageUrl ? (
                  <div className="aspect-video w-full">
                    <Image
                      src={articleWorkflow.imageUrl || ""}
                      alt={articleWorkflow.title || ""}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ viewTransitionName: `image-${articleWorkflow._id}` }}
                      width={1000}
                      height={1000}
                    />
                  </div>
                ) : null}
              </div>
            )}





            <Card className="mb-6 sm:mb-8 bg-white dark:bg-aipratika-purple/20 border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-aipratika-purple dark:text-aipratika-cream mb-4">TL;DR</h2>
                <div className="prose-aipratika text-sm sm:text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{articleWorkflow.description}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Conditional rendering based on authentication */}
            {/* {isAuthenticated ? ( */}
            <>
              {articleWorkflow.steps.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  {articleWorkflow.steps.map((step) => (
                    <Card key={step.order} className="bg-white dark:bg-aipratika-purple/20 border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-lg">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-8 h-8 bg-linear-to-r from-aipratika-violet to-aipratika-violet-light rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{step.order}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg sm:text-xl font-semibold text-aipratika-purple dark:text-aipratika-cream mb-3">
                              {step.title}
                            </h2>

                            {step.imageUrl && (
                              <div className="mb-4 aspect-video w-full">
                                <Image
                                  src={step.imageUrl || ""}
                                  alt={step.title || ""}
                                  width={1000}
                                  height={1000}
                                  className="w-full h-full rounded-lg shadow-sm border border-aipratika-purple/10 dark:border-aipratika-cream/10 object-cover"
                                />
                              </div>
                            )}

                            <div className="prose-aipratika text-sm sm:text-base">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.content}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* FAQs - Only rendered for authenticated users */}
              {articleWorkflow.faqs.length > 0 && (
                <Card className="mt-6 sm:mt-8 bg-white dark:bg-aipratika-purple/20 border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    {/* FAQ Header */}
                    <div className="p-6 sm:p-8 border-b border-aipratika-purple/10 dark:border-aipratika-cream/10">
                      <div className="flex items-center gap-3">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-aipratika-purple dark:text-aipratika-cream">
                            FAQ
                          </h2>
                          <p className="text-sm text-aipratika-purple/60 dark:text-aipratika-cream/60 mt-0.5">
                            Tutto ciò che devi sapere su questo workflow
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="p-4 sm:p-6">
                      <Accordion type="single" collapsible className="w-full space-y-3">
                        {articleWorkflow.faqs.map((faqItem, index) => (
                          <AccordionItem
                            key={faqItem._id}
                            value={faqItem._id}
                            className="border border-aipratika-purple/10 dark:border-aipratika-cream/10 rounded-xl overflow-hidden bg-white/50 dark:bg-aipratika-purple/10 hover:border-aipratika-violet/30 dark:hover:border-aipratika-violet-light/30 transition-all duration-300 group"
                          >
                            <AccordionTrigger className="px-5 py-4 text-left text-base sm:text-lg font-semibold text-aipratika-purple dark:text-aipratika-cream hover:text-aipratika-violet dark:hover:text-aipratika-violet-light transition-colors duration-200 [&[data-state=open]]:text-aipratika-violet dark:[&[data-state=open]]:text-aipratika-violet-light hover:no-underline group-hover:bg-aipratika-violet/5 dark:group-hover:bg-aipratika-violet-light/5">
                              <span className="flex items-start gap-3 pr-4">
                                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-aipratika-violet/10 dark:bg-aipratika-violet-light/10 text-aipratika-violet dark:text-aipratika-violet-light text-xs font-bold flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="flex-1">{faqItem.question}</span>
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-5">
                              <div className="prose-aipratika text-sm sm:text-base">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{faqItem.answer || ''}</ReactMarkdown>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
            {/* // ) : (
            //   <ArticlePaywall />
            // )} */}

          </div>

          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-80 relative">
            <div className="sticky top-4">
              <Card className="bg-white py-0 dark:bg-aipratika-purple/20 border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-lg">
                <CardContent className="p-6">
                  {/* Instructor */}
                  {instructor && (
                    <div>
                      <h3 className="text-lg font-semibold text-aipratika-purple dark:text-aipratika-cream mb-4">Descrizione</h3>
                      {/* <span
                           className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border ${getDifficultyStyle(difficulty)}`}
                         >
                           {difficulty}
                         </span> */}
                      <div className="flex items-center gap-3 mb-4"></div>
                      <div className="flex items-center gap-3 mb-6">
                        <Image
                          fill
                          src={instructor.avatar}
                          alt={instructor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-aipratika-purple dark:text-aipratika-cream">{instructor.name}</h4>
                          <p className="text-sm text-aipratika-purple/70 dark:text-aipratika-cream/70">{instructor.title}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Publication Date */}
                  {articleWorkflow.updatedAt && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-aipratika-purple/70 dark:text-aipratika-cream/70">
                        <Clock className="w-4 h-4" />
                        <span>Pubblicato il {new Date(articleWorkflow.updatedAt!).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  )}

                  {/* Personas Section */}
                  {/* {professions.length > 0 && (
                    <>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {professions.map((profession) => (
                          <span
                            key={profession}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-aipratika-violet/15 to-aipratika-violet/10 dark:from-aipratika-violet-light/20 dark:to-aipratika-violet-light/10 text-aipratika-violet dark:text-aipratika-violet-light border border-aipratika-violet/20 dark:border-aipratika-violet-light/30 hover:border-aipratika-violet/40 dark:hover:border-aipratika-violet-light/50 transition-all duration-200 hover:scale-105"
                            
                          >
                            {profession}
                          </span>
                        ))}
                      </div>
                    </>
                  )} */}

                  {/* AI Tools Section */}
                  {/* {aiInstruments.length > 0 && (
                    <>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {aiInstruments.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-aipratika-blue/15 to-aipratika-blue/10 dark:from-aipratika-blue-light/20 dark:to-aipratika-blue-light/10 text-blue-700 dark:text-blue-300 border border-aipratika-blue/20 dark:border-aipratika-blue-light/30 hover:border-aipratika-blue/40 dark:hover:border-aipratika-blue-light/50 transition-all duration-200 hover:scale-105"

                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </>
                  )} */}

                  {/* Action Buttons */}
                  {/* <div className="space-y-3">
                    <SaveButton 
                      workflowId={workflow.id} // This is actually the article ID
                      className="w-full cursor-pointer border-2 border-aipratika-violet dark:border-aipratika-violet-light text-aipratika-violet dark:text-aipratika-violet-light hover:bg-aipratika-violet dark:hover:bg-aipratika-violet-light hover:text-white dark:hover:text-aipratika-purple transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] rounded-lg" 
                    />
                    <ShareButton 
                      title={title}
                      description={description}
                      className="w-full border-2 border-aipratika-purple/30 dark:border-aipratika-cream/40 text-aipratika-purple dark:text-aipratika-cream hover:bg-aipratika-purple/10 dark:hover:bg-aipratika-cream/20 hover:border-aipratika-purple/50 dark:hover:border-aipratika-cream/60 hover:text-aipratika-purple dark:hover:text-aipratika-purple-dark transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] rounded-lg"
                    />
                  </div> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
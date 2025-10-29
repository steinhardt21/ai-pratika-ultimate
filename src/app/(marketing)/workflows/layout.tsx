interface WorkflowsLayoutProps {
    children: React.ReactNode;
  }
  
  export default function WorkflowsLayout({ children }: WorkflowsLayoutProps) {
    return (
      <div className="min-h-screen bg-aipratika-cream dark:bg-aipratika-green-dark bg-texture">
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-2 sm:space-y-4">
              <h1 className="font-bricolage text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                AI <span className="text-aipratika-orange dark:text-aipratika-orange-light">Workflows</span> 
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-aipratika-green/60 dark:text-aipratika-cream/60 max-w-3xl mx-auto leading-relaxed">
                I workflow AI personalizzati per ogni ruolo e strumento AI
              </p>
            </div>
          </div>
        </section>
  
        {children}
      </div>
    );
  }
  
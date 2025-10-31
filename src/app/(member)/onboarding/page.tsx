import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { InteractiveAnimatedGridPattern } from "~/components/interactive-animated-grid-pattern"
import { Brain } from 'lucide-react'
// import { ProfessionSelector } from './_components/profession-selector'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-aipratika-cream dark:bg-aipratika-purple-dark">
      {/* <InteractiveAnimatedGridPattern
        width={60}
        height={60}
        squares={[25, 10]}
        numAnimatedSquares={25}
        animationDuration={3}
        maxOpacity={0.3}
        enableHover={true}
        hoverTransitionDuration={300}
        hoverPersistDuration={1000}
        maxIconsPerSquare={1}
        className={cn(
          "text-aipratika-violet/20 dark:text-aipratika-violet-light/20",
          "[mask-image:linear-gradient(rgb(0_0_0_/_95%),transparent)]",
          "inset-x-0 inset-y-[-20%] h-[140%]",
        )}
        baseSquareClassName="hover:fill-aipratika-violet/10 dark:hover:fill-aipratika-violet-light/10"
        animatedSquareClassName="drop-shadow-sm"
      />
       */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-16">
        <div className="w-full max-w-4xl my-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-10 h-10 text-aipratika-violet dark:text-aipratika-violet-light" />
              <h1 className="font-bricolage text-4xl md:text-5xl font-bold text-aipratika-purple dark:text-aipratika-cream">
                Benvenuto in AI Pratika!
              </h1>
            </div>
            <p className="font-bricolage text-lg md:text-xl text-aipratika-purple/70 dark:text-aipratika-cream/70 max-w-2xl mx-auto">
              Per personalizzare la tua esperienza e mostrarti i workflow più rilevanti, 
              seleziona la professione che ti rappresenta meglio
            </p>
          </div>

          <Card className="bg-white/95 dark:bg-aipratika-purple-dark/95 backdrop-blur-sm border-aipratika-purple/10 dark:border-aipratika-cream/10 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-bricolage text-2xl font-semibold text-aipratika-purple dark:text-aipratika-cream">
                Scegli le tue professioni
              </CardTitle>
              <CardDescription className="text-aipratika-purple/60 dark:text-aipratika-cream/60">
                Seleziona tutte le professioni che ti rappresentano per ricevere workflow AI personalizzati
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <ProfessionSelector /> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

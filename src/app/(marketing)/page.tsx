import { BorderBeam } from "@/components/ui/border-beam";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { InteractiveAnimatedGridPattern } from "@/components/marketing/landing/interactive-animated-grid-pattern";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="h-[90vh] relative flex flex-1 w-full items-center justify-center overflow-hidden bg-aipratika-cream dark:bg-aipratika-purple-dark">
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="relative z-10 pointer-events-none font-bricolage text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-black mb-6 text-center leading-[0.9] tracking-tight text-aipratika-purple dark:text-aipratika-cream">
            AI Pratika
          </h1>

          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="relative z-10 pointer-events-none font-bricolage text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center leading-tight text-aipratika-purple/90 dark:text-aipratika-cream/90">
              Capire l&apos;AI è
              <AnimatedGradientText
                speed={1}
                colorFrom="#7466d7"
                colorTo="#06b6d4"
                className="text-4xl font-semibold tracking-tight"
              >
                {' '}  importante. {''}
              </AnimatedGradientText>
              <br className="hidden sm:block" />
              Metterla in pratica fa tutta la
              <AnimatedGradientText
                speed={1}
                colorFrom="#7466d7"
                colorTo="#06b6d4"
                className="text-4xl font-semibold tracking-tight"
              >
                {' '}  differenza. {''}
              </AnimatedGradientText>
            </h2>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {/* <AvatarCircles avatarUrls={avatars} numPeople={999} /> */}
          </div>

          {/* Messaging */}
          <h3 className="font-bricolage z-10 pointer-events-none text-lg sm:text-xl font-semibold text-aipratika-purple dark:text-aipratika-cream">
            Unisciti alla community
          </h3>

          {/* CTA Button */}

          <Link
            prefetch
            href="/register"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "overflow-hidden font-bricolage relative z-10 bg-aipratika-orange hover:bg-aipratika-orange-dark dark:bg-aipratika-orange-light dark:hover:bg-aipratika-orange text-white font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-aipratika-orange/25 hover:-translate-y-0.5 text-sm"
            )}
          >
            Registrati
            <BorderBeam
              size={100}
              initialOffset={20}
              className="from-transparent via-yellow-500 to-transparent"
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
              }}
            />
          </Link>
        </div>
      </div>

      <Suspense fallback={<div className="absolute inset-0 bg-linear-to-br from-aipratika-cream/50 to-transparent" />}>
        <InteractiveAnimatedGridPattern
          width={60}
          height={60}
          squares={[25, 12]} // Reduced from [35, 15] to [25, 12] = 300 instead of 525 elements
          numAnimatedSquares={20} // Reduced from 35 to 20
          animationDuration={2.5}
          maxOpacity={0.7}
          enableHover={true}
          hoverTransitionDuration={250}
          hoverPersistDuration={1500}
          maxIconsPerSquare={2}
          className={cn(
            "text-aipratika-orange dark:text-aipratika-orange-light",
            "mask-[linear-gradient(rgb(0_0_0/95%),transparent)]",
            "inset-x-0 inset-y-[-20%] h-[140%] skew-y-6",
          )}
          baseSquareClassName="hover:fill-aipratika-orange/30 dark:hover:fill-aipratika-orange-light/30"
          animatedSquareClassName="drop-shadow-lg"
        />
      </Suspense>
    </section>
  );
}

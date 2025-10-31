import { Mail, Users, Lightbulb, Compass, Target, Clock, Wrench, CheckCircle } from 'lucide-react';

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-aipratika-cream dark:bg-aipratika-green-dark bg-texture">
      <section className="px-4 md:px-6 lg:px-10 py-8 md:py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-aipratika-green dark:text-aipratika-cream leading-tight">
              Manifesto di AI Pratika
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-aipratika-orange mb-4 md:mb-6 leading-tight">
              Non studiare l&apos;AI. Usala.
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-aipratika-green/80 dark:text-aipratika-cream/80 leading-relaxed">
              Viviamo in un&apos;epoca in cui l&apos;Intelligenza Artificiale viene raccontata con una serie di news vestite di hype, noi facciamo una scelta diversa.
            </p>
          </div>

          <div className="mb-12 md:mb-16">
            <div className="bg-aipratika-orange/10 p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <p className="text-aipratika-green dark:text-aipratika-cream/90 font-medium text-base md:text-lg mb-3 md:mb-4 leading-relaxed">
                <strong>Non ti insegniamo l&apos;AI. La usiamo per risolvere problemi veri.</strong>
              </p>
              <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
                Ogni contenuto che trovi su AI Pratika nasce da una domanda concreta: <em>&ldquo;Come posso risparmiare tempo su questo?&rdquo;</em>, <em>&ldquo;Come automatizzo questa parte del mio lavoro?&rdquo;</em>, <em>&ldquo;Come semplifico questo processo senza diventare un ingegnere?&rdquo;</em>
              </p>
              <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
                Se anche tu ti fai queste domande, sei nel posto giusto.
              </p>
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Risolviamo problemi, non spieghiamo teorie
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              Qui non troverai corsi infiniti o spiegazioni accademiche. Ogni guida, video o risorsa parte da un job-to-be-done reale, testato nel lavoro quotidiano di chi produce, vende, gestisce, comunica.
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              Ti mostriamo come abbiamo risolto <strong>quella</strong> cosa. Ti spieghiamo cosa serve, cosa no, e come lo puoi replicare anche tu. Subito.
            </p>
          </div>

          {/* Non devi essere un tecnico */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Wrench className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Non devi essere un tecnico. Devi sapere cosa ti serve.
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              Hai un problema? Noi ti portiamo una soluzione pronta. In italiano semplice, con tool accessibili, collegati in modo intelligente. Nessuna dimostrazione gonfiata a scopo sensazionalistico e nessun tecnicismo inutile.
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              Automazioni, workflow, micro SaaS su misura: <strong>applichi, non studi</strong>.
            </p>
          </div>

          {/* Se hai poco tempo */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Se hai poco tempo, sei nel posto giusto
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              La maggior parte delle persone che ci segue ha un lavoro vero, non giornate intere da dedicare alla ricerca del tool perfetto. Manager, freelancer, imprenditori: tutti ci dicono la stessa cosa. <em>&ldquo;Non ho tempo per imparare.&rdquo;</em>
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              Noi partiamo proprio da lì: <strong>contenuti brevi, plug & play, pensati per essere usati, non solo guardati.</strong>
            </p>
          </div>

          {/* L'AI funziona */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                L&apos;AI funziona. Ma non tutta.
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              Troppa AI oggi viene venduta come panacea. Noi ti diciamo anche <strong>cosa NON usare</strong>, perché far perdere tempo (e soldi) è il contrario di ciò che vogliamo.
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              Ti mostriamo ciò che abbiamo testato. E se non funziona, lo diciamo.
            </p>
          </div>

          {/* Costruiamo sistemi */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Compass className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Costruiamo sistemi, non collezioniamo tool
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              Un&apos;app da sola non fa la differenza. Un flusso ben progettato, sì.
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              Ogni soluzione che proponiamo è parte di un ecosistema funzionante, collegato, ottimizzato. <strong>Non vogliamo riempirti di strumenti, vogliamo alleggerirti il lavoro.</strong>
            </p>
          </div>

          {/* Il nostro modo di lavorare */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Il nostro modo di lavorare
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              Siamo Silvio Luchetti (AI Process Expert) e Alex (AI Developer Expert). Ogni settimana testiamo soluzioni vere e le trasformiamo in prodotti pratici, tutorial visivi e risorse scaricabili.
            </p>
          </div>

          {/* A chi ci rivolgiamo */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                A chi ci rivolgiamo
              </h2>
            </div>
            <div className="space-y-3 md:space-y-4 text-aipratika-green dark:text-aipratika-cream/90 leading-relaxed">
              <p>
                <strong>A tutte i professionisti</strong> che vogliono imparare ad applicare l&apos;intelligenza artificiale al proprio lavoro, in modo concreto e sostenibile.
              </p>
              <p>
                A chi è stanco di sprecare tempo in attività ripetitive.
              </p>
              <p>
                A chi cerca modi per lavorare meglio, più velocemente, con meno fatica.
              </p>
              <p>
                A chi ha in mente un obiettivo e vuole usare l&apos;AI per raggiungerlo prima.
              </p>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mt-4 md:mt-6 leading-relaxed">
              Non importa da dove parti. Importa che tu voglia risolvere.
            </p>
          </div>

          {/* Il nostro impegno */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Il nostro impegno
              </h2>
            </div>
            <ul className="text-aipratika-green dark:text-aipratika-cream/90 space-y-2 md:space-y-3 leading-relaxed">
              <li>Parlarti con chiarezza, mai con superiorità</li>
              <li>Farti risparmiare tempo, non fartelo perdere</li>
              <li>Darti solo soluzioni testate, non hype</li>
              <li>Creare una community di alto livello dove imparare significa fare</li>
            </ul>
          </div>

          {/* Inizia da qui */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 bg-aipratika-orange/10 rounded-full flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-aipratika-orange" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-aipratika-green dark:text-aipratika-cream leading-tight">
                Inizia da qui
              </h2>
            </div>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              Sfoglia le nostre automazioni gratuite, guarda un workflow che abbiamo già usato, oppure scrivici e raccontaci cosa vuoi risolvere.
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-3 md:mb-4 leading-relaxed">
              Perché l&apos;AI non è il futuro. È lo strumento giusto <strong>adesso</strong>. Basta saperlo usare.
            </p>
            <p className="text-aipratika-green dark:text-aipratika-cream/90 mb-6 md:mb-8 leading-relaxed">
              E noi siamo qui per questo.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
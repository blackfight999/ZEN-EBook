/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, SerenityPond } from './components/ZenScene';
import { BreathingPacer, GratitudeGarden, WisdomQuotes } from './components/Practices';
import { Leaf, Menu, X, Wind, Heart, Sparkles, Sun } from 'lucide-react';

const GuideCard = ({ name, role, quote, delay }: { name: string, role: string, quote: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-10 bg-white rounded-3xl border border-sage-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 w-full max-w-xs text-center" style={{ animationDelay: delay }}>
      <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 mb-6 group-hover:scale-110 transition-transform">
        <Sparkles size={24} />
      </div>
      <h3 className="font-serif text-2xl text-stone-900 mb-2">{name}</h3>
      <p className="text-xs text-sage-600 font-bold uppercase tracking-widest mb-4">{role}</p>
      <div className="w-8 h-px bg-sage-200 mb-4"></div>
      <p className="text-sm italic text-stone-500 leading-relaxed">"{quote}"</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-calm-cream text-stone-800 font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">
              <Leaf size={20} />
            </div>
            <span className="font-serif font-bold text-xl tracking-wide text-stone-900">
              SERENITY
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest text-stone-500">
            <a href="#presence" onClick={scrollToSection('presence')} className="hover:text-sage-600 transition-colors uppercase">Presence</a>
            <a href="#practices" onClick={scrollToSection('practices')} className="hover:text-sage-600 transition-colors uppercase">Practices</a>
            <a href="#wisdom" onClick={scrollToSection('wisdom')} className="hover:text-sage-600 transition-colors uppercase">Wisdom</a>
            <a 
              href="#start" 
              onClick={scrollToSection('presence')}
              className="px-6 py-2.5 bg-sage-800 text-white rounded-full hover:bg-sage-700 transition-all shadow-md hover:shadow-lg transform active:scale-95"
            >
              Begin Journey
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10 text-2xl font-serif animate-fade-in">
            <a href="#presence" onClick={scrollToSection('presence')} className="hover:text-sage-600 uppercase">Presence</a>
            <a href="#practices" onClick={scrollToSection('practices')} className="hover:text-sage-600 uppercase">Practices</a>
            <a href="#wisdom" onClick={scrollToSection('wisdom')} className="hover:text-sage-600 uppercase">Wisdom</a>
            <button onClick={() => setMenuOpen(false)} className="px-8 py-4 bg-sage-800 text-white rounded-full shadow-lg">Close</button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Soft Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white/10 to-calm-cream/80" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-20">
          <div className="inline-block mb-6 px-4 py-1.5 border border-sage-200 text-sage-600 text-[10px] tracking-[0.3em] uppercase font-bold rounded-full bg-white/40 backdrop-blur-sm">
            Cultivating Internal Peace
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-medium leading-[1.1] mb-10 text-stone-900">
            Find Your <br/><span className="italic font-normal text-sage-600">Stillness</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-stone-500 font-light leading-relaxed mb-14 px-4">
            A sanctuary designed to guide you back to your center through mindful breathing, gratitude, and purposeful living.
          </p>
          
          <button 
            onClick={scrollToSection('presence')}
            className="group flex flex-col items-center gap-4 text-xs font-bold tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors mx-auto"
          >
            <span>DESCEND INTO CALM</span>
            <div className="p-4 border border-sage-100 rounded-full group-hover:border-sage-600 group-hover:bg-sage-50 transition-all duration-500">
                <Wind size={20} className="animate-bounce" />
            </div>
          </button>
        </div>
      </header>

      <main>
        {/* Presence Section */}
        <section id="presence" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <div className="inline-block mb-4 text-xs font-bold tracking-[0.3em] text-sage-600 uppercase">01 / Foundation</div>
              <h2 className="font-serif text-5xl mb-8 leading-tight text-stone-900">The Power of <br/>the Present</h2>
              <div className="w-20 h-1 bg-sage-200 rounded-full mb-8"></div>
              <div className="space-y-6 text-stone-500">
                <p className="text-xl italic font-serif leading-relaxed">
                  "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."
                </p>
                <p className="text-lg">
                  Happiness isn't a destination reached in the future. It is a quality of mind that we bring to the current moment.
                </p>
              </div>
            </div>
            <div className="md:col-span-7 text-lg text-stone-500 leading-relaxed space-y-8 pt-4">
              <p>
                <span className="text-6xl float-left mr-5 mt-[-4px] font-serif text-sage-600 leading-[1]">A</span>wareness is the first step toward lasting contentment. In a world of constant distractions, we often forget how to simply *be*. Research in neurobiology shows that regular mindfulness practices can physically reshape the brain, strengthening the areas responsible for focus and emotional regulation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div className="p-8 bg-sage-50 rounded-2xl border border-sage-100">
                  <Sun className="text-sage-600 mb-4" size={28} />
                  <h4 className="font-serif text-xl mb-2 text-stone-900">Clarity</h4>
                  <p className="text-sm">Removing the mental fog of overthinking to see the beauty in small details.</p>
                </div>
                <div className="p-8 bg-calm-rose/10 rounded-2xl border border-calm-rose/20">
                  <Heart className="text-calm-rose mb-4" size={28} />
                  <h4 className="font-serif text-xl mb-2 text-stone-900">Compassion</h4>
                  <p className="text-sm">Developing a kinder inner dialogue and deeper empathy for others.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Section: Breathing */}
        <section id="practices" className="py-32 bg-sage-50/50 border-y border-sage-100">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-sage-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 shadow-sm border border-sage-100">
                      <Wind size={16}/> THE BREATHING PACER
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Return to the Rhythm</h2>
                  <p className="text-lg text-stone-500 mb-12">
                     Deep conscious breathing is the fastest way to signal safety to your nervous system. Place your hand on your heart, follow the circle, and let your worries drift away.
                  </p>
                </div>
                <div className="flex justify-center">
                    <BreathingPacer />
                </div>
            </div>
        </section>

        {/* Practice Section: Gratitude */}
        <section className="py-32 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div className="order-2 lg:order-1">
                        <GratitudeGarden />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-50 text-sage-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-sage-100">
                            PRACTICE II
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-8 text-stone-900">The Gratitude Seed</h2>
                        <div className="space-y-6 text-lg text-stone-500">
                          <p>
                              Our brains are naturally wired with a negativity bias—a survival instinct that notices problems faster than joys. Gratitude is the conscious practice of rewiring that system.
                          </p>
                          <p>
                              By documenting just three small things you are thankful for each day, you can shift your "happiness baseline" significantly in as little as 21 days.
                          </p>
                          <div className="pt-4 flex flex-col gap-4">
                            <div className="flex items-center gap-4 p-4 border-l-4 border-sage-600 bg-sage-50 rounded-r-xl">
                              <span className="text-2xl font-serif text-sage-600">01.</span>
                              <span className="text-stone-700">Notice the small: A warm cup of tea, a kind look.</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 border-l-4 border-sage-600 bg-sage-50 rounded-r-xl">
                              <span className="text-2xl font-serif text-sage-600">02.</span>
                              <span className="text-stone-700">Feel the sensation in your body as you reflect.</span>
                            </div>
                          </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Serenity Pond Section */}
        <section className="py-32 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                <div className="md:col-span-6 h-[500px] relative rounded-3xl overflow-hidden border border-white/10 group">
                    <SerenityPond />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 right-10">
                      <p className="text-xs uppercase tracking-[0.4em] font-bold text-sage-200 mb-2">Digital Sanctuary</p>
                      <p className="font-serif italic text-white text-xl">Observe the ripples. Let them represent your thoughts—moving, changing, but never defining the depth of the water.</p>
                    </div>
                </div>
                <div className="md:col-span-6">
                    <div className="inline-block mb-4 text-xs font-bold tracking-widest text-sage-400 uppercase">03 / VISUALIZATION</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-8 text-white">Visual Stillness</h2>
                    <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                        Sometimes the mind is too loud for silence. Visualization helps bridge the gap. Focus on the floating stones—they represent stability amidst the flow of life.
                    </p>
                    <div className="p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                        <WisdomQuotes />
                    </div>
                </div>
            </div>
        </section>

        {/* Guides / Wisdom Section */}
        <section id="wisdom" className="py-32 bg-calm-cream border-t border-sage-100">
           <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 text-xs font-bold tracking-widest text-sage-600 uppercase">TIMELESS WISDOM</div>
                    <h2 className="font-serif text-5xl mb-6 text-stone-900">The Philosophy of Alan Watts</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto text-lg italic">"The only way to make sense out of change is to plunge into it, move with it, and join the dance."</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <GuideCard
                        name="Alan Watts"
                        role="On Being Present"
                        quote="This is the real secret of life — to be completely engaged with what you are doing in the here and now."
                        delay="0s"
                    />
                    <GuideCard
                        name="Alan Watts"
                        role="On Letting Go"
                        quote="The art of living is neither careless drifting on the one hand nor fearful clinging to the past on the other."
                        delay="0.1s"
                    />
                    <GuideCard
                        name="Alan Watts"
                        role="On Acceptance"
                        quote="Muddy water is best cleared by leaving it alone."
                        delay="0.2s"
                    />
                    <GuideCard
                        name="Alan Watts"
                        role="On Inner Peace"
                        quote="We could say that meditation doesn't have a reason or doesn't have a purpose. In this respect it's unlike almost all other things we do."
                        delay="0.3s"
                    />
                    <GuideCard
                        name="Alan Watts"
                        role="On Flow"
                        quote="You are a function of what the whole universe is doing in the same way that a wave is a function of what the whole ocean is doing."
                        delay="0.4s"
                    />
                    <GuideCard
                        name="Alan Watts"
                        role="On Wisdom"
                        quote="The meaning of life is just to be alive. It is so plain and so obvious and so simple. And yet, everybody rushes around in a great panic as if it were necessary to achieve something beyond themselves."
                        delay="0.5s"
                    />
                </div>
           </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 bg-white border-t border-sage-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-block mb-4 text-xs font-bold tracking-widest text-sage-600 uppercase">GLOBAL ENDORSEMENTS</div>
              <h2 className="font-serif text-5xl mb-6 text-stone-900">World Leaders Recommend</h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg">Leading voices from around the globe recognize the transformative power of mindfulness and inner peace.</p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              <div className="bg-sage-50/30 border border-sage-100 rounded-3xl p-10 hover:shadow-lg transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl flex-shrink-0">
                    DL
                  </div>
                  <div>
                    <p className="text-lg text-stone-700 mb-4 italic leading-relaxed">
                      "In today's interconnected world, cultivating inner peace is not just a personal practice—it's a contribution to global harmony. Resources like Serenity help us remember that true change begins within."
                    </p>
                    <p className="text-sm font-bold text-sage-600 uppercase tracking-widest">Dalai Lama</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">Spiritual Leader</p>
                  </div>
                </div>
              </div>

              <div className="bg-calm-rose/10 border border-calm-rose/20 rounded-3xl p-10 hover:shadow-lg transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-calm-rose rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl flex-shrink-0">
                    JT
                  </div>
                  <div>
                    <p className="text-lg text-stone-700 mb-4 italic leading-relaxed">
                      "Mental wellness and mindfulness are essential for building resilient societies. This platform beautifully bridges ancient wisdom with modern accessibility."
                    </p>
                    <p className="text-sm font-bold text-sage-600 uppercase tracking-widest">Justin Trudeau</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">Prime Minister of Canada</p>
                  </div>
                </div>
              </div>

              <div className="bg-sage-50/30 border border-sage-100 rounded-3xl p-10 hover:shadow-lg transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-sage-800 rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl flex-shrink-0">
                    JA
                  </div>
                  <div>
                    <p className="text-lg text-stone-700 mb-4 italic leading-relaxed">
                      "As we navigate the complexities of our time, returning to practices of presence and gratitude gives us the clarity to lead with wisdom and compassion."
                    </p>
                    <p className="text-sm font-bold text-sage-600 uppercase tracking-widest">Jacinda Ardern</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">Former Prime Minister of New Zealand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t border-sage-100 py-24 text-stone-400">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
                <div className="flex items-center gap-3 text-stone-900 font-serif font-bold text-2xl mb-6">
                   <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center text-white"><Leaf size={16}/></div>
                   Serenity
                </div>
                <p className="text-sm leading-relaxed mb-6">
                    A digital garden for the soul. Created to remind you that in the middle of a chaotic world, you carry your own quiet place with you at all times.
                </p>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 hover:bg-sage-600 hover:text-white transition-colors cursor-pointer"><Wind size={14}/></div>
                  <div className="w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 hover:bg-sage-600 hover:text-white transition-colors cursor-pointer"><Heart size={14}/></div>
                  <div className="w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 hover:bg-sage-600 hover:text-white transition-colors cursor-pointer"><Sun size={14}/></div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">Explore</h5>
                <ul className="text-sm space-y-4">
                  <li><a href="#" className="hover:text-sage-600 transition-colors">Daily Meditations</a></li>
                  <li><a href="#" className="hover:text-sage-600 transition-colors">Digital Detox</a></li>
                  <li><a href="#" className="hover:text-sage-600 transition-colors">The Community</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">Resources</h5>
                <ul className="text-sm space-y-4">
                  <li><a href="#" className="hover:text-sage-600 transition-colors">Mindfulness Guide</a></li>
                  <li><a href="#" className="hover:text-sage-600 transition-colors">Sleep Stories</a></li>
                  <li><a href="#" className="hover:text-sage-600 transition-colors">Journaling Prompts</a></li>
                </ul>
              </div>
            </div>
        </div>
        <div className="container mx-auto px-8 mt-20 pt-8 border-t border-stone-50 text-center text-[10px] tracking-widest uppercase text-stone-300">
            © 2024 Serenity Collective. Breathe in, breathe out.
        </div>
      </footer>
    </div>
  );
};

export default App;
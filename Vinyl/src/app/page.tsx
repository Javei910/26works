import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative flex-1 flex items-center justify-center overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-vinyl-gradient">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-vinyl-gold via-vinyl-gold-light to-vinyl-gold bg-clip-text text-transparent animate-fade-in">
                        VinylFlow
                    </h1>

                    <p className="text-xl md:text-2xl text-vinyl-cream/80 mb-4 animate-slide-up">
                        Manufacture Your Vision
                    </p>

                    <p className="text-lg md:text-xl text-vinyl-cream/60 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Premium custom vinyl, CDs, and cassettes with automated fulfillment.
                        Design, upload, and we'll handle the rest.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link href="/studio" className="btn-primary">
                            Start Creating
                        </Link>
                        <Link href="/products" className="btn-secondary">
                            View Products
                        </Link>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vinyl-gold/50 to-transparent"></div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-vinyl-gold">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Choose Your Format",
                                description: "Select from 12\" vinyl, 7\" vinyl, CDs, or cassettes with custom specifications.",
                            },
                            {
                                step: "02",
                                title: "Upload Your Assets",
                                description: "Design your artwork and audio. See your creation in stunning 3D preview.",
                            },
                            {
                                step: "03",
                                title: "Automated Fulfillment",
                                description: "We handle manufacturing and shipping. Track your order every step of the way.",
                            },
                        ].map((feature, i) => (
                            <div key={i} className="card group">
                                <div className="text-5xl font-serif font-bold text-vinyl-gold/20 mb-4 group-hover:text-vinyl-gold/40 transition-colors">
                                    {feature.step}
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 text-vinyl-gold-light">
                                    {feature.title}
                                </h3>
                                <p className="text-vinyl-cream/70">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-vinyl-gray-800 py-8 px-6 text-center text-vinyl-cream/50">
                <p>&copy; 2026 VinylFlow. Premium Media Manufacturing.</p>
            </footer>
        </div>
    );
}

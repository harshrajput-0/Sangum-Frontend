"use client";

const PricingPage = () => {
    const pricingPlans = [
        {
            id: 1, name: "Starter", description: "Perfect for trying out PrebuiltUI and validating your first idea.", price: 0, buttonText: "Start for free", buttonStyle: "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50", subtext: "Free forever. No credit card required.", isDark: false,
            features: [
                "Basic components access",
                "Limited templates",
                "Open-source usage"
            ]
        },
        {
            id: 2, name: "Growth", description: "Best for founders and developers building real products fast.", price: 199, buttonText: "Unlock full access", buttonStyle: "bg-linear-to-r from-orange-500 to-orange-400 text-white", subtext: "One-time payment with lifetime access and free updates.", isDark: true,
            features: [
                "Full components access",
                "Unlimited templates",
                "Custom animations",
                "Priority support"
            ]
        },
        { 
            id: 3, name: "Scale", description: "Built for teams and agencies shipping products together.", price: 399, buttonText: "Get team access", buttonStyle: "bg-linear-to-r from-orange-500 to-orange-400 text-white", subtext: "One-time team license with lifetime access and free updates.", isDark: false,
            features: [
                "Full components access",
                "Unlimited templates",
                "Everything in Growth",
                "Dedicated support"
            ]
        }
    ];

    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>

            <div className='bg-slate-50 py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h1 className='text-[40px] font-semibold text-slate-900 mb-3'>
                            Pricing plans for everyone
                        </h1>
                        <p className='text-sm md:text-base/7 text-slate-600 max-w-md mx-auto'>
                            Get access to components, templates and updates. No subscriptions. No surprises.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                        {pricingPlans.map((plan) => (
                            <div key={plan.id} className={`rounded-2xl px-6 py-8 ${plan.isDark ? 'bg-slate-900 shadow-xl shadow-black/10' : 'bg-white border border-slate-200'}`}>
                                <h3 className={`text-sm font-medium mb-6 ${plan.isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-8 max-w-58 ${plan.isDark ? 'text-white' : 'text-slate-800'}`}>
                                    {plan.description}
                                </p>

                                <div className='mb-8.5'>
                                    <div className='flex items-start gap-2'>
                                        <div className='flex items-baseline gap-1'>
                                            <span className={`text-3xl ${plan.isDark ? 'text-white' : 'text-slate-900'}`}>$</span>
                                            <span className={`text-5xl font-semibold leading-none ${plan.isDark ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                                        </div>
                                        {plan.price > 0 && (
                                            <p className="text-sm">
                                                <span className={`${plan.isDark ? 'text-white' : 'text-black'}`}>One-time payment</span><br /><span className={`${plan.isDark ? 'text-white/50' : 'text-black/45'}`}>plus local taxes</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button className={`w-full py-3 rounded-sm text-sm mb-2.5 transition cursor-pointer ${plan.buttonStyle}`}>
                                    {plan.buttonText}
                                </button>

                                <p className={`text-sm/5 max-w-60 mb-6 ${plan.isDark ? 'text-white/80' : 'text-black/50'}`}>
                                    {plan.subtext}
                                </p>

                                <div className={`border-t mb-5 ${plan.isDark ? 'border-white/90' : 'border-slate-300'}`}></div>

                                <div className='space-y-2.5'>
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className='flex items-start gap-2'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='mt-0.5 shrink-0'>
                                                <path d="M7.75 14.75a7 7 0 1 0 0-14 7 7 0 0 0 0 14" stroke={plan.isDark ? "#F8FAFC" : "#62748e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="m5.65 7.752 1.4 1.4 2.8-2.8" stroke={plan.isDark ? "#F8FAFC" : "#62748e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className={`text-sm ${plan.isDark ? 'text-slate-50' : 'text-slate-600'}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PricingPage;
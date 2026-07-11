import { ErrorLogo } from "@/modules/pages/system/components/ErrorLogo";

export interface AuthLayoutProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  /** The form itself — LoginForm, RegisterForm, or anything else. */
  children?: React.ReactNode;
  /** Right-side panel content (AuthIllustrationPanel, or your own) — hidden below the lg breakpoint. */
  aside?: React.ReactNode;
  currentPage?: "login" | "register";
  className?: string;
}



const PreviewTestingPage = () => {
  return (
    <main className='w-full max-w-2xl h-full bg-bg text-text p-8 flex items-center justify-center'>
<ErrorLogo /> 
<h2>fdsfsdf</h2>
<svg viewBox="0 0 400 471" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="500 internal server error illustration">
<defs>
  <linearGradient id="ringLong500" gradientUnits="userSpaceOnUse" x1="138.29" y1="231.54" x2="116.86" y2="110.0">
    <stop offset="0%" stop-color="#5B2CFB"/>
    <stop offset="100%" stop-color="#4C6EF8"/>
  </linearGradient>
  <linearGradient id="ringCyan500" gradientUnits="userSpaceOnUse" x1="296.0" y1="158.0" x2="208.37" y2="253.63">
    <stop offset="0%" stop-color="#3E8EF7"/>
    <stop offset="100%" stop-color="#06C4FA"/>
  </linearGradient>
  <linearGradient id="ringStub500" gradientUnits="userSpaceOnUse" x1="278.64" y1="102.94" x2="292.73" y2="133.15">
    <stop offset="0%" stop-color="#3E6EF8"/>
    <stop offset="100%" stop-color="#2F5CF6"/>
  </linearGradient>
  <radialGradient id="gradSpherePurple500" cx="35%" cy="30%" r="75%">
    <stop offset="0%" stop-color="#B9A6FF"/>
    <stop offset="45%" stop-color="#7C5CFA"/>
    <stop offset="100%" stop-color="#4526E0"/>
  </radialGradient>
  <linearGradient id="gradIconShatter500" gradientUnits="userSpaceOnUse" x1="150" y1="60" x2="320" y2="180">
    <stop offset="0%" stop-color="#8C6CFA"/>
    <stop offset="100%" stop-color="#3E8EF7"/>
  </linearGradient>
  <filter id="shadowBlur500" x="-100%" y="-100%" width="300%" height="300%">
    <feGaussianBlur stdDeviation="9"/>
  </filter>
  <linearGradient id="codeGrad500" gradientUnits="userSpaceOnUse" x1="120" y1="0" x2="280" y2="0">
    <stop offset="0%" stop-color="#5B2CFB"/>
    <stop offset="55%" stop-color="#4C6EF8"/>
    <stop offset="100%" stop-color="#06C4FA"/>
  </linearGradient>
</defs>
<g>
<path fill="#4C2CFD" opacity="0.4" d="M 68.32 84 h 3.3600000000000003 v 4.32 h 4.32 v 3.3600000000000003 h -4.32 v 4.32 h -3.3600000000000003 v -4.32 h -4.32 v -3.3600000000000003 h 4.32 Z"/>
<path fill="#4C2CFD" opacity="0.4" d="M 338.32 90 h 3.3600000000000003 v 4.32 h 4.32 v 3.3600000000000003 h -4.32 v 4.32 h -3.3600000000000003 v -4.32 h -4.32 v -3.3600000000000003 h 4.32 Z"/>
<path fill="#4C2CFD" opacity="0.4" d="M 58.32 226 h 3.3600000000000003 v 4.32 h 4.32 v 3.3600000000000003 h -4.32 v 4.32 h -3.3600000000000003 v -4.32 h -4.32 v -3.3600000000000003 h 4.32 Z"/>
<path fill="#4C2CFD" opacity="0.4" d="M 198.6 55 h 2.8000000000000003 v 3.5999999999999996 h 3.5999999999999996 v 2.8000000000000003 h -3.5999999999999996 v 3.5999999999999996 h -2.8000000000000003 v -3.5999999999999996 h -3.5999999999999996 v -2.8000000000000003 h 3.5999999999999996 Z"/>
<circle fill="#4C2CFD" opacity="0.4" cx="120" cy="300" r="3"/>
<circle fill="#4C2CFD" opacity="0.4" cx="300" cy="296" r="2.5"/>
<circle fill="#4C2CFD" opacity="0.4" cx="346" cy="190" r="2"/>
<circle fill="#4C2CFD" opacity="0.4" cx="90" cy="160" r="2"/>
</g>

<ellipse cx="200" cy="278" rx="58" ry="10" fill="#000818" opacity="0.4" filter="url(#shadowBlur500)"/>

<path d="M 138.29 231.54 A 96 96 0 0 1 116.86 110.0" fill="none" stroke="url(#ringLong500)" stroke-width="14.9" stroke-linecap="round"/>
<path d="M 296.0 158.0 A 96 96 0 0 1 208.37 253.63" fill="none" stroke="url(#ringCyan500)" stroke-width="14.9" stroke-linecap="round"/>
<path d="M 278.64 102.94 A 96 96 0 0 1 292.73 133.15" fill="none" stroke="url(#ringStub500)" stroke-width="11.920000000000002" stroke-linecap="round"/>

<circle cx="109.79" cy="190.83" r="19.2" fill="url(#gradSpherePurple500)"/>

<path transform="translate(109.98 101.29) rotate(26.077063200315393)" d="M 0 -8.301868946079708 L 7.222625983089346 4.150934473039854 L -7.222625983089346 4.150934473039854 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(117.27 78.32) rotate(182.67686394819128)" d="M -6.565997849549413 -3.9395987097296477 L 6.565997849549413 -1.9697993548648238 L 3.2829989247747067 6.565997849549413 L -5.252798279639531 3.9395987097296477 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(130.82 71.13) rotate(32.65668480379142)" d="M 0 -6.039710847149238 L 6.039710847149238 0 L 0 6.039710847149238 L -6.039710847149238 0 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(147.47 47.3) rotate(80.36602725852524)" d="M 0 -5.597603922299291 L 4.869915412400383 2.7988019611496453 L -4.869915412400383 2.7988019611496453 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(163.02 32.49) rotate(142.80497087428085)" d="M -5.954205897234997 -3.5725235383409983 L 5.954205897234997 -1.7862617691704992 L 2.9771029486174987 5.954205897234997 L -4.763364717787998 3.5725235383409983 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(166.62 20.32) rotate(104.25934307940345)" d="M 0 -5.966936918097359 L 5.966936918097359 0 L 0 5.966936918097359 L -5.966936918097359 0 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(188.35 26.42) rotate(293.80548928321133)" d="M 0 -4.316963648203868 L 3.755758373937365 2.158481824101934 L -3.755758373937365 2.158481824101934 Z" fill="url(#gradIconShatter500)"/>
<path transform="translate(220.69 22.04) rotate(134.06311538126323)" d="M -4.427826937852368 -2.6566961627114205 L 4.427826937852368 -1.3283480813557103 L 2.213913468926184 4.427826937852368 L -3.5422615502818946 2.6566961627114205 Z" fill="url(#gradIconShatter500)"/>
<text x="200" y="332.8" text-anchor="middle" dominant-baseline="middle" font-family="'Segoe UI', system-ui, -apple-system, Roboto, Arial, sans-serif" font-size="60.2" font-weight="800" letter-spacing="2" fill="url(#codeGrad500)">500</text>
<text x="200" y="381.5" text-anchor="middle" dominant-baseline="middle" font-family="'Segoe UI', system-ui, -apple-system, Roboto, Arial, sans-serif" font-size="28.3" font-weight="700" fill="currentColor">Something went wrong</text>
<text x="200" y="414.7" text-anchor="middle" font-family="'Segoe UI', system-ui, -apple-system, Roboto, Arial, sans-serif" font-size="19.5" font-weight="400" fill="currentColor" fill-opacity="0.62"><tspan x="200" dy="0">We're having trouble loading this page right now.</tspan><tspan x="200" dy="22.1">Please try again in a few minutes.</tspan></text>
</svg>
    </main>
  )
}

export default PreviewTestingPage
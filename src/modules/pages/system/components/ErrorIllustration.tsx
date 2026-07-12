import type { SVGProps } from 'react';

/**
 * Symbol-based variants, decoupled from any specific HTTP status code.
 * Pick the one that matches the *nature* of the problem, then pass whatever
 * status code (or no code at all) fits the situation via ErrorState's `code` prop:
 *
 *  - "lock"       permission / auth problems        (401, 403, "Locked"...)
 *  - "connection" can't reach / find the thing       (404, 502, 504, "Offline"...)
 *  - "crash"      something broke on our end         (500, 502, unhandled errors...)
 *  - "service"    planned downtime / maintenance     (503, "Under maintenance"...)
 *
 * This means new status-code pages don't need a new illustration — just reuse
 * whichever symbol matches, and change the code/title/message.
 */
export type ErrorVariant = 'lock' | 'connection' | 'crash' | 'service';

interface ErrorIllustrationProps extends SVGProps<SVGSVGElement> {
  variant: ErrorVariant;
}

/**
 * Renders the illustration for a given error variant. All four share the
 * same 400x312 viewBox and the same ring/sphere proportions, so they stay
 * visually consistent no matter what size you render them at — just control
 * the size from the wrapping element (see ErrorState.tsx).
 */
export function ErrorIllustration({ variant, ...props }: ErrorIllustrationProps) {
  switch (variant) {
    case 'lock':
      return <IllustrationLock {...props} />;
    case 'connection':
      return <IllustrationConnection {...props} />;
    case 'crash':
      return <IllustrationCrash {...props} />;
    case 'service':
      return <IllustrationService {...props} />;
    default:
      return null;
  }
}

/* ==================== lock — permission / auth problems ==================== */
function IllustrationLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 312" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="locked padlock illustration" {...props}>
      <defs>
        <linearGradient id="ringLongLock" gradientUnits="userSpaceOnUse" x1="121.36" y1="213.06" x2="248.0" y2="74.86">
          <stop offset="0%" stopColor="#5B2CFB" />
          <stop offset="55%" stopColor="#4C6EF8" />
          <stop offset="100%" stopColor="#3E8EF7" />
        </linearGradient>
        <linearGradient id="ringCyanLock" gradientUnits="userSpaceOnUse" x1="292.73" y1="133.15" x2="261.71" y2="231.54">
          <stop offset="0%" stopColor="#3E8EF7" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <radialGradient id="gradSphereBlueLock" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#AFC6FF" />
          <stop offset="45%" stopColor="#5C8CFA" />
          <stop offset="100%" stopColor="#2657E0" />
        </radialGradient>
        <linearGradient id="gradLockIcon" gradientUnits="userSpaceOnUse" x1="155" y1="128" x2="245" y2="198">
          <stop offset="0%" stopColor="#5B2CFB" />
          <stop offset="55%" stopColor="#4C6EF8" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <filter id="shadowBlurLock" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <g>
        <path fill="#4C2CFD" opacity="0.4" d="M 338.04 59 h 3.92 v 5.04 h 5.04 v 3.92 h -5.04 v 5.04 h -3.92 v -5.04 h -5.04 v -3.92 h 5.04 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 90.32 86 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 64.32 230 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 336.04 251 h 3.92 v 5.04 h 5.04 v 3.92 h -5.04 v 5.04 h -3.92 v -5.04 h -5.04 v -3.92 h 5.04 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 58.6 153 h 2.8 v 3.6 h 3.6 v 2.8 h -3.6 v 3.6 h -2.8 v -3.6 h -3.6 v -2.8 h 3.6 Z" />
        <circle fill="#4C2CFD" opacity="0.4" cx="300" cy="300" r="3" />
        <circle fill="#4C2CFD" opacity="0.4" cx="120" cy="300" r="2.5" />
      </g>

      {/* soft, lightened ground shadow */}
      <ellipse cx="200" cy="278" rx="58" ry="11" fill="#3E63F7" opacity="0.14" filter="url(#shadowBlurLock)" />

      <circle cx="200" cy="158" r="71.04" fill="none" stroke="#4C2CFD" strokeWidth="1.5" opacity="0.14" />
      <circle cx="200" cy="158" r="52.8" fill="none" stroke="#4C2CFD" strokeWidth="1.5" opacity="0.18" />

      <path d="M 121.36 213.06 A 96 96 0 0 1 248.0 74.86" fill="none" stroke="url(#ringLongLock)" strokeWidth="14.9" strokeLinecap="round" />
      <path d="M 292.73 133.15 A 96 96 0 0 1 261.71 231.54" fill="none" stroke="url(#ringCyanLock)" strokeWidth="14.9" strokeLinecap="round" />
      <circle cx="273.54" cy="96.29" r="13.9" fill="url(#gradSphereBlueLock)" />

      <g transform="translate(200 128.0) scale(1.0)">
        <path d="M -20 20 A 20 20 0 0 1 20 20 L 11 20 A 11 11 0 0 0 -11 20 Z" fill="url(#gradLockIcon)" />
        <rect x="-26" y="20" width="52" height="48" rx="10" fill="url(#gradLockIcon)" />
        <circle cx="0" cy="40" r="6.5" fill="#EAF2FF" />
        <path d="M -4.2 44 L 4.2 44 L 3.2 58 Q 0 61 -3.2 58 Z" fill="#EAF2FF" />
      </g>
    </svg>
  );
}

/* ==================== connection — can't reach / find the thing ==================== */
function IllustrationConnection({ style, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 312"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="disconnected floating spheres illustration"
      style={{ overflow: 'visible', ...style }}
      {...props}
    >
      <defs>
        <linearGradient id="ringLongConnection" gradientUnits="userSpaceOnUse" x1="132.12" y1="225.88" x2="255.06" y2="79.36">
          <stop offset="0%" stopColor="#5B2CFB" />
          <stop offset="55%" stopColor="#4C6EF8" />
          <stop offset="100%" stopColor="#3E8EF7" />
        </linearGradient>
        <linearGradient id="ringCyanConnection" gradientUnits="userSpaceOnUse" x1="296.0" y1="158.0" x2="224.85" y2="250.73">
          <stop offset="0%" stopColor="#3E8EF7" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <radialGradient id="gradSpherePurpleConnection" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#B9A6FF" />
          <stop offset="45%" stopColor="#7C5CFA" />
          <stop offset="100%" stopColor="#4526E0" />
        </radialGradient>
        <radialGradient id="gradSphereBlueConnection" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#AFC6FF" />
          <stop offset="45%" stopColor="#5C8CFA" />
          <stop offset="100%" stopColor="#2657E0" />
        </radialGradient>
        <filter id="shadowBlurConnection" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <g fill="#4C2CFD" opacity="0.16">
        <path d="M -20 300 Q -2 210 68 205 Q 133 212 178 300 Z" />
        <path d="M 213 300 Q 273 230 328 225 Q 388 232 448 300 Z" />
      </g>

      <g fill="#4C2CFD" opacity="0.2" transform="translate(40 306) scale(0.8 0.8)">
        <path d="M 0 0 C -1 -34 -20 -40 -26 -52 C -14 -48 -1 -40 0 -30 Z" />
        <path d="M 0 -14 C 1 -40 18 -46 24 -56 C 13 -50 1 -44 0 -34 Z" />
        <path d="M 0 -30 C -1 -48 -14 -54 -18 -62 C -9 -58 -1 -52 0 -44 Z" />
        <rect x="-1.3" y="-46" width="2.6" height="46" />
        <ellipse cx="0" cy="2" rx="17" ry="3" />
      </g>

      <g fill="#4C2CFD" opacity="0.2" transform="translate(362 310) scale(-0.85 0.85)">
        <path d="M 0 0 C -1 -34 -20 -40 -26 -52 C -14 -48 -1 -40 0 -30 Z" />
        <path d="M 0 -14 C 1 -40 18 -46 24 -56 C 13 -50 1 -44 0 -34 Z" />
        <path d="M 0 -30 C -1 -48 -14 -54 -18 -62 C -9 -58 -1 -52 0 -44 Z" />
        <rect x="-1.3" y="-46" width="2.6" height="46" />
        <ellipse cx="0" cy="2" rx="17" ry="3" />
      </g>

      <path
        stroke="#4C2CFD"
        opacity="0.4"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(58 78) scale(0.8)"
        d="M -30 8 C -34 8 -37 5 -37 1 C -37 -3 -34 -6 -30 -6 C -29 -6 -28 -6 -28 -5
           C -27 -12 -21 -17 -14 -17 C -8 -17 -2 -13 -1 -7
           C 0 -8 1 -8 3 -8 C 8 -8 12 -4 12 1 C 12 5 8 8 3 8 Z"
      />

      <path
        stroke="#4C2CFD"
        opacity="0.4"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(345 122) scale(0.65)"
        d="M -30 8 C -34 8 -37 5 -37 1 C -37 -3 -34 -6 -30 -6 C -29 -6 -28 -6 -28 -5
           C -27 -12 -21 -17 -14 -17 C -8 -17 -2 -13 -1 -7
           C 0 -8 1 -8 3 -8 C 8 -8 12 -4 12 1 C 12 5 8 8 3 8 Z"
      />

      <path fill="#4C2CFD" opacity="0.4" d="M 334.04 53 h 3.92 v 5.04 h 5.04 v 3.92 h -5.04 v 5.04 h -3.92 v -5.04 h -5.04 v -3.92 h 5.04 Z" />
      <path fill="#4C2CFD" opacity="0.4" d="M 94.32 124 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
      <path fill="#4C2CFD" opacity="0.4" d="M 54.32 194 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
      <circle fill="#4C2CFD" opacity="0.4" cx="146" cy="246" r="3" />
      <circle fill="#4C2CFD" opacity="0.4" cx="310" cy="100" r="2.5" />
      <circle fill="#4C2CFD" opacity="0.4" cx="120" cy="90" r="2" />

      {/* soft, lightened ground shadow */}
      <ellipse cx="200" cy="270" rx="62" ry="12" fill="#3E63F7" opacity="0.14" filter="url(#shadowBlurConnection)" />

      <path d="M 132.12 225.88 A 96 96 0 0 1 255.06 79.36" fill="none" stroke="url(#ringLongConnection)" strokeWidth="14.9" strokeLinecap="round" />
      <path d="M 296.0 158.0 A 96 96 0 0 1 224.85 250.73" fill="none" stroke="url(#ringCyanConnection)" strokeWidth="14.9" strokeLinecap="round" />

      <circle cx="114.46" cy="201.58" r="21.8" fill="url(#gradSpherePurpleConnection)" />
      <circle cx="284.76" cy="112.93" r="12.8" fill="url(#gradSphereBlueConnection)" />
    </svg>
  );
}

/* ==================== crash — something broke on our end ==================== */
function IllustrationCrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 312" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="shattered ring illustration" {...props}>
      <defs>
        <linearGradient id="ringLongCrash" gradientUnits="userSpaceOnUse" x1="138.29" y1="231.54" x2="116.86" y2="110.0">
          <stop offset="0%" stopColor="#5B2CFB" />
          <stop offset="100%" stopColor="#4C6EF8" />
        </linearGradient>
        <linearGradient id="ringCyanCrash" gradientUnits="userSpaceOnUse" x1="296.0" y1="158.0" x2="208.37" y2="253.63">
          <stop offset="0%" stopColor="#3E8EF7" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <linearGradient id="ringStubCrash" gradientUnits="userSpaceOnUse" x1="278.64" y1="102.94" x2="292.73" y2="133.15">
          <stop offset="0%" stopColor="#3E6EF8" />
          <stop offset="100%" stopColor="#2F5CF6" />
        </linearGradient>
        <radialGradient id="gradSpherePurpleCrash" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#B9A6FF" />
          <stop offset="45%" stopColor="#7C5CFA" />
          <stop offset="100%" stopColor="#4526E0" />
        </radialGradient>
        <linearGradient id="gradIconShatterCrash" gradientUnits="userSpaceOnUse" x1="150" y1="60" x2="320" y2="180">
          <stop offset="0%" stopColor="#8C6CFA" />
          <stop offset="100%" stopColor="#3E8EF7" />
        </linearGradient>
        <filter id="shadowBlurCrash" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <g>
        <path fill="#4C2CFD" opacity="0.4" d="M 68.32 84 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 338.32 90 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 58.32 226 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 198.6 55 h 2.8 v 3.6 h 3.6 v 2.8 h -3.6 v 3.6 h -2.8 v -3.6 h -3.6 v -2.8 h 3.6 Z" />
        <circle fill="#4C2CFD" opacity="0.4" cx="120" cy="300" r="3" />
        <circle fill="#4C2CFD" opacity="0.4" cx="300" cy="296" r="2.5" />
        <circle fill="#4C2CFD" opacity="0.4" cx="90" cy="160" r="2" />
      </g>

      {/* soft, lightened ground shadow */}
      <ellipse cx="200" cy="278" rx="58" ry="11" fill="#3E63F7" opacity="0.14" filter="url(#shadowBlurCrash)" />

      <path d="M 138.29 231.54 A 96 96 0 0 1 116.86 110.0" fill="none" stroke="url(#ringLongCrash)" strokeWidth="14.9" strokeLinecap="round" />
      <path d="M 296.0 158.0 A 96 96 0 0 1 208.37 253.63" fill="none" stroke="url(#ringCyanCrash)" strokeWidth="14.9" strokeLinecap="round" />
      <path d="M 278.64 102.94 A 96 96 0 0 1 292.73 133.15" fill="none" stroke="url(#ringStubCrash)" strokeWidth="11.92" strokeLinecap="round" />

      <circle cx="109.79" cy="190.83" r="19.2" fill="url(#gradSpherePurpleCrash)" />

      <path transform="translate(109.98 101.29) rotate(26.077063200315393)" d="M 0 -8.301868946079708 L 7.222625983089346 4.150934473039854 L -7.222625983089346 4.150934473039854 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(117.27 78.32) rotate(182.67686394819128)" d="M -6.565997849549413 -3.9395987097296477 L 6.565997849549413 -1.9697993548648238 L 3.2829989247747067 6.565997849549413 L -5.252798279639531 3.9395987097296477 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(130.82 71.13) rotate(32.65668480379142)" d="M 0 -6.039710847149238 L 6.039710847149238 0 L 0 6.039710847149238 L -6.039710847149238 0 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(147.47 47.3) rotate(80.36602725852524)" d="M 0 -5.597603922299291 L 4.869915412400383 2.7988019611496453 L -4.869915412400383 2.7988019611496453 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(163.02 32.49) rotate(142.80497087428085)" d="M -5.954205897234997 -3.5725235383409983 L 5.954205897234997 -1.7862617691704992 L 2.9771029486174987 5.954205897234997 L -4.763364717787998 3.5725235383409983 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(166.62 20.32) rotate(104.25934307940345)" d="M 0 -5.966936918097359 L 5.966936918097359 0 L 0 5.966936918097359 L -5.966936918097359 0 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(188.35 26.42) rotate(293.80548928321133)" d="M 0 -4.316963648203868 L 3.755758373937365 2.158481824101934 L -3.755758373937365 2.158481824101934 Z" fill="url(#gradIconShatterCrash)" />
      <path transform="translate(220.69 22.04) rotate(134.06311538126323)" d="M -4.427826937852368 -2.6566961627114205 L 4.427826937852368 -1.3283480813557103 L 2.213913468926184 4.427826937852368 L -3.5422615502818946 2.6566961627114205 Z" fill="url(#gradIconShatterCrash)" />
    </svg>
  );
}

/* ==================== service — planned downtime / maintenance ==================== */
function IllustrationService(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 312" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="traffic cone maintenance illustration" {...props}>
      <defs>
        <linearGradient id="ringLongService" gradientUnits="userSpaceOnUse" x1="138.29" y1="231.54" x2="183.33" y2="63.46">
          <stop offset="0%" stopColor="#5B2CFB" />
          <stop offset="55%" stopColor="#4C6EF8" />
          <stop offset="100%" stopColor="#3E8EF7" />
        </linearGradient>
        <linearGradient id="ringDashService" gradientUnits="userSpaceOnUse" x1="183.33" y1="63.46" x2="287.01" y2="117.43">
          <stop offset="0%" stopColor="#3E8EF7" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <linearGradient id="ringShortService" gradientUnits="userSpaceOnUse" x1="295.63" y1="166.37" x2="261.71" y2="231.54">
          <stop offset="0%" stopColor="#06C4FA" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <radialGradient id="gradSphereBlueService" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#AFC6FF" />
          <stop offset="45%" stopColor="#5C8CFA" />
          <stop offset="100%" stopColor="#2657E0" />
        </radialGradient>
        <linearGradient id="gradConeService" gradientUnits="userSpaceOnUse" x1="160" y1="123" x2="240" y2="198">
          <stop offset="0%" stopColor="#5B2CFB" />
          <stop offset="55%" stopColor="#4C6EF8" />
          <stop offset="100%" stopColor="#06C4FA" />
        </linearGradient>
        <filter id="shadowBlurService" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <g>
        <path
          stroke="#4C2CFD"
          opacity="0.4"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(64 96) scale(0.8)"
          d="M -30 8 C -34 8 -37 5 -37 1 C -37 -3 -34 -6 -30 -6 C -29 -6 -28 -6 -28 -5
             C -27 -12 -21 -17 -14 -17 C -8 -17 -2 -13 -1 -7
             C 0 -8 1 -8 3 -8 C 8 -8 12 -4 12 1 C 12 5 8 8 3 8 Z"
        />

        <path
          stroke="#4C2CFD"
          opacity="0.4"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(338 118) scale(0.7)"
          d="M -30 8 C -34 8 -37 5 -37 1 C -37 -3 -34 -6 -30 -6 C -29 -6 -28 -6 -28 -5
             C -27 -12 -21 -17 -14 -17 C -8 -17 -2 -13 -1 -7
             C 0 -8 1 -8 3 -8 C 8 -8 12 -4 12 1 C 12 5 8 8 3 8 Z"
        />

        <path fill="#4C2CFD" opacity="0.4" d="M 166.32 56 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 94.32 252 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <path fill="#4C2CFD" opacity="0.4" d="M 334.32 226 h 3.36 v 4.32 h 4.32 v 3.36 h -4.32 v 4.32 h -3.36 v -4.32 h -4.32 v -3.36 h 4.32 Z" />
        <circle fill="#4C2CFD" opacity="0.4" cx="104" cy="92" r="2.5" />
        <circle fill="#4C2CFD" opacity="0.4" cx="300" cy="76" r="2.5" />
      </g>

      {/* soft, lightened ground shadow */}
      <ellipse cx="200" cy="278" rx="58" ry="11" fill="#3E63F7" opacity="0.14" filter="url(#shadowBlurService)" />

      <path d="M 138.29 231.54 A 96 96 0 0 1 183.33 63.46" fill="none" stroke="url(#ringLongService)" strokeWidth="14.9" strokeLinecap="round" />
      <path d="M 183.33 63.46 A 96 96 0 0 1 287.01 117.43" fill="none" stroke="url(#ringDashService)" strokeWidth="14.9" strokeLinecap="butt" strokeDasharray="16.8 8.4" />
      <path d="M 295.63 166.37 A 96 96 0 0 1 261.71 231.54" fill="none" stroke="url(#ringShortService)" strokeWidth="14.9" strokeLinecap="round" />
      <circle cx="294.54" cy="141.33" r="13.9" fill="url(#gradSphereBlueService)" />

      <g transform="translate(200 127.0) scale(0.85)">
        <path d="M -3 0 L -20 30 L -30 46 L -38 60 L 38 60 L 30 46 L 20 30 L 3 0 Z" fill="url(#gradConeService)" />
        <path d="M -42 60 Q 0 67 42 60 L 50 74 Q 0 81 -50 74 Z" fill="url(#gradConeService)" />
        <path d="M -18 27 Q 0 30 18 27 L 17 32 Q 0 35 -17 32 Z" fill="#000012" opacity="0.28" />
        <path d="M -28 43 Q 0 46 28 43 L 27 48 Q 0 51 -27 48 Z" fill="#000012" opacity="0.28" />
      </g>
    </svg>
  );
}
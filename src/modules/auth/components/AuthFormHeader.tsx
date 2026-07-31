
export interface AuthFormHeaderProps {
    eyebrow: string;
    title: string;
    description: string;
}

const AuthFormHeader = ({eyebrow, title, description}: AuthFormHeaderProps) => {
    return (
          <div className="max-w-2xl w-full mx-auto lg:mx-0">
            <span className="block text-(length:--fs-xs) font-semibold tracking-widest uppercase text-primary-light mb-2">
              {eyebrow}
            </span>
            <h1 className="text-[32px] font-extrabold text-text leading-tight mb-2.5">{title}{" "} <span className="text-primary-light">Sangum account</span></h1>
            <p className="text-(length:--fs-base) text-text-secondary leading-relaxed mb-6">{description}</p>
        
          </div>
    )
}

export default AuthFormHeader
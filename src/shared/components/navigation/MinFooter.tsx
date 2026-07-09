import { Link } from 'react-router-dom'

const MinFooter = () => {
    return (
        <div>
            <footer className="border-t border-border bg-surface px-6 py-6 text-center md:px-10">
                <span className="text-(length:--fs-xs) text-text-muted">
                    © 2026 Sangum. All rights reserved. ·{" "}
                    <Link to="terms" className="hover:text-text hover:underline">
                        Terms of Service
                    </Link>{" "}
                    ·{" "}
                    <Link to="/privacy" className="hover:text-text hover:underline">
                        Privacy Policy
                    </Link>
                </span>
            </footer>
        </div>
    )
}

export default MinFooter
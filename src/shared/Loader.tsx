
type LoaderTypes = {
    size: number,
    styles?: string
}

export default function Loader({ size, styles }: LoaderTypes) {
    return (
        <svg className={styles + " animate-spin"} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.5}></path>
            <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
            </path>
        </svg>
    )
}
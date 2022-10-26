interface ModalProps {
    children: React.ReactNode
}


export function Modal ({children} : ModalProps) {
    return (
        <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0">
            {children}
        </div>
    )
}
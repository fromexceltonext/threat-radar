export const Placeholder = ({ label }: { label:string }) => {
    return (
        <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-gray-400/40 text-gray-500">
            {label}
        </div>
    )
}
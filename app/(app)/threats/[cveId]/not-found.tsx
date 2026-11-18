import Link from "next/link"

const NotFound = () => {
    return (

        <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Not in the KEV catalog</h1>
        <p className="mt-2 text-muted-foreground">That CVE is not a known exploited vulnerability (yet)</p>
        <Link href="/threats" className="mt-6 inline-block text-primary hover:underline">
        Back to all threats
        </Link>
    </div>
    );
};

export default NotFound
import { Placeholder } from "./components/dashboard/Placeholder";


const Home = () => {
  return (
   <main className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-10">
    <header>
      <h1 className="text-3xl font-bold tracking-tight">Threat Radar</h1>
        <p className="text-gray-500">Known exploited vulnerabilities at a glance</p>
    </header>

    <Placeholder label="Cards" />

    <section className="grid gap-4 lg:grid-cols-2">
      <Placeholder label="Charts" />
      <Placeholder label="Charts" />
    </section>

    <section className="grid gap-4 lg:grid-cols-2">
      <Placeholder label="Tables" />
      <Placeholder label="Tables" />
    </section>
   </main>
  ) 
};

export default Home;
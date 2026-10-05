import NavBar from '../components/NavBar';
import About from '../components/About';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />
      <main className="pt-6">
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;

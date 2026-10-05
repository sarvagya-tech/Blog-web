import NavBar from '../components/NavBar';
import BlogList from '../components/BlogList';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />
      <main className="pt-6">
        <BlogList />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default ArticlesPage;

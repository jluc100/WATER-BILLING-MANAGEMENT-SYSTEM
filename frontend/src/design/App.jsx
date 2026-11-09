import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import StatsSection from './components/StatsSection';
import HowItWorks from './components/HowItWorks';
import ServicesSection from './components/ServicesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  const openModal = (view) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-softwhite text-darknavy">
      <Navbar openModal={openModal} />

      <main id="home">
        <HeroCarousel />
        <StatsSection />
        <HowItWorks />
        <ServicesSection />
        <CTASection openModal={openModal} />
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginForm view={modalView} onSwitchMode={openModal} />
      </Modal>
    </div>
  );
}

export default App;

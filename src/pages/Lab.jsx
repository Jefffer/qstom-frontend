import { useEffect } from 'react';
import SEO from '../components/SEO';
import { ControllerConfigurator } from '../features/controller-configurator';

const Lab = () => {
  useEffect(() => {
    // Evitar scroll en la página Lab
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <SEO 
        title="Laboratorio 3D - Personaliza tu Control Gamer"
        description="Laboratorio 3D interactivo para personalizar controles PS5 y Xbox en tiempo real. Visualiza tu diseño único antes de ordenarlo. Servicio en Bogotá, Colombia."
        keywords="laboratorio 3D Bogotá, personalización 3D controles, visualización 3D gaming, diseño control PS5, diseño control Xbox, personalización interactiva Bogotá"
        url="https://qstom.co/lab"
      />
      <div className="w-full h-screen relative">
        <ControllerConfigurator />
      </div>
    </>
  );
};

export default Lab;

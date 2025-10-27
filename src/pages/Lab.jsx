import { useEffect } from 'react';
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
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black">
      <ControllerConfigurator />
    </div>
  );
};

export default Lab;
